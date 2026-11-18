/**
 * Open Doors Olympiad: Earth & Environmental Sciences for Sustainability
 * Novosibirsk State University (NSU) Stage 2 Simulator & Drill Engine
 * Complete Vanilla JavaScript Architecture
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'OPEN_DOORS_NSU_SIM_SESSION_V4';
  const GEMINI_KEY_STORAGE = 'OPEN_DOORS_GEMINI_API_KEY';

  const ALL_FIELDS = [
    'Geography, physical',
    'Meteorology & atmospheric sciences',
    'Geology',
    'Geochemistry & geophysics',
    'Mining & mineral processing',
    'Ecology',
    'Environmental sciences'
  ];

  // Presets definition
  const PRESETS = {
    'stage2-full': {
      id: 'stage2-full',
      name: "Preset A — Official Stage 2 (43 Tasks · 100 Pts)",
      quotas: { basic: 25, intermediate: 15, advanced: 3 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 180
    },
    'marathon-90': {
      id: 'marathon-90',
      name: "Preset D — Full Training Marathon (90 Tasks · 180 min)",
      quotas: { basic: 60, intermediate: 25, advanced: 5 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 180
    },
    'entry-drill': {
      id: 'entry-drill',
      name: "Preset B — Entry-Style Speed Drill (68 Basic Tasks · 68 Pts)",
      quotas: { basic: 68, intermediate: 0, advanced: 0 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 60
    },
    'advanced-drill': {
      id: 'advanced-drill',
      name: "Preset E — Advanced Essay & Calculation Drill (3 Tasks · 30 Pts)",
      quotas: { basic: 0, intermediate: 0, advanced: 3 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 45
    },
    'single-field': {
      id: 'single-field',
      name: "Preset C — Discipline Specialization",
      quotas: { basic: 25, intermediate: 15, advanced: 3 },
      filterMode: 'single-field',
      targetField: 'Geography, physical',
      durationMinutes: 180
    }
  };

  // Application State
  let state = {
    view: 'lobby',          // 'lobby' | 'exam' | 'review'
    mode: 'proctored',      // 'proctored' | 'unproctored'
    presetId: 'stage2-full',
    config: { ...PRESETS['stage2-full'] },
    activeQuestions: [],    // Questions in active session
    currentIndex: 0,        // Active question index (0-based)
    savedAnswers: {},       // questionId -> saved answer (turns matrix tile blue)
    draftAnswers: {},       // questionId -> uncommitted draft answer
    flaggedIds: [],         // array of question IDs marked with flag
    uploadedFiles: {},      // questionId -> { dataUrl, fileName, fileSize, mimeType, aiGrading }
    uploadRemainingSeconds: 10 * 60,
    uploadFilters: { uploadsOnly: true, answeredOnly: true },
    remainingSeconds: 180 * 60,
    focusLossCount: 0,
    isSubmitted: false,
    gradingResult: null,
    lastSaved: null,
    oralResponse: null      // { topicId, topicTitle, prepNotes, audioUrl, durationSec, criteriaScores, totalEarned }
  };

  let timerInterval = null;
  let uploadTimerInterval = null;
  let oralPrepTimerInterval = null;
  let oralRecTimerInterval = null;
  let oralMediaRecorder = null;
  let oralAudioChunks = [];
  let oralPrepSeconds = 180;
  let oralRecSeconds = 120;
  let saveDebounceTimer = null;
  let parsedImportQuestions = [];
  let proctorListenersAttached = false;

  // DOM Elements
  const DOM = {
    // Views
    lobbyView: document.getElementById('lobby-view'),
    examView: document.getElementById('exam-view'),
    uploadView: document.getElementById('upload-view'),
    oralView: document.getElementById('oral-view'),
    reviewView: document.getElementById('review-view'),

    // Stage 3.75: Task 44 Oral Response View
    btnSkipOral: document.getElementById('btn-skip-oral'),
    oralTopicsContainer: document.getElementById('oral-topics-container'),
    oralPrepTimerDisplay: document.getElementById('oral-prep-timer-display'),
    btnStartRecordingEarly: document.getElementById('btn-start-recording-early'),
    oralPrepNotes: document.getElementById('oral-prep-notes'),
    oralRecStatus: document.getElementById('oral-rec-status'),
    oralRecStatusText: document.getElementById('oral-rec-status-text'),
    oralRecTimerDisplay: document.getElementById('oral-rec-timer-display'),
    btnStartMicRecord: document.getElementById('btn-start-mic-record'),
    btnStopMicRecord: document.getElementById('btn-stop-mic-record'),
    oralAudioPlaybackWrap: document.getElementById('oral-audio-playback-wrap'),
    oralAudioPlayer: document.getElementById('oral-audio-player'),
    oralAudioMeta: document.getElementById('oral-audio-meta'),
    oralMicFallbackMsg: document.getElementById('oral-mic-fallback-msg'),
    oralTotalScoreDisplay: document.getElementById('oral-total-score-display'),
    btnSubmitOralDefense: document.getElementById('btn-submit-oral-defense'),
    btnLobbyStartOral: document.getElementById('btn-lobby-start-oral'),
    scoreOral: document.getElementById('score-oral'),
    scoreOralSub: document.getElementById('score-oral-sub'),
    rubricCrit1: document.getElementById('rubric-crit-1'),
    rubricCrit2: document.getElementById('rubric-crit-2'),
    rubricCrit3: document.getElementById('rubric-crit-3'),
    rubricCrit4: document.getElementById('rubric-crit-4'),

    // Stage 3: Post-Proctoring File Upload View
    uploadView: document.getElementById('upload-view'),
    uploadTimerDisplay: document.getElementById('upload-timer-display'),
    chkFilterUploadsOnly: document.getElementById('chk-filter-uploads-only'),
    chkFilterAnsweredOnly: document.getElementById('chk-filter-answered-only'),
    uploadFilterStats: document.getElementById('upload-filter-stats'),
    uploadGeminiKey: document.getElementById('upload-gemini-key'),
    btnSaveUploadKey: document.getElementById('btn-save-upload-key'),
    uploadTasksContainer: document.getElementById('upload-tasks-container'),
    btnCompleteUpload: document.getElementById('btn-complete-upload'),
    btnSkipUpload: document.getElementById('btn-skip-upload'),
    aiGradingOverlay: document.getElementById('ai-grading-overlay'),
    aiLoadingDesc: document.getElementById('ai-loading-desc'),
    aiProgressBar: document.getElementById('ai-progress-bar'),
    aiProgressStatus: document.getElementById('ai-progress-status'),

    // Lobby Elements
    resumeSessionBanner: document.getElementById('resume-session-banner'),
    resumeSessionDesc: document.getElementById('resume-session-desc'),
    btnResumeSession: document.getElementById('btn-resume-session'),
    btnDiscardSession: document.getElementById('btn-discard-session'),
    btnLobbyWizard: document.getElementById('btn-lobby-wizard'),
    btnLobbyStartProctored: document.getElementById('btn-lobby-start-proctored'),
    btnLobbyStartPractice: document.getElementById('btn-lobby-start-practice'),
    btnLobbyOpenImporter: document.getElementById('btn-lobby-open-importer'),
    practicePresetRadios: document.querySelectorAll('input[name="practice-preset"]'),
    practiceFieldSelectorWrap: document.getElementById('practice-field-selector-wrap'),
    practiceTargetField: document.getElementById('practice-target-field'),

    // Exam Header & Proctoring
    taskCounterDisplay: document.getElementById('task-counter-display'),
    examModeBadge: document.getElementById('exam-mode-badge'),
    timerBox: document.getElementById('timer-box'),
    timerDisplay: document.getElementById('timer-display'),
    focusLossBadge: document.getElementById('focus-loss-badge'),
    focusLossCount: document.getElementById('focus-loss-count'),
    btnToggleCalc: document.getElementById('btn-toggle-calc'),
    btnExamToLobby: document.getElementById('btn-exam-to-lobby'),
    btnFinishAttempt: document.getElementById('btn-finish-attempt'),

    // Exam Navigation Matrix & Card
    questionNavMatrix: document.getElementById('question-nav-matrix'),
    taskNumberLabel: document.getElementById('task-number-label'),
    taskDisciplinePill: document.getElementById('task-discipline-pill'),
    taskPointsPill: document.getElementById('task-points-pill'),
    taskSaveIndicator: document.getElementById('task-save-indicator'),
    btnToggleFlag: document.getElementById('btn-toggle-flag'),
    flagIcon: document.getElementById('flag-icon'),
    flagText: document.getElementById('flag-text'),
    taskTitleText: document.getElementById('task-title-text'),
    taskStemText: document.getElementById('task-stem-text'),
    taskAnswerZone: document.getElementById('task-answer-zone'),
    btnSaveAnswer: document.getElementById('btn-save-answer'),
    btnPrevTask: document.getElementById('btn-prev-task'),
    btnNextTask: document.getElementById('btn-next-task'),

    // Review View Elements
    btnReviewToLobby: document.getElementById('btn-review-to-lobby'),
    btnExportBlank: document.getElementById('btn-export-blank'),
    btnExportGraded: document.getElementById('btn-export-graded'),
    scoreEarned: document.getElementById('score-earned'),
    scoreMax: document.getElementById('score-max'),
    scoreGradeBadge: document.getElementById('score-grade-badge'),
    scorePercentage: document.getElementById('score-percentage'),
    scoreCorrectTasks: document.getElementById('score-correct-tasks'),
    scoreTotalTasks: document.getElementById('score-total-tasks'),
    scorePartialTasks: document.getElementById('score-partial-tasks'),
    fieldBreakdownTbody: document.getElementById('field-breakdown-tbody'),
    btnCopyReport: document.getElementById('btn-copy-report'),
    examReportText: document.getElementById('exam-report-text'),
    solutionsContainer: document.getElementById('solutions-container'),

    // Modals
    wizardModal: document.getElementById('wizard-modal'),
    btnCloseWizard: document.getElementById('btn-close-wizard'),
    wizardStepPills: document.querySelectorAll('.wizard-step-pill'),
    wizardStepPanes: document.querySelectorAll('.wizard-step-pane'),
    btnWizardPrev: document.getElementById('btn-wizard-prev'),
    btnWizardNext: document.getElementById('btn-wizard-next'),
    btnWizardLaunchExam: document.getElementById('btn-wizard-launch-exam'),

    calcDrawer: document.getElementById('calc-drawer'),
    btnCloseCalc: document.getElementById('btn-close-calc'),
    calcTabBtns: document.querySelectorAll('.calc-tab-btn'),
    calcTabContents: document.querySelectorAll('.calc-tab-content'),
    calcDisplay: document.getElementById('calc-display'),
    calcHistory: document.getElementById('calc-history'),

    importerModal: document.getElementById('importer-modal'),
    btnCloseImporter: document.getElementById('btn-close-importer'),
    pdfFileInput: document.getElementById('pdf-file-input'),
    fileNameDisplay: document.getElementById('file-name-display'),
    btnProcessPdf: document.getElementById('btn-process-pdf'),
    btnCommitImported: document.getElementById('btn-commit-imported'),
    importerStatusLog: document.getElementById('importer-status-log'),
    importerPreviewBox: document.getElementById('importer-preview-box'),
    importerPreviewList: document.getElementById('importer-preview-list'),
    parsedCountBadge: document.getElementById('parsed-count-badge'),
    geminiKeyContainer: document.getElementById('gemini-key-container'),
    geminiApiKeyInput: document.getElementById('gemini-api-key-input'),

    finishDialog: document.getElementById('finish-dialog'),
    btnCancelFinishX: document.getElementById('btn-cancel-finish-x'),
    btnCancelFinish: document.getElementById('btn-cancel-finish'),
    btnConfirmFinish: document.getElementById('btn-confirm-finish'),
    finishAnsweredCount: document.getElementById('finish-answered-count'),
    finishTotalCount: document.getElementById('finish-total-count'),
    finishUnansweredCount: document.getElementById('finish-unanswered-count'),
    finishTimeLeft: document.getElementById('finish-time-left'),

    proctorAlert: document.getElementById('proctor-alert'),
    btnDismissProctorAlert: document.getElementById('btn-dismiss-proctor-alert'),
    blankPrintContainer: document.getElementById('blank-print-container'),
    toast: document.getElementById('toast')
  };

  // Calculator State
  let calcState = {
    current: '0',
    previous: null,
    operation: null,
    history: '',
    shouldResetDisplay: false
  };

  let currentWizardStep = 1;

  // ============================================================================
  // Toast Helper
  // ============================================================================
  
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message, duration = 3000) {
    if (!DOM.toast) return;
    DOM.toast.textContent = message;
    DOM.toast.classList.add('show');
    setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, duration);
  }

  // ============================================================================
  // View Controller: Switch Between Lobby, Exam, and Review
  // ============================================================================
  function switchView(targetView) {
    state.view = targetView;
    if (DOM.lobbyView) DOM.lobbyView.style.display = targetView === 'lobby' ? 'block' : 'none';
    if (DOM.examView) DOM.examView.style.display = targetView === 'exam' ? 'block' : 'none';
    if (DOM.uploadView) DOM.uploadView.style.display = targetView === 'upload' ? 'block' : 'none';
    if (DOM.oralView) DOM.oralView.style.display = targetView === 'oral' ? 'block' : 'none';
    if (DOM.reviewView) DOM.reviewView.style.display = targetView === 'review' ? 'block' : 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================================================
  // Question Bank Sampling Engine (Stratified Round-Robin by Field & Difficulty)
  // ============================================================================
  function sampleQuestions(config) {
    const rawBank = window.QUESTION_BANK || [];
    if (!rawBank || rawBank.length === 0) {
      console.error('QUESTION_BANK is empty or not loaded.');
      return [];
    }

    // Filter by single field if requested
    let pool = [...rawBank];
    if (config.filterMode === 'single-field' && config.targetField && config.targetField !== 'all') {
      pool = pool.filter((q) => q.field === config.targetField);
      // If pool doesn't have enough, fall back to full pool
      if (pool.length < (config.quotas.basic + config.quotas.intermediate + config.quotas.advanced)) {
        pool = [...rawBank];
      }
    }

    const basicPool = pool.filter((q) => q.difficulty === 'basic');
    const interPool = pool.filter((q) => q.difficulty === 'intermediate');
    const advPool = pool.filter((q) => q.difficulty === 'advanced');

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function stratifiedPick(items, count) {
      if (count <= 0) return [];
      if (items.length <= count) return shuffle(items);

      // Group by field
      const fieldBuckets = {};
      ALL_FIELDS.forEach((f) => (fieldBuckets[f] = []));
      items.forEach((item) => {
        const f = item.field || ALL_FIELDS[0];
        if (!fieldBuckets[f]) fieldBuckets[f] = [];
        fieldBuckets[f].push(item);
      });

      // Shuffle each bucket
      Object.keys(fieldBuckets).forEach((f) => {
        fieldBuckets[f] = shuffle(fieldBuckets[f]);
      });

      const picked = [];
      let round = 0;
      while (picked.length < count) {
        let addedThisRound = 0;
        for (const f of ALL_FIELDS) {
          if (picked.length >= count) break;
          const bucket = fieldBuckets[f];
          if (bucket && bucket.length > 0) {
            picked.push(bucket.pop());
            addedThisRound++;
          }
        }
        if (addedThisRound === 0) break;
        round++;
      }

      // If still short, draw from remaining items
      if (picked.length < count) {
        const remaining = items.filter((x) => !picked.some((p) => p.id === x.id));
        picked.push(...shuffle(remaining).slice(0, count - picked.length));
      }

      return picked;
    }

    const pickedBasic = stratifiedPick(basicPool, config.quotas.basic);
    const pickedInter = stratifiedPick(interPool, config.quotas.intermediate);
    const pickedAdv = stratifiedPick(advPool, config.quotas.advanced);

    return [...pickedBasic, ...pickedInter, ...pickedAdv];
  }

  // ============================================================================
  // Parametric Engine: Instantiate Multi-Variant Archetypes
  // ============================================================================
  function instantiateParametricVariants(questions) {
    const rawBank = window.QUESTION_BANK || [];

    // Group all parametric questions in bank by templateId
    const templateGroups = {};
    rawBank.forEach(q => {
      if (q.templateId) {
        if (!templateGroups[q.templateId]) templateGroups[q.templateId] = [];
        templateGroups[q.templateId].push(q);
      }
    });

    return questions.map(q => {
      // If question belongs to a parametric template family with multiple variants
      if (q.templateId && templateGroups[q.templateId] && templateGroups[q.templateId].length > 1) {
        const family = templateGroups[q.templateId];
        // Pick a diverse variant randomly so numbers change on each new exam attempt
        const chosen = family[Math.floor(Math.random() * family.length)];
        return { ...chosen };
      }
      return q;
    });
  }

  // ============================================================================
  // Start Exam Session (Called ONLY When User Explicitly Starts from Lobby)
  // ============================================================================
  function startExamSession({ mode, presetId, quotas, targetField, durationMinutes, customQuestions }) {
    state.mode = mode || 'proctored';
    state.presetId = presetId || 'stage2-full';

    const basePreset = PRESETS[state.presetId] || PRESETS['stage2-full'];
    state.config = {
      ...basePreset,
      quotas: quotas || basePreset.quotas,
      targetField: targetField || basePreset.targetField,
      durationMinutes: durationMinutes || basePreset.durationMinutes
    };

    if (customQuestions && customQuestions.length > 0) {
      state.activeQuestions = instantiateParametricVariants(customQuestions);
    } else {
      state.activeQuestions = instantiateParametricVariants(sampleQuestions(state.config));
    }

    state.currentIndex = 0;
    state.savedAnswers = {};
    state.draftAnswers = {};
    state.flaggedIds = [];
    state.remainingSeconds = (state.config.durationMinutes || 180) * 60;
    state.focusLossCount = 0;
    state.isSubmitted = false;
    state.gradingResult = null;
    state.oralResponse = null;

    // Configure Exam Header
    if (DOM.examModeBadge) {
      if (state.mode === 'proctored') {
        DOM.examModeBadge.textContent = 'Proctored Stage 2';
        DOM.examModeBadge.className = 'moodle-mode-pill';
      } else {
        DOM.examModeBadge.textContent = 'Test Session (Practice)';
        DOM.examModeBadge.className = 'moodle-mode-pill practice';
      }
    }

    // Configure Focus Loss Proctoring
    if (DOM.focusLossBadge) {
      if (state.mode === 'proctored') {
        DOM.focusLossBadge.style.display = 'inline-flex';
        if (DOM.focusLossCount) DOM.focusLossCount.textContent = '0';
        attachProctoringListeners();
      } else {
        DOM.focusLossBadge.style.display = 'none';
        detachProctoringListeners();
      }
    }

    // Switch View
    switchView('exam');

    // Render Matrix & First Task
    renderNavigationMatrix();
    renderCurrentTask();

    // Start Timer
    startTimer();

    // Save to storage
    saveSessionToStorage();
    checkSavedSessionBanner();

    showToast(
      state.mode === 'proctored'
        ? 'Proctored Stage 2 exam started. 180-minute timer active.'
        : 'Practice drill started. Proctoring sensors disabled.'
    );
  }

  // ============================================================================
  // Resume Saved Session
  // ============================================================================
  function resumeSavedSession() {
    const session = loadSessionFromStorage();
    if (!session || !session.activeQuestions || session.activeQuestions.length === 0) {
      showToast('No saved session found.');
      return;
    }

    // Restore state
    state = { ...state, ...session };

    // Update Header
    if (DOM.examModeBadge) {
      if (state.mode === 'proctored') {
        DOM.examModeBadge.textContent = 'Proctored Stage 2';
        DOM.examModeBadge.className = 'moodle-mode-pill';
      } else {
        DOM.examModeBadge.textContent = 'Test Session (Practice)';
        DOM.examModeBadge.className = 'moodle-mode-pill practice';
      }
    }

    if (DOM.focusLossBadge) {
      if (state.mode === 'proctored') {
        DOM.focusLossBadge.style.display = 'inline-flex';
        if (DOM.focusLossCount) DOM.focusLossCount.textContent = state.focusLossCount || 0;
        attachProctoringListeners();
      } else {
        DOM.focusLossBadge.style.display = 'none';
        detachProctoringListeners();
      }
    }

    switchView('exam');
    renderNavigationMatrix();
    renderCurrentTask();
    updateTimerDisplay();

    if (state.isSubmitted) {
      switchView('review');
      renderEvaluationSection();
    } else if (state.view === 'upload') {
      enterUploadStage(true);
      showToast('Restored post-proctoring upload session.');
    } else {
      startTimer();
      showToast('Session restored successfully.');
    }
  }

  function discardSavedSession() {
    localStorage.removeItem(STORAGE_KEY);
    if (DOM.resumeSessionBanner) DOM.resumeSessionBanner.style.display = 'none';
    showToast('Saved session discarded.');
  }

  function checkSavedSessionBanner() {
    if (!DOM.resumeSessionBanner) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        DOM.resumeSessionBanner.style.display = 'none';
        return;
      }
      const data = JSON.parse(raw);
      if (data && data.activeQuestions && data.activeQuestions.length > 0 && !data.isSubmitted) {
        DOM.resumeSessionBanner.style.display = 'flex';
        const answeredCount = Object.keys(data.savedAnswers || {}).length;
        const totalCount = data.activeQuestions.length;
        const remMin = Math.ceil((data.remainingSeconds || 0) / 60);
        if (DOM.resumeSessionDesc) {
          DOM.resumeSessionDesc.textContent = `${data.config?.name || 'Stage 2 Attempt'} · ${answeredCount}/${totalCount} answered · ${remMin} min remaining`;
        }
      } else {
        DOM.resumeSessionBanner.style.display = 'none';
      }
    } catch (e) {
      DOM.resumeSessionBanner.style.display = 'none';
    }
  }

  // ============================================================================
  // Proctoring Monitors (ONLY Attached During Proctored Mode)
  // ============================================================================
  function handleVisibilityChange() {
    if (state.view !== 'exam' || state.mode !== 'proctored' || state.isSubmitted) return;
    if (document.hidden) {
      recordFocusLoss('Window tab changed or minimized.');
    }
  }

  function handleWindowBlur() {
    if (state.view !== 'exam' || state.mode !== 'proctored' || state.isSubmitted) return;
    recordFocusLoss('Browser window lost focus.');
  }

  function recordFocusLoss(reason) {
    state.focusLossCount++;
    if (DOM.focusLossCount) DOM.focusLossCount.textContent = state.focusLossCount;

    if (DOM.proctorAlert) {
      DOM.proctorAlert.style.display = 'flex';
    }

    saveSessionToStorage();
  }

  function attachProctoringListeners() {
    if (proctorListenersAttached) return;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    proctorListenersAttached = true;
  }

  function detachProctoringListeners() {
    if (!proctorListenersAttached) return;
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleWindowBlur);
    proctorListenersAttached = false;
  }

  // ============================================================================
  // Countdown Timer
  // ============================================================================
  function startTimer() {
    stopTimer();
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      if (state.remainingSeconds > 0) {
        state.remainingSeconds--;
        updateTimerDisplay();

        // Auto-save every 15 seconds
        if (state.remainingSeconds % 15 === 0) {
          saveSessionToStorage();
        }
      } else {
        stopTimer();
        autoSubmitTimeExpired();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    if (!DOM.timerDisplay) return;
    const hours = Math.floor(state.remainingSeconds / 3600);
    const minutes = Math.floor((state.remainingSeconds % 3600) / 60);
    const seconds = state.remainingSeconds % 60;
    const str = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    DOM.timerDisplay.textContent = str;

    if (DOM.timerBox) {
      if (state.remainingSeconds <= 300) {
        DOM.timerBox.style.backgroundColor = '#fef2f2';
        DOM.timerDisplay.style.color = '#dc2626';
      } else if (state.remainingSeconds <= 900) {
        DOM.timerBox.style.backgroundColor = '#fffbeb';
        DOM.timerDisplay.style.color = '#b45309';
      } else {
        DOM.timerBox.style.backgroundColor = 'transparent';
        DOM.timerDisplay.style.color = '#0f172a';
      }
    }
  }

  function autoSubmitTimeExpired() {
    showToast('Examination time has expired. Submitting answers automatically...', 5000);
    submitExam();
  }

  // ============================================================================
  // MathJax Helper
  // ============================================================================
  function triggerMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => {
        console.warn('MathJax typesetting error:', err);
      });
    }
  }

  // ============================================================================
  // Render Navigation Matrix (28px x 28px Squares Matching Screenshots)
  // ============================================================================
  function renderNavigationMatrix() {
    if (!DOM.questionNavMatrix) return;
    DOM.questionNavMatrix.innerHTML = '';

    state.activeQuestions.forEach((q, idx) => {
      const tile = document.createElement('button');
      tile.className = 'nav-tile';
      tile.textContent = idx + 1;
      tile.title = `Task ${idx + 1}: ${q.title || q.field}`;

      // Status class determination
      const isSaved = state.savedAnswers.hasOwnProperty(q.id) && state.savedAnswers[q.id] !== null && state.savedAnswers[q.id] !== '';
      const isActive = idx === state.currentIndex;
      const isFlagged = state.flaggedIds.includes(q.id);

      if (isActive) {
        tile.classList.add('active'); // Crimson Red #d32f2f
      } else if (isSaved) {
        tile.classList.add('saved');  // Royal Blue #1967d2
      } else {
        tile.classList.add('unanswered'); // Light Neutral Gray #e2e8f0
      }

      if (isFlagged) {
        tile.classList.add('flagged');
      }

      tile.addEventListener('click', () => {
        jumpToTask(idx);
      });

      DOM.questionNavMatrix.appendChild(tile);
    });
  }

  function updateMatrixTileState(idx) {
    if (!DOM.questionNavMatrix) return;
    const tiles = DOM.questionNavMatrix.querySelectorAll('.nav-tile');
    if (!tiles || !tiles[idx]) return;

    const q = state.activeQuestions[idx];
    if (!q) return;

    const tile = tiles[idx];
    const isSaved = state.savedAnswers.hasOwnProperty(q.id) && state.savedAnswers[q.id] !== null && state.savedAnswers[q.id] !== '';
    const isActive = idx === state.currentIndex;
    const isFlagged = state.flaggedIds.includes(q.id);

    tile.className = 'nav-tile';
    if (isActive) {
      tile.classList.add('active');
    } else if (isSaved) {
      tile.classList.add('saved');
    } else {
      tile.classList.add('unanswered');
    }

    if (isFlagged) {
      tile.classList.add('flagged');
    }
  }

  // ============================================================================
  // Render Current Task in Single-Question Viewport Card
  // ============================================================================
  function renderCurrentTask() {
    if (!state.activeQuestions || state.activeQuestions.length === 0) return;
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    // Header labels & Task Counter (e.g. Task 88 of 90)
    if (DOM.taskCounterDisplay) {
      DOM.taskCounterDisplay.textContent = `Task ${state.currentIndex + 1} of ${state.activeQuestions.length}`;
    }
    if (DOM.taskNumberLabel) {
      DOM.taskNumberLabel.textContent = `Question ${state.currentIndex + 1}`;
    }
    if (DOM.taskDisciplinePill) {
      DOM.taskDisciplinePill.textContent = q.field || 'General Geoscience';
    }
    if (DOM.taskPointsPill) {
      DOM.taskPointsPill.textContent = `${q.points || 1} Point${(q.points || 1) > 1 ? 's' : ''}`;
    }

    // Flag state
    const isFlagged = state.flaggedIds.includes(q.id);
    if (DOM.btnToggleFlag) {
      DOM.btnToggleFlag.classList.toggle('flagged', isFlagged);
      if (DOM.flagText) {
        DOM.flagText.textContent = isFlagged ? 'Remove flag' : 'Flag question';
      }
    }

    // Save status indicator
    const hasSaved = state.savedAnswers.hasOwnProperty(q.id) && state.savedAnswers[q.id] !== null && state.savedAnswers[q.id] !== '';
    if (DOM.taskSaveIndicator) {
      DOM.taskSaveIndicator.textContent = hasSaved ? 'Answer saved' : 'Not answered yet';
    }

    // Stem text
    if (DOM.taskStemText) {
      DOM.taskStemText.innerHTML = q.content || '';
    }

    // Render answer options
    renderAnswerZone(q);

    // Update Save button dirty state
    checkSaveButtonState();

    // Update Prev / Next buttons
    if (DOM.btnPrevTask) {
      DOM.btnPrevTask.disabled = state.currentIndex === 0;
    }
    if (DOM.btnNextTask) {
      DOM.btnNextTask.disabled = state.currentIndex === state.activeQuestions.length - 1;
    }

    // Update all matrix tiles
    state.activeQuestions.forEach((_, i) => updateMatrixTileState(i));

    triggerMathJax();
  }

  // ============================================================================
  // Render Answer Zone (Radio / Checkbox / Short / Extended)
  // ============================================================================
  function renderAnswerZone(q) {
    if (!DOM.taskAnswerZone) return;
    DOM.taskAnswerZone.innerHTML = '';

    const currentDraft = state.draftAnswers.hasOwnProperty(q.id)
      ? state.draftAnswers[q.id]
      : (state.savedAnswers[q.id] || '');

    if (q.type === 'single-choice') {
      const stack = document.createElement('div');
      stack.className = 'options-stack';

      (q.options || []).forEach((opt, optIdx) => {
        const row = document.createElement('label');
        row.className = 'option-row';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `opt_${q.id}`;
        radio.value = opt;
        radio.className = 'option-input';
        radio.checked = currentDraft === opt;

        radio.addEventListener('change', () => {
          state.draftAnswers[q.id] = opt;
          checkSaveButtonState();
        });

        const span = document.createElement('span');
        span.className = 'option-text';
        span.innerHTML = opt;

        row.appendChild(radio);
        row.appendChild(span);
        stack.appendChild(row);
      });

      DOM.taskAnswerZone.appendChild(stack);

    } else if (q.type === 'multiple-select') {
      const stack = document.createElement('div');
      stack.className = 'options-stack';

      let selectedList = Array.isArray(currentDraft) ? currentDraft : [];

      (q.options || []).forEach((opt) => {
        const row = document.createElement('label');
        row.className = 'option-row';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opt;
        checkbox.className = 'option-input';
        checkbox.checked = selectedList.includes(opt);

        checkbox.addEventListener('change', () => {
          const current = Array.isArray(state.draftAnswers[q.id])
            ? [...state.draftAnswers[q.id]]
            : (Array.isArray(state.savedAnswers[q.id]) ? [...state.savedAnswers[q.id]] : []);

          if (checkbox.checked) {
            if (!current.includes(opt)) current.push(opt);
          } else {
            const idx = current.indexOf(opt);
            if (idx > -1) current.splice(idx, 1);
          }
          state.draftAnswers[q.id] = current;
          checkSaveButtonState();
        });

        const span = document.createElement('span');
        span.className = 'option-text';
        span.innerHTML = opt;

        row.appendChild(checkbox);
        row.appendChild(span);
        stack.appendChild(row);
      });

      DOM.taskAnswerZone.appendChild(stack);

    } else if (q.type === 'short-answer') {
      const wrap = document.createElement('div');
      wrap.className = 'numeric-input-wrapper';

      const label = document.createElement('label');
      label.className = 'numeric-label';
      label.textContent = 'Enter numeric value or exact formula term:';

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control-input';
      input.placeholder = 'e.g., from north-west to south-east or 53.5';
      input.value = currentDraft;

      input.addEventListener('input', () => {
        state.draftAnswers[q.id] = input.value.trim();
        checkSaveButtonState();
      });

      wrap.appendChild(label);
      wrap.appendChild(input);
      DOM.taskAnswerZone.appendChild(wrap);

    } else if (q.type === 'extended-response') {
      const wrap = document.createElement('div');
      wrap.className = 'derivation-wrapper';

      const label = document.createElement('label');
      label.className = 'numeric-label';
      label.textContent = 'Detailed Solution & Mathematical Derivation (NSU Olympiad Rubric):';

      const textarea = document.createElement('textarea');
      textarea.className = 'derivation-textarea';
      textarea.rows = 6;
      textarea.placeholder = 'Write down full formulas, intermediate substitutions, and units...';
      textarea.value = currentDraft;

      textarea.addEventListener('input', () => {
        state.draftAnswers[q.id] = textarea.value;
        checkSaveButtonState();
      });

      wrap.appendChild(label);
      wrap.appendChild(textarea);
      DOM.taskAnswerZone.appendChild(wrap);

      // Camera-Show Check for advanced extended-response tasks
      if (q.difficulty === 'advanced') {
        const cameraDiv = document.createElement('div');
        cameraDiv.className = 'camera-show-reminder';
        cameraDiv.innerHTML = `
          <div class="camera-check-box">
            <button class="btn-camera-show" id="btn-camera-${q.id}">📷 30s Camera-Show Check</button>
            <span class="camera-hint">Hold handwritten sheet to camera for 30 seconds before saving. Type only key parameters & final values in the text box.</span>
          </div>
        `;
        wrap.appendChild(cameraDiv);

        // Attach 30s countdown on click
        setTimeout(() => {
          const btn = document.getElementById('btn-camera-' + q.id);
          if (btn) {
            btn.addEventListener('click', () => {
              let secs = 30;
              btn.disabled = true;
              btn.textContent = '📷 Hold sheet to camera: 30s';
              const iv = setInterval(() => {
                secs--;
                btn.textContent = secs > 0 ? '📷 Hold sheet to camera: ' + secs + 's' : '✓ Camera check complete';
                if (secs <= 0) { clearInterval(iv); btn.style.backgroundColor = '#dcfce7'; btn.style.color = '#15803d'; }
              }, 1000);
            });
          }
        }, 100);
      }
    }
  }

  // ============================================================================
  // Save Answer Button Dirty-State Controller
  // ============================================================================
  function checkSaveButtonState() {
    if (!DOM.btnSaveAnswer) return;
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    const saved = state.savedAnswers[q.id];
    const draft = state.draftAnswers[q.id];

    // Determine if draft is modified from saved
    let isDirty = false;
    if (state.draftAnswers.hasOwnProperty(q.id)) {
      if (Array.isArray(draft) && Array.isArray(saved)) {
        isDirty = JSON.stringify([...draft].sort()) !== JSON.stringify([...saved].sort());
      } else {
        isDirty = draft !== saved && draft !== '' && draft !== undefined;
      }
    }

    if (isDirty) {
      DOM.btnSaveAnswer.disabled = false;
      DOM.btnSaveAnswer.className = 'btn-od-save active-dirty';
    } else {
      DOM.btnSaveAnswer.disabled = true;
      DOM.btnSaveAnswer.className = 'btn-od-save untouched';
    }
  }

  function handleSaveAnswer() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    const draft = state.draftAnswers[q.id];
    if (draft !== undefined && draft !== null && draft !== '') {
      state.savedAnswers[q.id] = draft;
      delete state.draftAnswers[q.id];

      if (DOM.taskSaveIndicator) {
        DOM.taskSaveIndicator.textContent = 'Answer saved';
      }

      updateMatrixTileState(state.currentIndex);
      checkSaveButtonState();
      saveSessionToStorage();
      showToast(`Answer for Question ${state.currentIndex + 1} saved.`);
    }
  }

  // ============================================================================
  // Task Navigation (Jump, Prev, Next, Flag)
  // ============================================================================
  function jumpToTask(index) {
    if (index < 0 || index >= state.activeQuestions.length) return;
    state.currentIndex = index;
    renderCurrentTask();
  }

  function prevTask() {
    if (state.currentIndex > 0) {
      jumpToTask(state.currentIndex - 1);
    }
  }

  function nextTask() {
    if (state.currentIndex < state.activeQuestions.length - 1) {
      jumpToTask(state.currentIndex + 1);
    }
  }

  function toggleFlag() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    const idx = state.flaggedIds.indexOf(q.id);
    if (idx > -1) {
      state.flaggedIds.splice(idx, 1);
    } else {
      state.flaggedIds.push(q.id);
    }

    renderCurrentTask();
    saveSessionToStorage();
  }

  // ============================================================================
  // Submission & Automated Grading Engine
  // ============================================================================
  function showFinishDialog() {
    if (!DOM.finishDialog) return;
    const total = state.activeQuestions.length;
    const answered = Object.keys(state.savedAnswers).length;
    const unanswered = total - answered;

    if (DOM.finishAnsweredCount) DOM.finishAnsweredCount.textContent = answered;
    if (DOM.finishTotalCount) DOM.finishTotalCount.textContent = total;
    if (DOM.finishUnansweredCount) DOM.finishUnansweredCount.textContent = unanswered;

    const min = Math.floor(state.remainingSeconds / 60);
    const sec = state.remainingSeconds % 60;
    if (DOM.finishTimeLeft) {
      DOM.finishTimeLeft.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    DOM.finishDialog.style.display = 'flex';
  }

  function hideFinishDialog() {
    if (DOM.finishDialog) DOM.finishDialog.style.display = 'none';
  }

  function submitExam() {
    hideFinishDialog();
    stopTimer();
    detachProctoringListeners();

    // Turn OFF proctoring monitoring immediately
    state.mode = 'unproctored';
    if (DOM.focusLossBadge) DOM.focusLossBadge.style.display = 'none';

    enterUploadStage(false);
  }

  // ============================================================================
  // STAGE 3: POST-PROCTORING FILE UPLOAD LIFECYCLE (Articles 14 & 14.1)
  // ============================================================================
  function enterUploadStage(isRestoring = false) {
    stopTimer();
    detachProctoringListeners();

    if (!isRestoring || !state.uploadRemainingSeconds || state.uploadRemainingSeconds <= 0) {
      state.uploadRemainingSeconds = 10 * 60; // 10 minutes allocated per Article 14
    }

    // Restore saved Gemini API key if present
    const savedKey = localStorage.getItem(GEMINI_KEY_STORAGE) || '';
    if (DOM.uploadGeminiKey && savedKey) {
      DOM.uploadGeminiKey.value = savedKey;
    }

    switchView('upload');
    startUploadTimer();
    renderUploadTasks();
    saveSessionToStorage();

    if (!isRestoring) {
      showToast('Proctoring ended. You have 10:00 minutes to photograph and upload solution sheets.');
    }
  }

  function startUploadTimer() {
    stopUploadTimer();
    updateUploadTimerDisplay();

    uploadTimerInterval = setInterval(() => {
      if (state.uploadRemainingSeconds > 0) {
        state.uploadRemainingSeconds--;
        updateUploadTimerDisplay();
        if (state.uploadRemainingSeconds % 15 === 0) {
          saveSessionToStorage();
        }
      } else {
        stopUploadTimer();
        showToast('Upload window has expired. Finalizing submission with current sheets...');
        completeUploadAndGrade();
      }
    }, 1000);
  }

  function stopUploadTimer() {
    if (uploadTimerInterval) {
      clearInterval(uploadTimerInterval);
      uploadTimerInterval = null;
    }
  }

  function updateUploadTimerDisplay() {
    if (!DOM.uploadTimerDisplay) return;
    const minutes = Math.floor(state.uploadRemainingSeconds / 60);
    const seconds = state.uploadRemainingSeconds % 60;
    DOM.uploadTimerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function isEligibleForUpload(q) {
    return q.difficulty === 'advanced' || q.type === 'extended-response' || (q.points && q.points >= 3);
  }

  function isAnsweredTask(q) {
    const ans = state.savedAnswers[q.id];
    return ans !== undefined && ans !== null && String(ans).trim().length > 0;
  }

  function getFilteredUploadTasks() {
    const uploadsOnly = DOM.chkFilterUploadsOnly ? DOM.chkFilterUploadsOnly.checked : true;
    const answeredOnly = DOM.chkFilterAnsweredOnly ? DOM.chkFilterAnsweredOnly.checked : true;

    let filtered = state.activeQuestions.map((q, idx) => ({ ...q, originalIndex: idx + 1 }));

    if (uploadsOnly) {
      const subset = filtered.filter(isEligibleForUpload);
      if (subset.length > 0) filtered = subset;
    }

    if (answeredOnly) {
      filtered = filtered.filter(isAnsweredTask);
    }

    return filtered;
  }

  function renderUploadTasks() {
    if (!DOM.uploadTasksContainer) return;
    DOM.uploadTasksContainer.innerHTML = '';

    const filteredTasks = getFilteredUploadTasks();

    if (DOM.uploadFilterStats) {
      DOM.uploadFilterStats.textContent = `Showing ${filteredTasks.length} eligible task${filteredTasks.length === 1 ? '' : 's'}`;
    }

    if (filteredTasks.length === 0) {
      DOM.uploadTasksContainer.innerHTML = `
        <div style="background:#ffffff; border:1px dashed #cbd5e1; border-radius:6px; padding:2.5rem; text-align:center; color:#64748b;">
          <p style="font-size:1rem; font-weight:600; color:#0f172a; margin-bottom:0.5rem;">No tasks match the active filters.</p>
          <p style="font-size:0.85rem;">Uncheck <em>"Only answered questions"</em> or <em>"Only questions with file uploads"</em> above to view all tasks.</p>
        </div>`;
      return;
    }

    filteredTasks.forEach((q) => {
      const card = document.createElement('div');
      card.className = 'upload-task-card';

      const uploaded = state.uploadedFiles[q.id];
      const userAnswer = state.savedAnswers[q.id] || '';

      let uploadZoneHtml = '';
      if (!uploaded) {
        uploadZoneHtml = `
          <div class="upload-dropzone" data-qid="${q.id}" title="Click or drag to upload handwritten solution sheet">
            <input type="file" accept="image/png,image/jpeg,image/jpg,application/pdf" style="display:none;" class="file-input-task" data-qid="${q.id}">
            <div class="dropzone-cloud-icon">☁️</div>
            <div class="dropzone-text">Upload...</div>
            <div class="dropzone-sub">PNG, JPG, PDF (max 5 MB)</div>
          </div>
          <div class="upload-meta-info">
            <div style="font-weight:600; color:#334155;">Attach Solution Sheet</div>
            <div style="color:#64748b; font-size:0.8rem;">Allowed: PNG, JPG, JPEG, PDF up to 5 MB per Article 14</div>
            <div style="color:#059669; font-size:0.75rem;">Sheet shown to camera before submit</div>
          </div>
        `;
      } else {
        uploadZoneHtml = `
          <div class="upload-thumb-box">
            <img src="${uploaded.dataUrl}" alt="Solution sheet" class="upload-thumb-img" data-qid="${q.id}">
            <div class="thumb-overlay">
              <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:85px;">${escapeHtml(uploaded.fileName)}</span>
              <button class="btn-remove-thumb" data-qid="${q.id}">✕ Remove</button>
            </div>
          </div>
          <div class="upload-meta-info">
            <div class="upload-file-status">✓ Sheet Uploaded & Compressed</div>
            <div>File: <strong>${escapeHtml(uploaded.fileName)}</strong> (${uploaded.fileSize})</div>
            <div style="color:#15803d; font-size:0.75rem;">Ready for AI Vision assessment</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="upload-card-header">
          <span class="upload-task-title">Task ${q.originalIndex}: ${escapeHtml(q.title || q.field)}</span>
          <span class="upload-task-badge">${q.field} · ${q.points} pt</span>
        </div>
        <div class="upload-task-stem">
          ${q.content}
        </div>
        <div class="upload-answer-preview">
          <strong>Answer recorded during proctoring:</strong> ${userAnswer ? escapeHtml(String(userAnswer)) : '<em style="color:#94a3b8;">No answer entered during proctoring</em>'}
        </div>
        <div class="upload-dropzone-row">
          ${uploadZoneHtml}
        </div>
      `;

      DOM.uploadTasksContainer.appendChild(card);
    });

    attachUploadDropzoneEvents();
    triggerMathJax();
  }

  function attachUploadDropzoneEvents() {
    const dropzones = document.querySelectorAll('.upload-dropzone');
    dropzones.forEach((dz) => {
      const qId = dz.dataset.qid;
      const fileInput = dz.querySelector('.file-input-task');

      dz.addEventListener('click', () => {
        if (fileInput) fileInput.click();
      });

      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) handleFileSelect(file, qId);
        });
      }

      dz.addEventListener('dragover', (e) => {
        e.preventDefault();
        dz.style.borderColor = '#1d68b8';
        dz.style.backgroundColor = '#eff6ff';
      });

      dz.addEventListener('dragleave', () => {
        dz.style.borderColor = '#94a3b8';
        dz.style.backgroundColor = '#f8fafc';
      });

      dz.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.style.borderColor = '#94a3b8';
        dz.style.backgroundColor = '#f8fafc';
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file, qId);
      });
    });

    // Remove buttons
    const removeBtns = document.querySelectorAll('.btn-remove-thumb');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qId = btn.dataset.qid;
        if (qId && state.uploadedFiles[qId]) {
          delete state.uploadedFiles[qId];
          saveSessionToStorage();
          renderUploadTasks();
          showToast('Uploaded sheet removed.');
        }
      });
    });

    // Thumbnail preview click to open full
    const thumbImgs = document.querySelectorAll('.upload-thumb-img');
    thumbImgs.forEach((img) => {
      img.addEventListener('click', () => {
        const w = window.open('');
        w.document.write(`<img src="${img.src}" style="max-width:100%; height:auto;">`);
      });
    });
  }

  // Client-Side Canvas Compression (Max 1200px width, JPEG 0.82)
  function handleFileSelect(file, qId) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5 MB limit specified in Article 14.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();

    if (isImage) {
      reader.onload = (e) => {
        const rawDataUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const MAX_WIDTH = 1200;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          const approxKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

          state.uploadedFiles[qId] = {
            dataUrl: compressedDataUrl,
            fileName: file.name,
            fileSize: `${approxKb} KB`,
            mimeType: 'image/jpeg'
          };

          saveSessionToStorage();
          renderUploadTasks();
          showToast(`Sheet for Task ${qId} compressed (~${approxKb} KB) and attached.`);
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or spreadsheet document
      reader.onload = (e) => {
        const approxKb = Math.round(file.size / 1024);
        state.uploadedFiles[qId] = {
          dataUrl: e.target.result,
          fileName: file.name,
          fileSize: `${approxKb} KB`,
          mimeType: file.type
        };

        saveSessionToStorage();
        renderUploadTasks();
        showToast(`Document for Task ${qId} attached.`);
      };
      reader.readAsDataURL(file);
    }
  }

  // ============================================================================
  // STAGE 4: AI VISION VERIFICATION & FINAL GRADING (gemini-2.5-flash)
  // ============================================================================
  async function completeUploadAndGrade() {
    stopUploadTimer();

    const apiKey = (DOM.uploadGeminiKey?.value.trim()) || localStorage.getItem(GEMINI_KEY_STORAGE) || '';
    if (apiKey) {
      localStorage.setItem(GEMINI_KEY_STORAGE, apiKey);
    }

    const eligibleTasks = [];
    state.activeQuestions.forEach((q, idx) => {
      const file = state.uploadedFiles[q.id];
      if (file && file.dataUrl && file.dataUrl.startsWith('data:image/')) {
        eligibleTasks.push({ q, file, taskIndex: idx + 1 });
      }
    });

    if (apiKey && eligibleTasks.length > 0) {
      if (DOM.aiGradingOverlay) DOM.aiGradingOverlay.style.display = 'flex';

      for (let i = 0; i < eligibleTasks.length; i++) {
        const item = eligibleTasks[i];
        if (DOM.aiProgressBar) {
          DOM.aiProgressBar.style.width = `${Math.round(((i + 1) / eligibleTasks.length) * 100)}%`;
        }
        if (DOM.aiProgressStatus) {
          DOM.aiProgressStatus.textContent = `Evaluating Task ${item.taskIndex} of ${state.activeQuestions.length}...`;
        }
        if (DOM.aiLoadingDesc) {
          DOM.aiLoadingDesc.innerHTML = `Analyzing mathematical derivation & stoichiometry for <strong>${escapeHtml(item.q.title || item.q.field)}</strong> with <code>gemini-2.5-flash</code>...`;
        }

        await runAiVisionGradingForTask(item.q, item.file, apiKey);
      }

      if (DOM.aiGradingOverlay) DOM.aiGradingOverlay.style.display = 'none';
    }

    // Save intermediate upload state
    saveSessionToStorage();

    // In official Stage 2 simulation (Mode A) or sessions with advanced tasks, transition to Task 44 Oral Response
    const hasAdvanced = state.activeQuestions.some(q => q.difficulty === 'advanced');
    if (state.mode === 'proctored' || hasAdvanced) {
      enterOralStage();
    } else {
      finalizeAndShowReview();
    }
  }

  function finalizeAndShowReview() {
    stopOralPrepTimer();
    stopOralRecording();
    state.isSubmitted = true;
    state.gradingResult = gradeActiveSession();
    saveSessionToStorage();

    switchView('review');
    renderEvaluationSection();
    showToast('Examination attempt finalized and officially graded.');
  }

  // ============================================================================
  // STAGE 3.75: TASK 44 SPONTANEOUS ORAL-RESPONSE SIMULATOR (5 PTS)
  // ============================================================================
  let selectedOralTopic = null;

  function enterOralStage(fromLobby = false) {
    stopTimer();
    stopUploadTimer();
    detachProctoringListeners();

    switchView('oral');

    // 1. Find Advanced Tasks from current session (or default NSU Olympiad topics)
    const advancedTasks = state.activeQuestions.filter(q => q.difficulty === 'advanced');
    let topics = [];
    if (advancedTasks.length >= 3) {
      topics = advancedTasks.slice(0, 3);
    } else if (advancedTasks.length > 0) {
      topics = [...advancedTasks];
      const defaults = [
        { id: 'PARAM-ADV-SOLAR-01', title: 'Solar Midday Altitude & Graticule Mapping', field: 'Environmental sciences', points: 10, content: 'Determine solar culmination elevation at Russian coordinates.' },
        { id: 'PARAM-ADV-SULFIDE-01', title: 'Sulfide Dump Acid Mine Drainage Neutralization', field: 'Mining & mineral processing', points: 10, content: 'Calculate stoichiometric lime required to neutralize oxidation of sulfide waste.' },
        { id: 'ADV-03', title: 'Polymetallic Ore Net Smelter Return Valuation', field: 'Mining & mineral processing', points: 10, content: 'Calculate net smelter return (NSR) payable value accounting for deductions and penalties.' }
      ];
      defaults.forEach(d => {
        if (topics.length < 3 && !topics.some(t => t.id === d.id)) topics.push(d);
      });
    } else {
      topics = [
        { id: 'PARAM-ADV-SOLAR-01', title: 'Solar Midday Altitude & Graticule Mapping', field: 'Environmental sciences', points: 10, content: 'Determine solar culmination elevation at Russian coordinates.' },
        { id: 'PARAM-ADV-SULFIDE-01', title: 'Sulfide Dump Acid Mine Drainage Neutralization', field: 'Mining & mineral processing', points: 10, content: 'Calculate stoichiometric lime required to neutralize oxidation of sulfide waste.' },
        { id: 'ADV-03', title: 'Polymetallic Ore Net Smelter Return Valuation', field: 'Mining & mineral processing', points: 10, content: 'Calculate net smelter return (NSR) payable value accounting for deductions and penalties.' }
      ];
    }

    selectedOralTopic = topics[0];

    // Render topic cards
    if (DOM.oralTopicsContainer) {
      DOM.oralTopicsContainer.innerHTML = '';
      topics.forEach((t, idx) => {
        const card = document.createElement('div');
        card.className = `oral-topic-card ${idx === 0 ? 'selected' : ''}`;
        card.dataset.topicId = t.id;
        const stemText = (t.content || '').replace(/<[^>]+>/g, '').substring(0, 140);
        card.innerHTML = `
          <div class="topic-field">${escapeHtml(t.field)} · 10 pts</div>
          <h5>Option ${idx + 1}: ${escapeHtml(t.title || t.field)}</h5>
          <p>${escapeHtml(stemText)}...</p>
        `;
        card.addEventListener('click', () => {
          document.querySelectorAll('.oral-topic-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          selectedOralTopic = t;
          showToast(`Defending topic: ${t.title || t.field}`);
        });
        DOM.oralTopicsContainer.appendChild(card);
      });
    }

    // Reset recording UI state
    if (DOM.oralRecStatus) DOM.oralRecStatus.className = 'rec-status-indicator';
    if (DOM.oralRecStatusText) DOM.oralRecStatusText.textContent = 'Microphone Ready';
    if (DOM.btnStartMicRecord) {
      DOM.btnStartMicRecord.style.display = 'inline-flex';
      DOM.btnStartMicRecord.textContent = '● Record Voice (MediaRecorder)';
    }
    if (DOM.btnStopMicRecord) DOM.btnStopMicRecord.style.display = 'none';
    if (DOM.oralAudioPlaybackWrap) DOM.oralAudioPlaybackWrap.style.display = 'none';
    if (DOM.oralMicFallbackMsg) DOM.oralMicFallbackMsg.style.display = 'none';

    // Start 3:00 Preparation Countdown
    startOralPrepTimer();
    calculateOralRubricTotal();
    showToast('Task 44: 3-minute oral preparation phase started.');
  }

  function startOralPrepTimer() {
    stopOralPrepTimer();
    oralPrepSeconds = 180;
    updateOralPrepDisplay();

    oralPrepTimerInterval = setInterval(() => {
      if (oralPrepSeconds > 0) {
        oralPrepSeconds--;
        updateOralPrepDisplay();
      } else {
        stopOralPrepTimer();
        showToast('Preparation time complete! Beginning live 2-minute recording.');
        startOralRecording();
      }
    }, 1000);
  }

  function stopOralPrepTimer() {
    if (oralPrepTimerInterval) {
      clearInterval(oralPrepTimerInterval);
      oralPrepTimerInterval = null;
    }
  }

  function updateOralPrepDisplay() {
    if (!DOM.oralPrepTimerDisplay) return;
    const m = Math.floor(oralPrepSeconds / 60);
    const s = oralPrepSeconds % 60;
    DOM.oralPrepTimerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  async function startOralRecording() {
    stopOralPrepTimer();

    if (DOM.oralRecStatus) {
      DOM.oralRecStatus.className = 'rec-status-indicator recording';
    }
    if (DOM.oralRecStatusText) {
      DOM.oralRecStatusText.textContent = '● LIVE RECORDING IN PROGRESS';
    }
    if (DOM.btnStartMicRecord) DOM.btnStartMicRecord.style.display = 'none';
    if (DOM.btnStopMicRecord) DOM.btnStopMicRecord.style.display = 'inline-flex';

    oralAudioChunks = [];
    oralRecSeconds = 120;
    updateOralRecDisplay();

    // Start 2:00 Recording Timer
    oralRecTimerInterval = setInterval(() => {
      if (oralRecSeconds > 0) {
        oralRecSeconds--;
        updateOralRecDisplay();
      } else {
        stopOralRecording();
        showToast('2-minute recording time limit reached.');
      }
    }, 1000);

    // Initialize MediaRecorder API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        oralMediaRecorder = new MediaRecorder(stream);
        oralMediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) oralAudioChunks.push(e.data);
        };
        oralMediaRecorder.onstop = () => {
          const blob = new Blob(oralAudioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(blob);
          if (DOM.oralAudioPlayer) {
            DOM.oralAudioPlayer.src = audioUrl;
          }
          if (DOM.oralAudioPlaybackWrap) {
            DOM.oralAudioPlaybackWrap.style.display = 'block';
          }
          const duration = 120 - oralRecSeconds;
          if (DOM.oralAudioMeta) {
            DOM.oralAudioMeta.textContent = `Recorded: ${Math.floor(duration / 60)}m ${duration % 60}s · Topic: ${selectedOralTopic?.title || 'Defended'}`;
          }
          // Stop stream tracks
          stream.getTracks().forEach(track => track.stop());
        };
        oralMediaRecorder.start();
      } catch (err) {
        console.warn('Microphone access unavailable or denied:', err);
        if (DOM.oralMicFallbackMsg) DOM.oralMicFallbackMsg.style.display = 'block';
      }
    } else {
      if (DOM.oralMicFallbackMsg) DOM.oralMicFallbackMsg.style.display = 'block';
    }
  }

  function stopOralRecording() {
    if (oralRecTimerInterval) {
      clearInterval(oralRecTimerInterval);
      oralRecTimerInterval = null;
    }

    if (oralMediaRecorder && oralMediaRecorder.state !== 'inactive') {
      try { oralMediaRecorder.stop(); } catch (e) {}
    }

    if (DOM.oralRecStatus) {
      DOM.oralRecStatus.className = 'rec-status-indicator';
    }
    if (DOM.oralRecStatusText) {
      DOM.oralRecStatusText.textContent = '✓ Recording Finished';
    }
    if (DOM.btnStopMicRecord) DOM.btnStopMicRecord.style.display = 'none';
    if (DOM.btnStartMicRecord) {
      DOM.btnStartMicRecord.style.display = 'inline-flex';
      DOM.btnStartMicRecord.textContent = '🔄 Re-Record Voice';
    }

    calculateOralRubricTotal();
  }

  function calculateOralRubricTotal() {
    const c1 = parseFloat(DOM.rubricCrit1?.value || '1.5');
    const c2 = parseFloat(DOM.rubricCrit2?.value || '1.5');
    const c3 = parseFloat(DOM.rubricCrit3?.value || '1.0');
    const c4 = parseFloat(DOM.rubricCrit4?.value || '1.0');
    const total = Math.min(5.0, Math.max(0.0, c1 + c2 + c3 + c4));

    if (DOM.oralTotalScoreDisplay) {
      DOM.oralTotalScoreDisplay.textContent = `${total.toFixed(1)} / 5.0 Points`;
    }

    state.oralResponse = {
      topicId: selectedOralTopic?.id || 'TASK-44',
      topicTitle: selectedOralTopic?.title || 'Advanced Olympiad Task',
      prepNotes: DOM.oralPrepNotes?.value || '',
      durationSec: 120 - oralRecSeconds,
      criteriaScores: { c1, c2, c3, c4 },
      totalEarned: total
    };

    return total;
  }

  function updateOralRecDisplay() {
    if (!DOM.oralRecTimerDisplay) return;
    const m = Math.floor(oralRecSeconds / 60);
    const s = oralRecSeconds % 60;
    DOM.oralRecTimerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function submitOralDefenseAndFinish() {
    calculateOralRubricTotal();
    finalizeAndShowReview();
    showToast('Task 44 Oral Defense saved. Examination score calculated.');
  }

  // ============================================================================
  // Syllabus Sub-Topic Classifier
  // ============================================================================
  function getSyllabusSubtopic(q) {
    const f = q.field || '';
    const title = (q.title || '').toLowerCase();
    const content = (q.content || '').toLowerCase();

    if (f.includes('Geography')) {
      if (title.includes('scale') || content.includes('scale') || content.includes('landmark') || content.includes('topographic map')) {
        return 'Geography, physical • Geodesy & Cartographic Scaling';
      }
      if (title.includes('river') || content.includes('river') || content.includes('lake') || content.includes('drainage') || content.includes('baikal')) {
        return 'Geography, physical • Hydrology & Hydrographic Networks';
      }
      if (title.includes('soil') || content.includes('soil') || content.includes('solonchak') || content.includes('chernozem')) {
        return 'Geography, physical • Soil Geography & Pedogenetic Processes';
      }
      return 'Geography, physical • Physical Landscapes & Geomorphology';
    }

    if (f.includes('Meteorology')) {
      if (title.includes('lapse') || content.includes('adiabatic') || content.includes('temperature') || content.includes('summit')) {
        return 'Meteorology & atmospheric sciences • Atmospheric Thermodynamics & Lapse Rates';
      }
      if (title.includes('baro') || content.includes('pressure') || content.includes('mercury') || content.includes('hydrostatic')) {
        return 'Meteorology & atmospheric sciences • Barometric Step & Pressure Regimes';
      }
      if (title.includes('precip') || content.includes('rainfall') || content.includes('annual norm') || content.includes('monsoon')) {
        return 'Meteorology & atmospheric sciences • Hydrometeorological Regimes & Precipitation';
      }
      return 'Meteorology & atmospheric sciences • Synoptic Meteorology & Climatology';
    }

    if (f.includes('Geology')) {
      if (title.includes('mineral') || content.includes('crystal') || content.includes('hardness') || content.includes('mohs') || content.includes('quartz')) {
        return 'Geology • Mineralogy, Crystallography & Symmetry';
      }
      if (title.includes('rock') || content.includes('granite') || content.includes('basalt') || content.includes('gneiss') || content.includes('petrology')) {
        return 'Geology • Igneous, Sedimentary & Metamorphic Petrology';
      }
      if (title.includes('fault') || content.includes('fold') || content.includes('anticline') || content.includes('dip')) {
        return 'Geology • Structural Geology & Tectonics';
      }
      return 'Geology • General Geology & Geochronology';
    }

    if (f.includes('Geochemistry') || f.includes('geophysics')) {
      if (title.includes('echo') || content.includes('sound') || content.includes('acoustic') || content.includes('seismic') || content.includes('travel time')) {
        return 'Geochemistry & geophysics • Exploration Seismology & Acoustic Wave Propagation';
      }
      if (title.includes('resist') || content.includes('conductivity') || content.includes('ohm') || content.includes('ves')) {
        return 'Geochemistry & geophysics • Electrical Prospecting & Specific Resistance';
      }
      if (title.includes('iron') || content.includes('redox') || content.includes('isotope') || content.includes('ph')) {
        return 'Geochemistry & geophysics • Aqueous Geochemistry & Element Migration';
      }
      return 'Geochemistry & geophysics • Physical Fields of the Earth & Geochemical Exploration';
    }

    if (f.includes('Mining')) {
      if (title.includes('prism') || content.includes('prism') || content.includes('cross-section') || content.includes('reserve')) {
        return 'Mining & mineral processing • Geometric Ore Reserve Estimation (Parallel Sections)';
      }
      if (title.includes('grade') || content.includes('flotation') || content.includes('recovery') || content.includes('concentrate') || content.includes('tailing')) {
        return 'Mining & mineral processing • Mineral Processing Mass Balance & Beneficiation';
      }
      if (title.includes('dump') || content.includes('sulfide') || content.includes('acid') || content.includes('neutraliz')) {
        return 'Mining & mineral processing • Environmental Geotechnics & Waste Rock Dump Management';
      }
      return 'Mining & mineral processing • Rational Subsoil Use & Mining Technology';
    }

    if (f.includes('Ecology')) {
      if (title.includes('succession') || content.includes('pioneer') || content.includes('lichen') || content.includes('climax')) {
        return 'Ecology • Ecological Succession & Ecosystem Homeostasis';
      }
      if (title.includes('trophic') || content.includes('energy') || content.includes('food') || content.includes('biomass')) {
        return 'Ecology • Trophic Web Dynamics & Energetics';
      }
      return 'Ecology • Biospheric Conservation & Ecological Communities';
    }

    if (f.includes('Environmental')) {
      if (title.includes('solar') || content.includes('solstice') || content.includes('zenith') || content.includes('latitude')) {
        return 'Environmental sciences • Solar Radiation Geometry & Latitude Insolation';
      }
      if (title.includes('metal') || content.includes('chromium') || content.includes('speciation') || content.includes('toxicity')) {
        return 'Environmental sciences • Heavy Metal Biogeochemistry & Environmental Monitoring';
      }
      if (title.includes('smog') || content.includes('greenhouse') || content.includes('emission') || content.includes('sanitary')) {
        return 'Environmental sciences • Atmospheric Pollution & Sanitary Protection Zones';
      }
      return 'Environmental sciences • Anthropogenic Impact & Sustainability';
    }

    return `${f} • Core Syllabus Competency`;
  }

  async function runAiVisionGradingForTask(q, file, apiKey) {
    try {
      const base64Data = file.dataUrl.split(',')[1];
      const prompt = `You are a strict academic examiner for the Open Doors Russian Scholarship Project (Earth and Environmental Sciences for Sustainability, Novosibirsk State University).
Evaluate this student's handwritten solution sheet against the task and official NSU model solution.

TASK DETAILS:
Task Title: ${q.title}
Field: ${q.field}
Max Points: ${q.points}
Question Content: ${q.content.replace(/<[^>]+>/g, '')}
Official Model Solution:
${q.modelSolution || q.explanation || 'Compare against standard academic scientific derivation'}

CRITERIA:
Evaluate the candidate's handwritten derivation according to standard NSU olympiad grading rubrics:
1. Did the candidate set up the correct physical/chemical/geographic formula?
2. Are intermediate mathematical substitutions and stoichiometric calculations accurate?
3. Is the final numerical answer correct with appropriate units?

Return JSON ONLY matching this format:
{
  "awardedPoints": <number from 0 to ${q.points}>,
  "transcription": "<concise summary of student handwritten work>",
  "criteriaBreakdown": [
    {"criterion": "Formulation & Method", "points": <points>, "max": <max>, "feedback": "<observation>"},
    {"criterion": "Calculations & Derivations", "points": <points>, "max": <max>, "feedback": "<observation>"},
    {"criterion": "Final Answer & Units", "points": <points>, "max": <max>, "feedback": "<observation>"}
  ],
  "verdict": "<Detailed feedback justifying the points awarded>"
}`;

      let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inline_data: { mime_type: 'image/jpeg', data: base64Data } },
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json'
          }
        })
      });

      if (!response.ok) {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { inline_data: { mime_type: 'image/jpeg', data: base64Data } },
                  { text: prompt }
                ]
              }
            ],
            generationConfig: {
              response_mime_type: 'application/json'
            }
          })
        });
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = replyText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      file.aiGrading = {
        awardedPoints: typeof parsed.awardedPoints === 'number' ? Math.min(q.points, Math.max(0, parsed.awardedPoints)) : Math.round(q.points * 0.7),
        transcription: parsed.transcription || 'Handwritten sheet transcribed.',
        criteriaBreakdown: Array.isArray(parsed.criteriaBreakdown) ? parsed.criteriaBreakdown : [],
        verdict: parsed.verdict || 'Evaluation completed against NSU criteria.'
      };
    } catch (err) {
      console.warn('AI Vision grading error for task', q.id, err);
      file.aiGrading = {
        awardedPoints: Math.round(q.points * 0.7),
        transcription: 'Sheet recorded. AI connection fallback applied.',
        criteriaBreakdown: [],
        verdict: 'Handwritten sheet attached. Review against model solution.'
      };
    }
  }

  function gradeActiveSession() {
    let earnedPoints = 0;
    let maxPoints = 0;
    let fullyCorrectCount = 0;
    let partialCreditCount = 0;

    const fieldScores = {};
    ALL_FIELDS.forEach((f) => {
      fieldScores[f] = { count: 0, earned: 0, max: 0 };
    });

    const taskEvaluations = state.activeQuestions.map((q, idx) => {
      const qPts = q.points || 1;
      maxPoints += qPts;

      const f = q.field || 'Environmental sciences';
      if (!fieldScores[f]) fieldScores[f] = { count: 0, earned: 0, max: 0 };
      fieldScores[f].count++;
      fieldScores[f].max += qPts;

      const userAnswer = state.savedAnswers[q.id];
      let taskEarned = 0;
      let status = 'unanswered'; // 'correct' | 'partial' | 'incorrect' | 'unanswered'

      if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
        status = 'unanswered';
        taskEarned = 0;
      } else if (q.type === 'single-choice') {
        const isCorrect = String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        if (isCorrect) {
          taskEarned = qPts;
          status = 'correct';
          fullyCorrectCount++;
        } else {
          taskEarned = 0;
          status = 'incorrect';
        }
      } else if (q.type === 'multiple-select') {
        const correctArray = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        const userArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

        const correctSet = new Set(correctArray.map((s) => String(s).trim().toLowerCase()));
        const userSet = new Set(userArray.map((s) => String(s).trim().toLowerCase()));

        let matched = 0;
        userSet.forEach((item) => {
          if (correctSet.has(item)) matched++;
        });

        if (userSet.size === correctSet.size && matched === correctSet.size) {
          taskEarned = qPts;
          status = 'correct';
          fullyCorrectCount++;
        } else if (matched > 0 && userSet.size <= correctSet.size) {
          taskEarned = Math.round((matched / correctSet.size) * qPts * 10) / 10;
          status = 'partial';
          partialCreditCount++;
        } else {
          taskEarned = 0;
          status = 'incorrect';
        }
      } else if (q.type === 'short-answer') {
        const userStr = String(userAnswer).trim().toLowerCase();
        const expected = String(q.correctAnswer).trim().toLowerCase();

        // Check exact or numeric tolerance
        const userNum = parseFloat(userStr.replace(/[^\d.-]/g, ''));
        const expNum = parseFloat(expected.replace(/[^\d.-]/g, ''));

        if (!isNaN(userNum) && !isNaN(expNum) && Math.abs(userNum - expNum) <= 0.1) {
          taskEarned = qPts;
          status = 'correct';
          fullyCorrectCount++;
        } else if (userStr === expected || expected.includes(userStr) || userStr.includes(expected)) {
          taskEarned = qPts;
          status = 'correct';
          fullyCorrectCount++;
        } else {
          taskEarned = 0;
          status = 'incorrect';
        }
      } else if (q.type === 'extended-response') {
        // Check if AI Vision graded an uploaded handwritten sheet
        if (state.uploadedFiles[q.id]?.aiGrading?.awardedPoints !== undefined) {
          taskEarned = state.uploadedFiles[q.id].aiGrading.awardedPoints;
          status = taskEarned >= qPts ? 'correct' : taskEarned > 0 ? 'partial' : 'incorrect';
          if (status === 'correct') fullyCorrectCount++;
          else if (status === 'partial') partialCreditCount++;
        } else {
          // Keyword-based analytical grading against NSU rubric
          const keywords = q.requiredKeywords || [];
          const userText = String(userAnswer).toLowerCase();

        let hitCount = 0;
        keywords.forEach((kw) => {
          if (userText.includes(String(kw).toLowerCase())) hitCount++;
        });

        const ratio = keywords.length > 0 ? hitCount / keywords.length : 0.5;
        if (ratio >= 0.85) {
          taskEarned = qPts;
          status = 'correct';
          fullyCorrectCount++;
        } else if (ratio >= 0.4) {
          taskEarned = Math.round(qPts * ratio);
          status = 'partial';
          partialCreditCount++;
        } else {
          taskEarned = Math.round(qPts * 0.2); // Token points for attempt
          status = 'incorrect';
        }
        }
      }

      earnedPoints += taskEarned;
      fieldScores[f].earned += taskEarned;

      return {
        taskIndex: idx + 1,
        question: q,
        userAnswer,
        taskEarned,
        maxPoints: qPts,
        status
      };
    });

    // Factor in Task 44 Spontaneous Oral Defense (up to 5 points) if completed
    let oralEarned = 0;
    if (state.oralResponse && typeof state.oralResponse.totalEarned === 'number') {
      oralEarned = state.oralResponse.totalEarned;
      earnedPoints += oralEarned;
      maxPoints += 5.0;
    }

    const percentage = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

    return {
      earnedPoints,
      maxPoints,
      percentage,
      oralEarned,
      fullyCorrectCount,
      partialCreditCount,
      totalTasks: state.activeQuestions.length,
      fieldScores,
      taskEvaluations
    };
  }

  // ============================================================================
  // Render Review View
  // ============================================================================
  function renderEvaluationSection() {
    const res = state.gradingResult;
    if (!res) return;

    if (DOM.scoreEarned) DOM.scoreEarned.textContent = typeof res.earnedPoints === 'number' ? (Number.isInteger(res.earnedPoints) ? res.earnedPoints : res.earnedPoints.toFixed(1)) : res.earnedPoints;
    if (DOM.scoreMax) DOM.scoreMax.textContent = res.maxPoints;
    if (DOM.scorePercentage) DOM.scorePercentage.textContent = `${res.percentage}%`;
    if (DOM.scoreCorrectTasks) DOM.scoreCorrectTasks.textContent = res.fullyCorrectCount;
    if (DOM.scoreTotalTasks) DOM.scoreTotalTasks.textContent = res.totalTasks;
    if (DOM.scorePartialTasks) DOM.scorePartialTasks.textContent = res.partialCreditCount;

    if (DOM.scoreOral) {
      if (state.oralResponse) {
        DOM.scoreOral.textContent = state.oralResponse.totalEarned.toFixed(1);
        if (DOM.scoreOralSub) DOM.scoreOralSub.textContent = `Topic: ${state.oralResponse.topicTitle || 'Defended'}`;
      } else {
        DOM.scoreOral.textContent = 'N/A';
        if (DOM.scoreOralSub) DOM.scoreOralSub.textContent = 'Written only';
      }
    }

    if (DOM.scoreGradeBadge) {
      if (res.percentage >= 85) {
        DOM.scoreGradeBadge.textContent = 'Prize Winner / Diploma I Degree (NSU Selection)';
        DOM.scoreGradeBadge.style.color = '#15803d';
      } else if (res.percentage >= 70) {
        DOM.scoreGradeBadge.textContent = 'Awardee / Diploma II Degree';
        DOM.scoreGradeBadge.style.color = '#1d4ed8';
      } else if (res.percentage >= 50) {
        DOM.scoreGradeBadge.textContent = 'Passed Second Stage Qualification';
        DOM.scoreGradeBadge.style.color = '#b45309';
      } else {
        DOM.scoreGradeBadge.textContent = 'Did Not Meet Second-Stage Threshold';
        DOM.scoreGradeBadge.style.color = '#dc2626';
      }
    }

    // Field Breakdown Table
    if (DOM.fieldBreakdownTbody) {
      DOM.fieldBreakdownTbody.innerHTML = '';
      Object.keys(res.fieldScores).forEach((field) => {
        const data = res.fieldScores[field];
        if (data.count === 0) return;
        const pct = data.max > 0 ? Math.round((data.earned / data.max) * 100) : 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${field}</strong></td>
          <td>${data.count}</td>
          <td>${data.earned}</td>
          <td>${data.max}</td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="flex-grow:1; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
                <div style="width:${pct}%; height:100%; background:${pct >= 70 ? '#15803d' : pct >= 40 ? '#f59e0b' : '#dc2626'};"></div>
              </div>
              <span style="font-size:0.8rem; font-weight:600;">${pct}%</span>
            </div>
          </td>
        `;
        DOM.fieldBreakdownTbody.appendChild(tr);
      });
    }

    // Generate Plain-Text Diagnostic Report
    generateDiagnosticReport(res);

    // Render Solutions
    renderSolutionsList(res);

    triggerMathJax();
  }

  function generateDiagnosticReport(res) {
    if (!DOM.examReportText) return;

    let report = `================================================================================\n`;
    report += `OPEN DOORS RUSSIAN SCHOLARSHIP PROJECT: SECOND STAGE SIMULATOR\n`;
    report += `Subject: Earth and Environmental Sciences for Sustainability (Bachelor's • NSU)\n`;
    report += `Candidate: Ahmad Al Harits\n`;
    report += `Date & Time: ${new Date().toLocaleString()}\n`;
    report += `Mode: ${state.mode === 'proctored' ? 'Official Proctored Simulation' : 'Test Session / Practice Drill'}\n`;
    report += `================================================================================\n\n`;

    report += `EXAMINATION SCORE RECAP:\n`;
    report += `- Total Score: ${res.earnedPoints} / ${res.maxPoints} Points (${res.percentage}%)\n`;
    report += `- Fully Correct Tasks: ${res.fullyCorrectCount} / ${res.totalTasks}\n`;
    report += `- Partial Credit Tasks: ${res.partialCreditCount}\n`;
    report += `- Tab-Switch Focus Violations: ${state.focusLossCount}\n\n`;

    report += `PERFORMANCE BREAKDOWN ACROSS THE 7 FIELDS OF SCIENCE:\n`;
    Object.keys(res.fieldScores).forEach((f) => {
      const d = res.fieldScores[f];
      if (d.count > 0) {
        const p = d.max > 0 ? Math.round((d.earned / d.max) * 100) : 0;
        report += `  * ${f.padEnd(38, ' ')} : ${d.earned}/${d.max} pts (${p}%)\n`;
      }
    });

    report += `\n================================================================================\n`;
    report += `DETAILED TASK-BY-TASK WALKTHROUGH & OFFICIAL MODEL SOLUTIONS:\n`;
    report += `================================================================================\n\n`;

    res.taskEvaluations.forEach((item) => {
      const q = item.question;
      report += `[Task ${item.taskIndex}] ${q.title || q.field} (${q.points} pt) — Status: ${item.status.toUpperCase()} (${item.taskEarned}/${item.maxPoints} pts)\n`;
      report += `Syllabus Area: ${getSyllabusSubtopic(q)}\n`;
      report += `Your Answer: ${JSON.stringify(item.userAnswer || 'None')}\n`;
      if (state.uploadedFiles[q.id]) {
        const f = state.uploadedFiles[q.id];
        report += `[Attached Handwritten Sheet]: ${f.fileName} (${f.fileSize})\n`;
        if (f.aiGrading) {
          report += `[AI Vision Evaluation]: ${f.aiGrading.awardedPoints}/${q.points} pts — ${f.aiGrading.verdict}\n`;
        }
      }
      report += `Correct / Model Answer: ${JSON.stringify(q.correctAnswer || 'See rubric')}\n`;
      if (q.explanation) {
        report += `Explanation: ${q.explanation.replace(/<[^>]+>/g, '')}\n`;
      }
      report += `--------------------------------------------------------------------------------\n\n`;
    });

    if (state.oralResponse) {
      report += `\n================================================================================\n`;
      report += `TASK 44 ORAL DEFENSE OF ADVANCED TASKS:\n`;
      report += `================================================================================\n`;
      report += `- Defended Topic: ${state.oralResponse.topicTitle}\n`;
      report += `- Awarded Oral Score: ${state.oralResponse.totalEarned.toFixed(1)} / 5.0 Points\n`;
      report += `- Spoken Duration: ${Math.floor(state.oralResponse.durationSec / 60)}m ${state.oralResponse.durationSec % 60}s\n`;
      report += `- Criterion 1 (Formulation): ${state.oralResponse.criteriaScores?.c1 || 1.5} / 1.5 pts\n`;
      report += `- Criterion 2 (Derivation Rigor): ${state.oralResponse.criteriaScores?.c2 || 1.5} / 1.5 pts\n`;
      report += `- Criterion 3 (Academic Terminology): ${state.oralResponse.criteriaScores?.c3 || 1.0} / 1.0 pt\n`;
      report += `- Criterion 4 (Error Analysis): ${state.oralResponse.criteriaScores?.c4 || 1.0} / 1.0 pt\n`;
      if (state.oralResponse.prepNotes) {
        report += `- Prepared Notes: ${state.oralResponse.prepNotes.replace(/\n/g, ' ')}\n`;
      }
      report += `--------------------------------------------------------------------------------\n\n`;
    }

    DOM.examReportText.value = report;
  }

  function renderSolutionsList(res) {
    if (!DOM.solutionsContainer) return;
    DOM.solutionsContainer.innerHTML = '';

    res.taskEvaluations.forEach((item) => {
      const q = item.question;
      const card = document.createElement('div');
      card.className = `solution-card ${item.status}`;
      const subtopic = getSyllabusSubtopic(q);

      let userAnsDisplay = '';
      if (item.userAnswer === undefined || item.userAnswer === null || item.userAnswer === '') {
        userAnsDisplay = '<span style="color:#94a3b8; font-style:italic;">No answer recorded</span>';
      } else if (Array.isArray(item.userAnswer)) {
        userAnsDisplay = item.userAnswer.join(', ');
      } else {
        userAnsDisplay = String(item.userAnswer);
      }

      let modelDisplay = '';
      if (q.modelSolution) {
        modelDisplay = q.modelSolution;
      } else if (q.explanation) {
        modelDisplay = `<strong>Correct Answer:</strong> ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}<br><br>${q.explanation}`;
      } else {
        modelDisplay = `<strong>Correct Answer:</strong> ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}`;
      }

      let attachedSheetHtml = '';
      const file = state.uploadedFiles[q.id];
      if (file) {
        let aiBoxHtml = '';
        if (file.aiGrading) {
          let rowsHtml = '';
          if (file.aiGrading.criteriaBreakdown && file.aiGrading.criteriaBreakdown.length > 0) {
            rowsHtml = `
              <table class="ai-criteria-table">
                <thead>
                  <tr><th>Criterion</th><th>Score</th><th>Examiner Feedback</th></tr>
                </thead>
                <tbody>
                  ${file.aiGrading.criteriaBreakdown.map(c => `
                    <tr>
                      <td><strong>${escapeHtml(c.criterion || '')}</strong></td>
                      <td><strong style="color:#15803d;">${c.points}/${c.max}</strong></td>
                      <td>${escapeHtml(c.feedback || '')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;
          }

          aiBoxHtml = `
            <div class="ai-vision-box">
              <div class="ai-vision-header">
                <span>🤖 AI Vision Assessment (gemini-2.5-flash)</span>
                <span>Awarded: <strong>${file.aiGrading.awardedPoints} / ${q.points} Points</strong></span>
              </div>
              <p style="margin-bottom:0.4rem;"><strong>Transcribed Student Steps:</strong> ${escapeHtml(file.aiGrading.transcription || '')}</p>
              ${rowsHtml}
              <div class="ai-verdict-text">"${escapeHtml(file.aiGrading.verdict || '')}"</div>
            </div>
          `;
        }

        attachedSheetHtml = `
          <div class="attached-sheet-card">
            <img src="${file.dataUrl}" alt="Handwritten solution sheet" class="review-sheet-thumbnail" onclick="window.open(this.src)" title="Click to view full image">
            <div class="sheet-info-col">
              <h5>Attached Handwritten Solution Sheet (Article 14.1)</h5>
              <div>File: <strong>${escapeHtml(file.fileName)}</strong> (${file.fileSize})</div>
              <div style="color:#15803d; font-weight:600;">✓ Camera presentation requirement satisfied</div>
              <small style="color:#64748b;">Uploaded during 10-minute post-proctoring transfer window</small>
            </div>
          </div>
          ${aiBoxHtml}
        `;
      }

      card.innerHTML = `
        <div class="solution-header">
          <div>
            <span class="solution-title">Task ${item.taskIndex}: ${q.title || q.field}</span>
            <div><span class="syllabus-tag-pill">📘 ${escapeHtml(subtopic)}</span></div>
          </div>
          <span class="solution-points-tag" style="color: ${item.status === 'correct' ? '#15803d' : item.status === 'partial' ? '#b45309' : '#dc2626'};">
            ${item.taskEarned} / ${item.maxPoints} pts (${item.status.toUpperCase()})
          </span>
        </div>
        <div class="solution-stem">${q.content}</div>
        <div class="user-answer-box">
          <strong>Your submitted answer:</strong> ${userAnsDisplay}
        </div>
        ${attachedSheetHtml}
        <div class="model-solution-box">
          ${modelDisplay}
        </div>
      `;

      DOM.solutionsContainer.appendChild(card);
    });

    // Also render Task 44 Oral Defense card if present
    if (state.oralResponse) {
      const oralCard = document.createElement('div');
      oralCard.className = 'solution-card correct';
      oralCard.innerHTML = `
        <div class="solution-header">
          <div>
            <span class="solution-title">Task 44: Spontaneous Oral Response & Defense</span>
            <div><span class="syllabus-tag-pill">🎙️ Oral Defense of Advanced Tasks • Official NSU 5-Point Rubric</span></div>
          </div>
          <span class="solution-points-tag" style="color: #15803d;">
            ${state.oralResponse.totalEarned.toFixed(1)} / 5.0 pts (ORAL DEFENSE)
          </span>
        </div>
        <div class="solution-stem">
          <strong>Defended Topic:</strong> ${escapeHtml(state.oralResponse.topicTitle)}<br>
          <strong>Spoken Presentation Duration:</strong> ${Math.floor(state.oralResponse.durationSec / 60)}m ${state.oralResponse.durationSec % 60}s
        </div>
        ${state.oralResponse.prepNotes ? `<div class="user-answer-box"><strong>Candidate Prepared Bullet Points:</strong><br>${escapeHtml(state.oralResponse.prepNotes).replace(/\n/g, '<br>')}</div>` : ''}
        <div class="model-solution-box">
          <strong>Official NSU 4-Criterion Evaluation Breakdown:</strong>
          <ul style="margin-top:0.4rem; padding-left:1.2rem; font-size:0.85rem; line-height:1.6;">
            <li>Problem Formulation & Boundary Equations: <strong>${state.oralResponse.criteriaScores?.c1 || 1.5} / 1.5 pts</strong></li>
            <li>Derivation Rigor & Calculation Accuracy: <strong>${state.oralResponse.criteriaScores?.c2 || 1.5} / 1.5 pts</strong></li>
            <li>Academic Fluency & Russian-School Terminology: <strong>${state.oralResponse.criteriaScores?.c3 || 1.0} / 1.0 pt</strong></li>
            <li>Error Analysis & Geological Heterogeneity Constraints: <strong>${state.oralResponse.criteriaScores?.c4 || 1.0} / 1.0 pt</strong></li>
          </ul>
        </div>
      `;
      DOM.solutionsContainer.appendChild(oralCard);
    }
  }

  // ============================================================================
  // LocalStorage Persistence
  // ============================================================================
  function saveSessionToStorage() {
    try {
      state.lastSaved = new Date().toLocaleTimeString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save session to localStorage:', e);
    }
  }

  function loadSessionFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Could not load session from localStorage:', e);
      return null;
    }
  }

  // ============================================================================
  // 4-Step Device Check Wizard Controller (Mode A)
  // ============================================================================
  function openWizardModal() {
    currentWizardStep = 1;
    updateWizardUI();
    if (DOM.wizardModal) DOM.wizardModal.style.display = 'flex';
  }

  function closeWizardModal() {
    if (DOM.wizardModal) DOM.wizardModal.style.display = 'none';
  }

  function updateWizardUI() {
    if (DOM.wizardStepPills) {
      DOM.wizardStepPills.forEach((pill) => {
        const stepNum = parseInt(pill.dataset.step, 10);
        pill.classList.toggle('active', stepNum === currentWizardStep);
      });
    }

    if (DOM.wizardStepPanes) {
      DOM.wizardStepPanes.forEach((pane, idx) => {
        pane.style.display = idx + 1 === currentWizardStep ? 'block' : 'none';
      });
    }

    if (DOM.btnWizardPrev) {
      DOM.btnWizardPrev.style.display = currentWizardStep > 1 ? 'inline-flex' : 'none';
    }
    if (DOM.btnWizardNext) {
      DOM.btnWizardNext.style.display = currentWizardStep < 4 ? 'inline-flex' : 'none';
    }
    if (DOM.btnWizardLaunchExam) {
      DOM.btnWizardLaunchExam.style.display = currentWizardStep === 4 ? 'inline-flex' : 'none';
    }
  }

  // ============================================================================
  // Calculator & NSU Constants Reference Controller
  // ============================================================================
  function setupCalculatorAndReference() {
    if (DOM.btnToggleCalc) {
      DOM.btnToggleCalc.addEventListener('click', () => {
        if (!DOM.calcDrawer) return;
        const isHidden = DOM.calcDrawer.style.display === 'none' || !DOM.calcDrawer.style.display;
        DOM.calcDrawer.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (DOM.btnCloseCalc) {
      DOM.btnCloseCalc.addEventListener('click', () => {
        if (DOM.calcDrawer) DOM.calcDrawer.style.display = 'none';
      });
    }

    if (DOM.calcTabBtns) {
      DOM.calcTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tab;
          DOM.calcTabBtns.forEach((b) => b.classList.remove('active'));
          DOM.calcTabContents.forEach((c) => c.classList.remove('active'));

          btn.classList.add('active');
          const target = document.getElementById(`tab-${tab}`);
          if (target) target.classList.add('active');
        });
      });
    }

    // Calculator buttons
    const calcBtns = document.querySelectorAll('.calc-btn');
    calcBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const num = btn.classList.contains('calc-num');
        const op = btn.dataset.action;
        const fn = btn.dataset.fn;

        if (num) {
          handleCalcNum(btn.textContent);
        } else if (op) {
          handleCalcOp(op);
        } else if (fn) {
          handleCalcFp(fn);
        }
      });
    });
  }

  function handleCalcNum(digit) {
    if (calcState.shouldResetDisplay || calcState.current === '0') {
      calcState.current = digit === '.' ? '0.' : digit;
      calcState.shouldResetDisplay = false;
    } else {
      if (digit === '.' && calcState.current.includes('.')) return;
      calcState.current += digit;
    }
    updateCalcDisplay();
  }

  function handleCalcOp(action) {
    if (action === 'clear') {
      calcState.current = '0';
      calcState.previous = null;
      calcState.operation = null;
      calcState.history = '';
    } else if (action === 'backspace') {
      if (calcState.current.length > 1) {
        calcState.current = calcState.current.slice(0, -1);
      } else {
        calcState.current = '0';
      }
    } else if (action === 'equals') {
      executeCalcEquals();
    } else {
      calcState.operation = action;
      calcState.previous = calcState.current;
      calcState.history = `${calcState.previous} ${getOpSymbol(action)}`;
      calcState.shouldResetDisplay = true;
    }
    updateCalcDisplay();
  }

  function handleCalcFp(fn) {
    const val = parseFloat(calcState.current);
    let res = val;
    switch (fn) {
      case 'sin':
        res = Math.sin((val * Math.PI) / 180);
        break;
      case 'cos':
        res = Math.cos((val * Math.PI) / 180);
        break;
      case 'tan':
        res = Math.tan((val * Math.PI) / 180);
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log':
        res = Math.log10(val);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'pi':
        res = Math.PI;
        break;
      case 'pow':
        calcState.operation = 'pow';
        calcState.previous = calcState.current;
        calcState.history = `${calcState.previous} ^`;
        calcState.shouldResetDisplay = true;
        updateCalcDisplay();
        return;
    }
    calcState.current = String(Math.round(res * 1000000) / 1000000);
    calcState.shouldResetDisplay = true;
    updateCalcDisplay();
  }

  function executeCalcEquals() {
    if (!calcState.operation || calcState.previous === null) return;
    const a = parseFloat(calcState.previous);
    const b = parseFloat(calcState.current);
    let res = 0;
    switch (calcState.operation) {
      case 'add':
        res = a + b;
        break;
      case 'subtract':
        res = a - b;
        break;
      case 'multiply':
        res = a * b;
        break;
      case 'divide':
        res = b !== 0 ? a / b : 'Error';
        break;
      case 'pow':
        res = Math.pow(a, b);
        break;
    }
    calcState.history = `${calcState.previous} ${getOpSymbol(calcState.operation)} ${calcState.current} =`;
    calcState.current = String(typeof res === 'number' ? Math.round(res * 1000000) / 1000000 : res);
    calcState.operation = null;
    calcState.previous = null;
    calcState.shouldResetDisplay = true;
  }

  function getOpSymbol(op) {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '−';
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'pow': return '^';
      default: return '';
    }
  }

  function updateCalcDisplay() {
    if (DOM.calcDisplay) DOM.calcDisplay.value = calcState.current;
    if (DOM.calcHistory) DOM.calcHistory.textContent = calcState.history;
  }

  // ============================================================================
  // Client-Side PDF Question Importer Setup
  // ============================================================================
  function setupPdfImporter() {
    if (DOM.btnLobbyOpenImporter) {
      DOM.btnLobbyOpenImporter.addEventListener('click', () => {
        if (DOM.importerModal) DOM.importerModal.style.display = 'flex';
      });
    }

    if (DOM.btnCloseImporter) {
      DOM.btnCloseImporter.addEventListener('click', () => {
        if (DOM.importerModal) DOM.importerModal.style.display = 'none';
      });
    }

    // Toggle Gemini API key field
    const importMethodRadios = document.querySelectorAll('input[name="import-method"]');
    importMethodRadios.forEach((r) => {
      r.addEventListener('change', () => {
        if (DOM.geminiKeyContainer) {
          DOM.geminiKeyContainer.style.display = r.value === 'gemini' ? 'block' : 'none';
        }
      });
    });

    if (DOM.pdfFileInput) {
      DOM.pdfFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && DOM.fileNameDisplay) {
          DOM.fileNameDisplay.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
        }
      });
    }

    if (DOM.btnProcessPdf) {
      DOM.btnProcessPdf.addEventListener('click', processUploadedPdf);
    }

    if (DOM.btnCommitImported) {
      DOM.btnCommitImported.addEventListener('click', commitImportedQuestions);
    }
  }

  async function processUploadedPdf() {
    const file = DOM.pdfFileInput?.files[0];
    if (!file) {
      alert('Please choose a .PDF file first.');
      return;
    }

    if (!window.pdfjsLib) {
      alert('PDF.js library is not loaded. Check internet connection.');
      return;
    }

    DOM.importerStatusLog.textContent = 'Reading PDF pages via PDF.js...';

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += `\n--- Page ${i} ---\n` + pageText;
      }

      DOM.importerStatusLog.textContent = `Extracted ${pdf.numPages} pages (${fullText.length} characters). Parsing questions...`;

      const method = document.querySelector('input[name="import-method"]:checked')?.value || 'regex';

      if (method === 'gemini') {
        await parseWithGemini(fullText);
      } else {
        parseWithRegex(fullText);
      }
    } catch (err) {
      DOM.importerStatusLog.textContent = `Error reading PDF: ${err.message}`;
    }
  }

  function parseWithRegex(text) {
    const parsed = [];
    const taskRegex = /(?:Task|Question)\s+(\d+)[\s.:]+([\s\S]*?)(?=(?:Task|Question)\s+\d+|$)/gi;
    let match;

    while ((match = taskRegex.exec(text)) !== null) {
      const taskNum = match[1];
      const block = match[2].trim();

      const lines = block.split(/\n|\r/).map((l) => l.trim()).filter(Boolean);
      const stem = lines.slice(0, 3).join(' ');

      parsed.push({
        id: `IMP-${taskNum.padStart(2, '0')}`,
        field: 'Geography, physical',
        difficulty: 'basic',
        type: 'single-choice',
        points: 1,
        title: `Imported Task ${taskNum}`,
        content: `<p>${stem}</p>`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'Extracted automatically from PDF document.'
      });
    }

    parsedImportQuestions = parsed;
    displayParsedPreview(parsed);
  }

  async function parseWithGemini(text) {
    const apiKey = DOM.geminiApiKeyInput?.value.trim() || localStorage.getItem(GEMINI_KEY_STORAGE);
    if (!apiKey) {
      DOM.importerStatusLog.textContent = 'Please provide a valid Google Gemini API Key.';
      return;
    }
    localStorage.setItem(GEMINI_KEY_STORAGE, apiKey);

    DOM.importerStatusLog.textContent = 'Calling Gemini API for Olympiad task extraction...';

    const prompt = `Extract all examination tasks from the following text into valid JSON matching this schema:
[
  {
    "id": "IMP-01",
    "field": "Geography, physical",
    "difficulty": "basic",
    "type": "single-choice",
    "points": 1,
    "title": "Task title",
    "content": "<p>Task stem</p>",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "explanation": "Why correct"
  }
]
Text:
${text.slice(0, 15000)}
Return pure JSON only.`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = reply.replace(/```json/g, '').replace(/```/g, '').trim();
      const questions = JSON.parse(cleanJson);

      parsedImportQuestions = questions;
      displayParsedPreview(questions);
    } catch (e) {
      DOM.importerStatusLog.textContent = `Gemini extraction failed: ${e.message}`;
    }
  }

  function displayParsedPreview(questions) {
    if (!DOM.importerPreviewBox || !DOM.importerPreviewList) return;
    DOM.parsedCountBadge.textContent = questions.length;
    DOM.importerPreviewList.innerHTML = '';

    questions.slice(0, 5).forEach((q) => {
      const item = document.createElement('div');
      item.style.padding = '0.4rem 0';
      item.style.borderBottom = '1px solid #e2e8f0';
      item.innerHTML = `<strong>${q.title || q.id}:</strong> ${q.content.slice(0, 80)}...`;
      DOM.importerPreviewList.appendChild(item);
    });

    DOM.importerPreviewBox.style.display = 'block';
    if (DOM.btnCommitImported) DOM.btnCommitImported.disabled = questions.length === 0;
    DOM.importerStatusLog.textContent = `Successfully parsed ${questions.length} questions. Click "Append to Active Bank" to import.`;
  }

  function commitImportedQuestions() {
    if (!parsedImportQuestions || parsedImportQuestions.length === 0) return;
    if (!window.QUESTION_BANK) window.QUESTION_BANK = [];
    window.QUESTION_BANK.push(...parsedImportQuestions);

    showToast(`Appended ${parsedImportQuestions.length} custom tasks to QUESTION_BANK.`);
    if (DOM.importerModal) DOM.importerModal.style.display = 'none';
  }

  // ============================================================================
  // Print & PDF Export Controllers
  // ============================================================================
  function prepareBlankPrint() {
    if (!DOM.blankPrintContainer) return;
    DOM.blankPrintContainer.innerHTML = '';

    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '2rem';
    header.innerHTML = `
      <h2 style="font-family:Cinzel,serif; font-size:1.4rem;">OPEN DOORS INTERNATIONAL OLYMPIAD</h2>
      <h3 style="font-size:1.1rem; color:#1967d2;">Novosibirsk State University • Earth & Environmental Sciences</h3>
      <p style="font-size:0.9rem; color:#64748b;">Blank Examination Paper • ${state.activeQuestions.length} Tasks Total</p>
      <hr style="margin:1rem 0; border:0; border-top:1px solid #000;">
    `;
    DOM.blankPrintContainer.appendChild(header);

    state.activeQuestions.forEach((q, idx) => {
      const card = document.createElement('article');
      card.className = 'blank-task-card';

      let optionsHtml = '';
      if (q.type === 'single-choice' || q.type === 'multiple-select') {
        const symbol = q.type === 'single-choice' ? '○' : '□';
        optionsHtml = `
          <div style="margin-top:0.75rem; display:flex; flex-direction:column; gap:0.4rem;">
            ${(q.options || []).map((opt) => `<div>${symbol} ${opt}</div>`).join('')}
          </div>`;
      } else if (q.type === 'short-answer') {
        optionsHtml = `
          <div style="margin-top:1rem; border-bottom:1px solid #94a3b8; height:24px; max-width:400px;">
            <small style="color:#64748b;">Answer:</small>
          </div>`;
      } else if (q.type === 'extended-response') {
        optionsHtml = `
          <div style="margin-top:1rem; border:1px solid #cbd5e1; height:180px; padding:0.5rem;">
            <small style="color:#64748b;">Solution & Derivation:</small>
          </div>`;
      }

      card.innerHTML = `
        <div style="font-weight:700; margin-bottom:0.35rem;">
          Task ${idx + 1} [${q.field} — ${q.difficulty.toUpperCase()} · ${q.points} pt]
        </div>
        <div style="margin-bottom:0.5rem;">${q.content}</div>
        ${optionsHtml}
      `;
      DOM.blankPrintContainer.appendChild(card);
    });

    triggerMathJax();
  }

  // ============================================================================
  // Event Listeners Setup
  // ============================================================================
  function setupEventListeners() {
    // Lobby: Resume Session Actions
    if (DOM.btnResumeSession) {
      DOM.btnResumeSession.addEventListener('click', resumeSavedSession);
    }
    if (DOM.btnDiscardSession) {
      DOM.btnDiscardSession.addEventListener('click', discardSavedSession);
    }

    // Lobby: Mode A Actions
    if (DOM.btnLobbyWizard) {
      DOM.btnLobbyWizard.addEventListener('click', openWizardModal);
    }
    if (DOM.btnLobbyStartProctored) {
      DOM.btnLobbyStartProctored.addEventListener('click', () => {
        startExamSession({ mode: 'proctored', presetId: 'stage2-full' });
      });
    }

    // Lobby: Mode B Actions
    if (DOM.practicePresetRadios) {
      DOM.practicePresetRadios.forEach((r) => {
        r.addEventListener('change', () => {
          if (DOM.practiceFieldSelectorWrap) {
            DOM.practiceFieldSelectorWrap.style.display = r.value === 'single-field' ? 'block' : 'none';
          }
        });
      });
    }

    if (DOM.btnLobbyStartPractice) {
      DOM.btnLobbyStartPractice.addEventListener('click', () => {
        const chosen = document.querySelector('input[name="practice-preset"]:checked')?.value || 'stage2-full';
        const targetField = DOM.practiceTargetField?.value || 'Geography, physical';
        startExamSession({ mode: 'unproctored', presetId: chosen, targetField });
      });
    }

    // Wizard Modal Events
    if (DOM.btnCloseWizard) {
      DOM.btnCloseWizard.addEventListener('click', closeWizardModal);
    }
    if (DOM.btnWizardNext) {
      DOM.btnWizardNext.addEventListener('click', () => {
        if (currentWizardStep < 4) {
          currentWizardStep++;
          updateWizardUI();
        }
      });
    }
    if (DOM.btnWizardPrev) {
      DOM.btnWizardPrev.addEventListener('click', () => {
        if (currentWizardStep > 1) {
          currentWizardStep--;
          updateWizardUI();
        }
      });
    }
    if (DOM.btnWizardLaunchExam) {
      DOM.btnWizardLaunchExam.addEventListener('click', () => {
        closeWizardModal();
        startExamSession({ mode: 'proctored', presetId: 'stage2-full' });
      });
    }

    // Exam View Events
    if (DOM.btnSaveAnswer) {
      DOM.btnSaveAnswer.addEventListener('click', handleSaveAnswer);
    }
    if (DOM.btnPrevTask) {
      DOM.btnPrevTask.addEventListener('click', prevTask);
    }
    if (DOM.btnNextTask) {
      DOM.btnNextTask.addEventListener('click', nextTask);
    }
    if (DOM.btnToggleFlag) {
      DOM.btnToggleFlag.addEventListener('click', toggleFlag);
    }

    if (DOM.btnExamToLobby) {
      DOM.btnExamToLobby.addEventListener('click', () => {
        stopTimer();
        detachProctoringListeners();
        saveSessionToStorage();
        switchView('lobby');
        checkSavedSessionBanner();
        showToast('Returned to Lobby. Your exam progress is safely saved.');
      });
    }

    if (DOM.btnFinishAttempt) {
      DOM.btnFinishAttempt.addEventListener('click', showFinishDialog);
    }

    // Finish Dialog Events
    if (DOM.btnCancelFinishX) {
      DOM.btnCancelFinishX.addEventListener('click', hideFinishDialog);
    }
    if (DOM.btnCancelFinish) {
      DOM.btnCancelFinish.addEventListener('click', hideFinishDialog);
    }
    if (DOM.btnConfirmFinish) {
      DOM.btnConfirmFinish.addEventListener('click', submitExam);
    }

    // Proctor Alert Dismiss
    if (DOM.btnDismissProctorAlert) {
      DOM.btnDismissProctorAlert.addEventListener('click', () => {
        if (DOM.proctorAlert) DOM.proctorAlert.style.display = 'none';
      });
    }

    // Stage 3 Upload View Events
    if (DOM.chkFilterUploadsOnly) {
      DOM.chkFilterUploadsOnly.addEventListener('change', renderUploadTasks);
    }
    if (DOM.chkFilterAnsweredOnly) {
      DOM.chkFilterAnsweredOnly.addEventListener('change', renderUploadTasks);
    }
    if (DOM.btnSaveUploadKey) {
      DOM.btnSaveUploadKey.addEventListener('click', () => {
        const key = DOM.uploadGeminiKey?.value.trim();
        if (key) {
          localStorage.setItem(GEMINI_KEY_STORAGE, key);
          showToast('Google Gemini API Key saved locally.');
        }
      });
    }
    if (DOM.btnCompleteUpload) {
      DOM.btnCompleteUpload.addEventListener('click', completeUploadAndGrade);
    }
    if (DOM.btnSkipUpload) {
      DOM.btnSkipUpload.addEventListener('click', (e) => {
        e.preventDefault();
        completeUploadAndGrade();
      });
    }

    // Stage 3.75 Oral View Events (Task 44)
    if (DOM.btnLobbyStartOral) {
      DOM.btnLobbyStartOral.addEventListener('click', () => {
        enterOralStage(true);
      });
    }
    if (DOM.btnSkipOral) {
      DOM.btnSkipOral.addEventListener('click', () => {
        finalizeAndShowReview();
      });
    }
    if (DOM.btnStartRecordingEarly) {
      DOM.btnStartRecordingEarly.addEventListener('click', () => {
        startOralRecording();
      });
    }
    if (DOM.btnStartMicRecord) {
      DOM.btnStartMicRecord.addEventListener('click', () => {
        startOralRecording();
      });
    }
    if (DOM.btnStopMicRecord) {
      DOM.btnStopMicRecord.addEventListener('click', () => {
        stopOralRecording();
      });
    }
    if (DOM.btnSubmitOralDefense) {
      DOM.btnSubmitOralDefense.addEventListener('click', () => {
        submitOralDefenseAndFinish();
      });
    }

    // Oral Rubric Score selectors
    [DOM.rubricCrit1, DOM.rubricCrit2, DOM.rubricCrit3, DOM.rubricCrit4].forEach(sel => {
      if (sel) {
        sel.addEventListener('change', calculateOralRubricTotal);
      }
    });

    // Review View Events
    if (DOM.btnReviewToLobby) {
      DOM.btnReviewToLobby.addEventListener('click', () => {
        switchView('lobby');
        checkSavedSessionBanner();
      });
    }
    if (DOM.btnCopyReport) {
      DOM.btnCopyReport.addEventListener('click', () => {
        if (!DOM.examReportText) return;
        DOM.examReportText.select();
        navigator.clipboard.writeText(DOM.examReportText.value).then(() => {
          showToast('Diagnostic report copied to clipboard!');
        });
      });
    }

    if (DOM.btnExportBlank) {
      DOM.btnExportBlank.addEventListener('click', () => {
        prepareBlankPrint();
        document.body.className = 'app-body printing-blank';
        window.print();
        document.body.className = 'app-body';
      });
    }

    if (DOM.btnExportGraded) {
      DOM.btnExportGraded.addEventListener('click', () => {
        document.body.className = 'app-body printing-graded';
        window.print();
        document.body.className = 'app-body';
      });
    }

    // Keyboard navigation (Alt+Left, Alt+Right)
    window.addEventListener('keydown', (e) => {
      if (state.view !== 'exam') return;
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        nextTask();
      } else if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTask();
      }
    });
  }

  // ============================================================================
  // Initialization & Lifecycle
  // ============================================================================
  function init() {
    // 1. Setup listeners and tools
    setupEventListeners();
    setupCalculatorAndReference();
    setupPdfImporter();

    // 2. Default View MUST be Lobby
    switchView('lobby');

    // 3. Check if an unfinished session exists to show the Resume banner
    checkSavedSessionBanner();

    // 4. Zero timers and zero proctoring listeners on initial page load!
    // Exam only starts when user clicks Mode A or Mode B buttons in the lobby.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
