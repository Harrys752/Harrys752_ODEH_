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
    'preset-a': {
      id: 'preset-a',
      name: 'Preset A — Official Stage 2 (43 Tasks · 100 Pts)',
      quotas: { basic: 25, intermediate: 15, advanced: 3 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 180
    },
    'preset-b': {
      id: 'preset-b',
      name: 'Preset B — Entry-Style 68-Question Speed Drill (68 Pts)',
      quotas: { basic: 68, intermediate: 0, advanced: 0 },
      filterMode: 'balanced',
      targetField: 'all',
      durationMinutes: 60
    },
    'preset-c': {
      id: 'preset-c',
      name: 'Preset C — Custom Quotas & Field Specialization',
      quotas: { basic: 25, intermediate: 15, advanced: 3 },
      filterMode: 'balanced',
      targetField: 'Geography, physical',
      durationMinutes: 180
    }
  };

  // State
  let state = {
    presetId: 'preset-a',
    config: { ...PRESETS['preset-a'] },
    activeQuestions: [], // Questions in current exam session
    currentIndex: 0,     // Currently viewed question index (0-based)
    savedAnswers: {},    // questionId -> saved answer (affects blue tiles)
    draftAnswers: {},    // questionId -> uncommitted draft choice
    flaggedIds: [],      // array of question IDs marked with flag
    remainingSeconds: 180 * 60,
    focusLossCount: 0,
    isSubmitted: false,
    gradingResult: null,
    lastSaved: null
  };

  let timerInterval = null;
  let saveDebounceTimer = null;
  let parsedImportQuestions = [];

  // DOM Elements
  const DOM = {
    // Header & Proctoring
    timerDisplay: document.getElementById('timer-display'),
    timerBox: document.getElementById('timer-box'),
    focusLossCount: document.getElementById('focus-loss-count'),
    focusLossBadge: document.getElementById('focus-loss-badge'),
    btnToggleCalc: document.getElementById('btn-toggle-calc'),
    btnToggleImporter: document.getElementById('btn-toggle-importer'),
    btnToggleConfig: document.getElementById('btn-toggle-config'),
    btnFinishAttempt: document.getElementById('btn-finish-attempt'),

    // Sub-toolbar
    saveDot: document.getElementById('save-dot'),
    saveStatusText: document.getElementById('save-status-text'),
    activeModeIndicator: document.getElementById('active-mode-indicator'),
    btnNewRandomSet: document.getElementById('btn-new-random-set'),
    btnResetAnswers: document.getElementById('btn-reset-answers'),
    btnExportBlank: document.getElementById('btn-export-blank'),
    btnExportGraded: document.getElementById('btn-export-graded'),

    // Navigation Matrix
    questionNavMatrix: document.getElementById('question-nav-matrix'),

    // Single-Task Viewport
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

    // Preset & Config Modal
    configModal: document.getElementById('config-modal'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    btnCancelModal: document.getElementById('btn-cancel-modal'),
    btnApplyModal: document.getElementById('btn-apply-modal'),
    customPresetSettings: document.getElementById('custom-preset-settings'),
    customFilterMode: document.getElementById('custom-filter-mode'),
    customTargetFieldGroup: document.getElementById('custom-target-field-group'),
    customTargetField: document.getElementById('custom-target-field'),
    customQuotaBasic: document.getElementById('custom-quota-basic'),
    customQuotaInter: document.getElementById('custom-quota-inter'),
    customQuotaAdv: document.getElementById('custom-quota-adv'),
    customTimerMin: document.getElementById('custom-timer-min'),

    // PDF Importer Modal
    importerModal: document.getElementById('importer-modal'),
    btnCloseImporter: document.getElementById('btn-close-importer'),
    pdfFileInput: document.getElementById('pdf-file-input'),
    fileNameDisplay: document.getElementById('file-name-display'),
    geminiKeyContainer: document.getElementById('gemini-key-container'),
    geminiApiKeyInput: document.getElementById('gemini-api-key-input'),
    importerStatusLog: document.getElementById('importer-status-log'),
    importerPreviewBox: document.getElementById('importer-preview-box'),
    parsedCountBadge: document.getElementById('parsed-count-badge'),
    importerPreviewList: document.getElementById('importer-preview-list'),
    btnProcessPdf: document.getElementById('btn-process-pdf'),
    btnCommitImported: document.getElementById('btn-commit-imported'),

    // Tools & Constants Reference Drawer
    calcDrawer: document.getElementById('calc-drawer'),
    btnCloseCalc: document.getElementById('btn-close-calc'),
    calcDisplay: document.getElementById('calc-display'),
    calcHistory: document.getElementById('calc-history'),

    // Results & Key
    evaluationDivider: document.getElementById('evaluation-divider'),
    evaluationSection: document.getElementById('evaluation-section'),
    evaluationAnchor: document.getElementById('evaluation-anchor'),
    scoreEarned: document.getElementById('score-earned'),
    scoreMax: document.getElementById('score-max'),
    scorePercentage: document.getElementById('score-percentage'),
    scoreGradeBadge: document.getElementById('score-grade-badge'),
    scoreCorrectTasks: document.getElementById('score-correct-tasks'),
    scoreTotalTasks: document.getElementById('score-total-tasks'),
    scorePartialTasks: document.getElementById('score-partial-tasks'),
    fieldBreakdownTbody: document.getElementById('field-breakdown-tbody'),
    btnCopyReport: document.getElementById('btn-copy-report'),
    examReportText: document.getElementById('exam-report-text'),
    solutionsContainer: document.getElementById('solutions-container'),

    // Blank Print Container
    blankPrintContainer: document.getElementById('blank-print-container'),

    // Proctor Alert & Toast
    proctorAlert: document.getElementById('proctor-alert'),
    btnDismissProctorAlert: document.getElementById('btn-dismiss-proctor-alert'),
    toast: document.getElementById('toast')
  };

  // ============================================================================
  // Helpers
  // ============================================================================

  function showToast(msg, duration = 3000) {
    if (!DOM.toast) return;
    DOM.toast.textContent = msg;
    DOM.toast.classList.add('show');
    clearTimeout(DOM.toast._timer);
    DOM.toast._timer = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, duration);
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function triggerMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => {
        console.warn('MathJax typesetting warning:', err);
      });
    }
  }

  // ============================================================================
  // Stratified Sampling Engine (NSU Olympiad Model)
  // ============================================================================

  function sampleQuestions(config) {
    if (!window.QUESTION_BANK || window.QUESTION_BANK.length === 0) {
      console.error('QUESTION_BANK is empty or missing!');
      return [];
    }

    const { filterMode, targetField, quotas } = config;
    let pool = window.QUESTION_BANK;

    if (filterMode === 'single-field' && targetField) {
      pool = pool.filter((q) => q.field === targetField);
    }

    const basicPool = pool.filter((q) => q.difficulty === 'basic');
    const interPool = pool.filter((q) => q.difficulty === 'intermediate');
    const advPool = pool.filter((q) => q.difficulty === 'advanced');

    let selectedBasic = [];
    let selectedInter = [];
    let selectedAdv = [];

    if (filterMode === 'balanced') {
      selectedBasic = roundRobinByField(basicPool, quotas.basic);
      selectedInter = roundRobinByField(interPool, quotas.intermediate);

      // Advanced Tasks: In Official Stage 2 (3 tasks), pick strictly 1 from Archetype 41 (Geography),
      // 1 from Archetype 42 (Geochemistry), and 1 from Archetype 43 (Mining)
      if (quotas.advanced === 3) {
        const arch41 = advPool.filter((q) => q.field === 'Geography, physical');
        const arch42 = advPool.filter((q) => q.field === 'Geochemistry & geophysics');
        const arch43 = advPool.filter((q) => q.field === 'Mining & mineral processing');

        if (arch41.length > 0) selectedAdv.push(shuffle(arch41)[0]);
        if (arch42.length > 0) selectedAdv.push(shuffle(arch42)[0]);
        if (arch43.length > 0) selectedAdv.push(shuffle(arch43)[0]);

        // Fallback if not 3
        if (selectedAdv.length < 3) {
          const rem = advPool.filter((q) => !selectedAdv.includes(q));
          selectedAdv.push(...shuffle(rem).slice(0, 3 - selectedAdv.length));
        }
      } else {
        selectedAdv = roundRobinByField(advPool, quotas.advanced);
      }
    } else {
      selectedBasic = shuffle(basicPool).slice(0, quotas.basic);
      selectedInter = shuffle(interPool).slice(0, quotas.intermediate);
      selectedAdv = shuffle(advPool).slice(0, quotas.advanced);
    }

    return [...selectedBasic, ...selectedInter, ...selectedAdv];
  }

  function roundRobinByField(items, quota) {
    if (items.length <= quota) return shuffle(items);

    const fieldMap = {};
    ALL_FIELDS.forEach((f) => (fieldMap[f] = []));
    items.forEach((item) => {
      if (!fieldMap[item.field]) fieldMap[item.field] = [];
      fieldMap[item.field].push(item);
    });

    Object.keys(fieldMap).forEach((f) => {
      fieldMap[f] = shuffle(fieldMap[f]);
    });

    const result = [];
    const randomizedFields = shuffle(ALL_FIELDS);
    let index = 0;
    let attempts = 0;
    const maxAttempts = quota * 15;

    while (result.length < quota && attempts < maxAttempts) {
      attempts++;
      const currentField = randomizedFields[index % randomizedFields.length];
      index++;

      if (fieldMap[currentField] && fieldMap[currentField].length > 0) {
        result.push(fieldMap[currentField].pop());
      }
    }

    if (result.length < quota) {
      const remaining = [];
      Object.keys(fieldMap).forEach((f) => remaining.push(...fieldMap[f]));
      const extra = shuffle(remaining).slice(0, quota - result.length);
      result.push(...extra);
    }

    return result;
  }

  // ============================================================================
  // Session Persistence (localStorage)
  // ============================================================================

  function scheduleSave() {
    state.lastSaved = new Date().toLocaleTimeString();
    if (DOM.saveStatusText) {
      DOM.saveStatusText.textContent = `Saving...`;
    }
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(() => {
      saveSessionToStorage();
    }, 250);
  }

  function saveSessionToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (DOM.saveStatusText) {
        DOM.saveStatusText.textContent = `Saved at ${state.lastSaved}`;
      }
      if (DOM.saveDot) {
        DOM.saveDot.style.backgroundColor = '#22c55e';
      }
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }

  function loadSessionFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.activeQuestions) && parsed.activeQuestions.length > 0) {
        state = parsed;
        if (!Array.isArray(state.flaggedIds)) state.flaggedIds = [];
        return true;
      }
    } catch (e) {
      console.warn('Storage parse error:', e);
    }
    return false;
  }

  // ============================================================================
  // Countdown Timer
  // ============================================================================

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (state.isSubmitted) {
        clearInterval(timerInterval);
        return;
      }

      if (state.remainingSeconds > 0) {
        state.remainingSeconds--;
        updateTimerDisplay();

        if (state.remainingSeconds % 15 === 0) {
          saveSessionToStorage();
        }
      } else {
        clearInterval(timerInterval);
        showToast('⏰ Time has expired! Finalizing and grading examination...');
        gradeExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!DOM.timerDisplay) return;
    const hrs = Math.floor(state.remainingSeconds / 3600);
    const mins = Math.floor((state.remainingSeconds % 3600) / 60);
    const secs = state.remainingSeconds % 60;

    let text = '';
    if (hrs > 0) {
      text = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
      text = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    DOM.timerDisplay.textContent = text;

    if (state.remainingSeconds <= 600 && DOM.timerBox) {
      DOM.timerBox.classList.add('timer-warning');
    } else if (DOM.timerBox) {
      DOM.timerBox.classList.remove('timer-warning');
    }
  }

  // ============================================================================
  // Navigation Matrix Rendering (Matches Attached Screenshots)
  // ============================================================================

  function renderNavigationMatrix() {
    if (!DOM.questionNavMatrix) return;
    DOM.questionNavMatrix.innerHTML = '';

    state.activeQuestions.forEach((q, idx) => {
      const tile = document.createElement('div');
      tile.className = 'matrix-tile';
      tile.textContent = idx + 1;
      tile.dataset.index = idx;
      tile.title = `Question ${idx + 1}: ${q.field} (${q.points} pt)`;

      const hasSavedAnswer =
        state.savedAnswers[q.id] !== undefined &&
        state.savedAnswers[q.id] !== null &&
        (Array.isArray(state.savedAnswers[q.id])
          ? state.savedAnswers[q.id].length > 0
          : String(state.savedAnswers[q.id]).trim().length > 0);

      // Flagged state
      if (state.flaggedIds.includes(q.id)) {
        tile.classList.add('flagged');
      }

      // Review state after submission
      if (state.isSubmitted && state.gradingResult) {
        const resultItem = state.gradingResult.taskResults[idx];
        if (resultItem) {
          if (resultItem.status === 'correct') tile.classList.add('review-correct');
          else if (resultItem.status === 'partial') tile.classList.add('review-partial');
          else tile.classList.add('review-incorrect');
        }
      } else {
        // Exam in progress
        if (idx === state.currentIndex) {
          tile.classList.add('active'); // Crimson Red #d32f2f
        } else if (hasSavedAnswer) {
          tile.classList.add('saved');  // Moodle Royal Blue #1967d2
        } else {
          tile.classList.add('pending'); // Cool Gray #e4e7eb
        }
      }

      tile.addEventListener('click', () => {
        navigateToTask(idx);
      });

      DOM.questionNavMatrix.appendChild(tile);
    });
  }

  // ============================================================================
  // Single-Task Card Viewport (Matches Attached Screenshots)
  // ============================================================================

  function renderCurrentTask() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    const taskNumber = state.currentIndex + 1;
    const totalTasks = state.activeQuestions.length;

    // Header info
    if (DOM.taskNumberLabel) DOM.taskNumberLabel.textContent = `Question ${taskNumber}`;
    if (DOM.taskDisciplinePill) DOM.taskDisciplinePill.textContent = q.field;
    if (DOM.taskPointsPill) {
      DOM.taskPointsPill.textContent = `${q.difficulty.toUpperCase()} · ${q.points} POINT${q.points > 1 ? 'S' : ''}`;
    }

    // Save indicator
    const isSaved =
      state.savedAnswers[q.id] !== undefined &&
      state.savedAnswers[q.id] !== null &&
      (Array.isArray(state.savedAnswers[q.id])
        ? state.savedAnswers[q.id].length > 0
        : String(state.savedAnswers[q.id]).trim().length > 0);

    if (DOM.taskSaveIndicator) {
      if (isSaved) {
        DOM.taskSaveIndicator.textContent = '✓ Answer saved';
        DOM.taskSaveIndicator.classList.add('is-saved');
      } else {
        DOM.taskSaveIndicator.textContent = 'Not answered yet';
        DOM.taskSaveIndicator.classList.remove('is-saved');
      }
    }

    // Flag toggle state
    const isFlagged = state.flaggedIds.includes(q.id);
    if (DOM.btnToggleFlag) {
      if (isFlagged) {
        DOM.btnToggleFlag.classList.add('is-flagged');
        DOM.flagIcon.textContent = '🚩';
        DOM.flagText.textContent = 'Remove flag';
      } else {
        DOM.btnToggleFlag.classList.remove('is-flagged');
        DOM.flagIcon.textContent = '⚑';
        DOM.flagText.textContent = 'Flag question';
      }
    }

    // Title and Stem (Clean Semantic HTML)
    if (DOM.taskTitleText) DOM.taskTitleText.textContent = q.title || '';
    if (DOM.taskStemText) DOM.taskStemText.innerHTML = q.content;

    // Render Answer Zone based on type
    renderAnswerZone(q);

    // Update Nav buttons
    if (DOM.btnPrevTask) DOM.btnPrevTask.disabled = state.currentIndex === 0;
    if (DOM.btnNextTask) DOM.btnNextTask.disabled = state.currentIndex === totalTasks - 1;

    // Save button state
    updateSaveButtonState(q);

    // Update Matrix Highlight
    renderNavigationMatrix();

    // Trigger MathJax re-render
    triggerMathJax();
  }

  function renderAnswerZone(q) {
    if (!DOM.taskAnswerZone) return;
    DOM.taskAnswerZone.innerHTML = '';

    const currentVal =
      state.draftAnswers[q.id] !== undefined
        ? state.draftAnswers[q.id]
        : state.savedAnswers[q.id] || null;

    if (q.type === 'single-choice') {
      const col = document.createElement('div');
      col.className = 'options-column';

      q.options.forEach((optText) => {
        const row = document.createElement('label');
        row.className = 'moodle-option-row';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `opt-${q.id}`;
        radio.value = optText;
        radio.checked = currentVal === optText;

        radio.addEventListener('change', () => {
          state.draftAnswers[q.id] = optText;
          updateSaveButtonState(q);
        });

        const span = document.createElement('span');
        span.className = 'moodle-option-label';
        span.innerHTML = optText;

        row.appendChild(radio);
        row.appendChild(span);
        col.appendChild(row);
      });

      DOM.taskAnswerZone.appendChild(col);
    } else if (q.type === 'multiple-select') {
      const col = document.createElement('div');
      col.className = 'options-column';

      const selectedList = Array.isArray(currentVal) ? currentVal : [];

      q.options.forEach((optText) => {
        const row = document.createElement('label');
        row.className = 'moodle-option-row';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `opt-${q.id}`;
        checkbox.value = optText;
        checkbox.checked = selectedList.includes(optText);

        checkbox.addEventListener('change', () => {
          let drafts = Array.isArray(state.draftAnswers[q.id])
            ? [...state.draftAnswers[q.id]]
            : Array.isArray(state.savedAnswers[q.id])
            ? [...state.savedAnswers[q.id]]
            : [];

          if (checkbox.checked) {
            if (!drafts.includes(optText)) drafts.push(optText);
          } else {
            drafts = drafts.filter((item) => item !== optText);
          }

          state.draftAnswers[q.id] = drafts;
          updateSaveButtonState(q);
        });

        const span = document.createElement('span');
        span.className = 'moodle-option-label';
        span.innerHTML = optText;

        row.appendChild(checkbox);
        row.appendChild(span);
        col.appendChild(row);
      });

      DOM.taskAnswerZone.appendChild(col);
    } else if (q.type === 'short-answer') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'moodle-text-input';
      input.placeholder = 'Type your exact answer or numerical value here...';
      input.value = typeof currentVal === 'string' ? currentVal : '';

      input.addEventListener('input', (e) => {
        state.draftAnswers[q.id] = e.target.value;
        updateSaveButtonState(q);
      });

      DOM.taskAnswerZone.appendChild(input);
    } else if (q.type === 'extended-response') {
      const textarea = document.createElement('textarea');
      textarea.className = 'moodle-textarea';
      textarea.placeholder = 'Write down your full derivation, sequence of equations, reasoning, and final answer with measurement units...';
      textarea.value = typeof currentVal === 'string' ? currentVal : '';

      textarea.addEventListener('input', (e) => {
        state.draftAnswers[q.id] = e.target.value;
        updateSaveButtonState(q);
      });

      DOM.taskAnswerZone.appendChild(textarea);
    }
  }

  function updateSaveButtonState(q) {
    if (!DOM.btnSaveAnswer) return;

    const draft = state.draftAnswers[q.id];
    const saved = state.savedAnswers[q.id];

    const hasDraftContent =
      draft !== undefined &&
      draft !== null &&
      (Array.isArray(draft) ? draft.length > 0 : String(draft).trim().length > 0);

    const isDifferentFromSaved = JSON.stringify(draft) !== JSON.stringify(saved);

    if (hasDraftContent && isDifferentFromSaved) {
      DOM.btnSaveAnswer.disabled = false;
      DOM.btnSaveAnswer.className = 'btn btn-save-answer ready';
      DOM.btnSaveAnswer.textContent = 'Save answer';
    } else if (saved !== undefined && !isDifferentFromSaved) {
      DOM.btnSaveAnswer.disabled = true;
      DOM.btnSaveAnswer.className = 'btn btn-save-answer saved-state';
      DOM.btnSaveAnswer.textContent = '✓ Answer saved';
    } else {
      DOM.btnSaveAnswer.disabled = true;
      DOM.btnSaveAnswer.className = 'btn btn-save-answer';
      DOM.btnSaveAnswer.textContent = 'Save answer';
    }
  }

  function commitSaveCurrentAnswer() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    if (state.draftAnswers[q.id] !== undefined) {
      state.savedAnswers[q.id] = state.draftAnswers[q.id];
      delete state.draftAnswers[q.id];
    }

    renderCurrentTask();
    scheduleSave();
    showToast(`✓ Question ${state.currentIndex + 1} answer saved.`);
  }

  function toggleFlagCurrentQuestion() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) return;

    if (state.flaggedIds.includes(q.id)) {
      state.flaggedIds = state.flaggedIds.filter((id) => id !== q.id);
      showToast(`Flag removed from Question ${state.currentIndex + 1}.`);
    } else {
      state.flaggedIds.push(q.id);
      showToast(`Question ${state.currentIndex + 1} flagged for review.`);
    }

    renderCurrentTask();
    scheduleSave();
  }

  function navigateToTask(newIndex) {
    if (newIndex < 0 || newIndex >= state.activeQuestions.length) return;
    state.currentIndex = newIndex;
    renderCurrentTask();
  }

  // ============================================================================
  // Scientific Calculator & Reference Tabs
  // ============================================================================

  let calcExpr = '';

  function setupCalculatorAndReference() {
    if (!DOM.calcDrawer) return;

    // Tab buttons
    DOM.calcDrawer.querySelectorAll('.calc-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        DOM.calcDrawer.querySelectorAll('.calc-tab-btn').forEach((b) => b.classList.remove('active'));
        DOM.calcDrawer.querySelectorAll('.calc-tab-content').forEach((c) => c.classList.remove('active'));

        btn.classList.add('active');
        const target = document.getElementById(`tab-${tab}`);
        if (target) target.classList.add('active');
      });
    });

    // Calculator buttons
    DOM.calcDrawer.querySelectorAll('.calc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const fn = btn.dataset.fn;
        const text = btn.textContent.trim();

        if (action === 'clear') {
          calcExpr = '';
          updateCalcDisplay('0', '');
        } else if (action === 'backspace') {
          calcExpr = calcExpr.slice(0, -1);
          updateCalcDisplay(calcExpr || '0', '');
        } else if (action === 'equals') {
          evaluateCalculator();
        } else if (fn) {
          if (fn === 'sin' || fn === 'cos' || fn === 'tan') {
            calcExpr += `Math.${fn}(`;
          } else if (fn === 'ln') {
            calcExpr += 'Math.log(';
          } else if (fn === 'log') {
            calcExpr += 'Math.log10(';
          } else if (fn === 'sqrt') {
            calcExpr += 'Math.sqrt(';
          } else if (fn === 'pi') {
            calcExpr += 'Math.PI';
          } else if (fn === 'pow') {
            calcExpr += '**';
          }
          updateCalcDisplay(calcExpr, '');
        } else if (action === 'divide') {
          calcExpr += '/';
          updateCalcDisplay(calcExpr, '');
        } else if (action === 'multiply') {
          calcExpr += '*';
          updateCalcDisplay(calcExpr, '');
        } else if (action === 'subtract') {
          calcExpr += '-';
          updateCalcDisplay(calcExpr, '');
        } else if (action === 'add') {
          calcExpr += '+';
          updateCalcDisplay(calcExpr, '');
        } else {
          calcExpr += text;
          updateCalcDisplay(calcExpr, '');
        }
      });
    });
  }

  function updateCalcDisplay(val, hist) {
    if (DOM.calcDisplay) DOM.calcDisplay.value = val;
    if (DOM.calcHistory && hist) DOM.calcHistory.textContent = hist;
  }

  function evaluateCalculator() {
    try {
      const sanitized = calcExpr.replace(/[^0-9+\-*/().MathPIloge10]/g, '');
      const res = Function(`'use strict'; return (${sanitized})`)();
      updateCalcDisplay(String(res), calcExpr + ' =');
      calcExpr = String(res);
    } catch (e) {
      updateCalcDisplay('Error', calcExpr);
      calcExpr = '';
    }
  }

  // ============================================================================
  // Client-Side PDF-to-Question-Bank Importer (PDF.js CDN)
  // ============================================================================

  function setupPdfImporter() {
    if (!DOM.pdfFileInput) return;

    // Remember stored Gemini key
    const storedKey = localStorage.getItem(GEMINI_KEY_STORAGE);
    if (storedKey && DOM.geminiApiKeyInput) {
      DOM.geminiApiKeyInput.value = storedKey;
    }

    DOM.pdfFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && DOM.fileNameDisplay) {
        DOM.fileNameDisplay.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
      }
    });

    // Toggle Gemini key field
    document.querySelectorAll('input[name="import-method"]').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'gemini') {
          DOM.geminiKeyContainer.style.display = 'block';
        } else {
          DOM.geminiKeyContainer.style.display = 'none';
        }
      });
    });

    // Process PDF Button
    if (DOM.btnProcessPdf) {
      DOM.btnProcessPdf.addEventListener('click', async () => {
        const file = DOM.pdfFileInput.files[0];
        if (!file) {
          alert('Please select a PDF document first.');
          return;
        }

        const method = document.querySelector('input[name="import-method"]:checked').value;
        DOM.importerStatusLog.textContent = 'Extracting text from PDF via PDF.js...';

        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let fullText = '';

          for (let p = 1; p <= pdfDoc.numPages; p++) {
            const page = await pdfDoc.getPage(p);
            const content = await page.getTextContent();
            const pageText = content.items.map((it) => it.str).join(' ');
            fullText += `\n--- PAGE ${p} ---\n` + pageText;
          }

          DOM.importerStatusLog.textContent = `Extracted ${pdfDoc.numPages} pages (${fullText.length} characters). Parsing questions...`;

          if (method === 'regex') {
            parsedImportQuestions = parseQuestionsWithRegex(fullText);
          } else {
            const apiKey = DOM.geminiApiKeyInput.value.trim();
            if (!apiKey) {
              alert('Please enter your Gemini API key to use AI parsing.');
              DOM.importerStatusLog.textContent = 'Error: Missing Gemini API key.';
              return;
            }
            localStorage.setItem(GEMINI_KEY_STORAGE, apiKey);
            parsedImportQuestions = await parseQuestionsWithGemini(fullText, apiKey);
          }

          renderImportPreview(parsedImportQuestions);
        } catch (err) {
          console.error('PDF extraction failed:', err);
          DOM.importerStatusLog.textContent = `Extraction failed: ${err.message}`;
        }
      });
    }

    // Commit Imported Questions
    if (DOM.btnCommitImported) {
      DOM.btnCommitImported.addEventListener('click', () => {
        if (!parsedImportQuestions || parsedImportQuestions.length === 0) return;

        // Append to QUESTION_BANK
        window.QUESTION_BANK = [...(window.QUESTION_BANK || []), ...parsedImportQuestions];
        DOM.importerModal.style.display = 'none';
        showToast(`Successfully added ${parsedImportQuestions.length} custom tasks to Question Bank!`);
      });
    }
  }

  function parseQuestionsWithRegex(text) {
    const tasks = [];
    // Match "Task X", "Field of science: ...", question text, "Answer: ..."
    const taskSplits = text.split(/(?=Task\s+\d+)/i);

    taskSplits.forEach((chunk, i) => {
      const taskMatch = chunk.match(/Task\s+(\d+)/i);
      if (!taskMatch) return;

      const taskNum = taskMatch[1];
      const fieldMatch = chunk.match(/Field\s+of\s+science:\s*([^\n\r]+)/i);
      const field = fieldMatch ? fieldMatch[1].trim() : 'Geography, physical';

      // Check level
      let difficulty = 'basic';
      let points = 1;
      if (chunk.match(/Intermediate\s+level/i)) {
        difficulty = 'intermediate';
        points = 3;
      } else if (chunk.match(/Advanced\s+level/i)) {
        difficulty = 'advanced';
        points = 10;
      }

      // Check answer
      const ansMatch = chunk.match(/Answer:\s*([^\n\r]+)/i);
      const answer = ansMatch ? ansMatch[1].trim() : 'a';

      // Extract options a), b), c), d)
      const options = [];
      const optMatches = chunk.match(/[a-e]\)\s+([^\n\r]+)/gi);
      if (optMatches) {
        optMatches.forEach((m) => {
          options.push(m.replace(/^[a-e]\)\s+/i, '').trim());
        });
      }

      tasks.push({
        id: `IMPORT-${taskNum}-${Date.now()}`,
        field: field,
        difficulty: difficulty,
        type: options.length > 0 ? 'single-choice' : 'short-answer',
        points: points,
        title: `Imported Task ${taskNum}`,
        content: `<p>${chunk.slice(0, 300).replace(/Task\s+\d+/i, '').trim()}...</p>`,
        options: options.length > 0 ? options : undefined,
        correctAnswer: answer,
        explanation: 'Imported from uploaded PDF document.'
      });
    });

    return tasks;
  }

  async function parseQuestionsWithGemini(text, apiKey) {
    DOM.importerStatusLog.textContent = 'Calling Gemini 2.5 Flash to structure questions...';
    const sampleText = text.slice(0, 15000); // Send first 15k chars

    const systemPrompt = `You are a Novosibirsk State University professor converting raw text into structured Earth Sciences Olympiad questions. Output ONLY valid JSON containing an array of question objects with fields: id, field, difficulty, type, points, title, content (clean HTML with <p>, MathJax $...$), options (if MCQ), correctAnswer, explanation.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemPrompt },
            { text: `Extract up to 5 complete Olympiad questions from this text:\n\n${sampleText}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonParsed = JSON.parse(candidateText);
    return Array.isArray(jsonParsed) ? jsonParsed : [jsonParsed];
  }

  function renderImportPreview(tasks) {
    if (!DOM.importerPreviewBox || !DOM.importerPreviewList) return;
    DOM.importerPreviewBox.style.display = 'block';
    DOM.parsedCountBadge.textContent = tasks.length;
    DOM.importerPreviewList.innerHTML = '';

    if (tasks.length === 0) {
      DOM.importerPreviewList.innerHTML = '<div>No recognizable questions found. Try Gemini AI parsing.</div>';
      DOM.btnCommitImported.disabled = true;
      return;
    }

    tasks.forEach((t, idx) => {
      const item = document.createElement('div');
      item.style.padding = '0.35rem 0';
      item.style.borderBottom = '1px solid #e2e8f0';
      item.innerHTML = `<strong>#${idx + 1} [${t.difficulty.toUpperCase()} · ${t.field}]:</strong> ${t.title || 'Untitled'} (Answer: ${t.correctAnswer})`;
      DOM.importerPreviewList.appendChild(item);
    });

    DOM.btnCommitImported.disabled = false;
    DOM.importerStatusLog.textContent = `Successfully parsed ${tasks.length} tasks! Ready to append to question bank.`;
  }

  // ============================================================================
  // Proctoring Focus Loss Simulation
  // ============================================================================

  function setupProctoringMonitors() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !state.isSubmitted) {
        handleFocusLoss();
      }
    });

    window.addEventListener('blur', () => {
      if (!state.isSubmitted) {
        handleFocusLoss();
      }
    });

    if (DOM.btnDismissProctorAlert && DOM.proctorAlert) {
      DOM.btnDismissProctorAlert.addEventListener('click', () => {
        DOM.proctorAlert.style.display = 'none';
      });
    }
  }

  function handleFocusLoss() {
    state.focusLossCount++;
    if (DOM.focusLossCount) DOM.focusLossCount.textContent = state.focusLossCount;
    if (DOM.focusLossBadge) DOM.focusLossBadge.classList.add('alert');
    if (DOM.proctorAlert) DOM.proctorAlert.style.display = 'flex';
    scheduleSave();
  }

  // ============================================================================
  // Auto-Grader Engine
  // ============================================================================

  function gradeExam() {
    state.isSubmitted = true;
    clearInterval(timerInterval);

    // Auto-commit active draft
    const curQ = state.activeQuestions[state.currentIndex];
    if (curQ && state.draftAnswers[curQ.id] !== undefined) {
      state.savedAnswers[curQ.id] = state.draftAnswers[curQ.id];
    }

    let totalScore = 0;
    let maxPossibleScore = 0;
    let fullyCorrectCount = 0;
    let partialCreditCount = 0;

    const taskResults = [];
    const fieldScores = {};
    ALL_FIELDS.forEach((f) => {
      fieldScores[f] = { earned: 0, max: 0, count: 0 };
    });

    state.activeQuestions.forEach((q, idx) => {
      const taskNum = idx + 1;
      const userAns = state.savedAnswers[q.id];
      const maxPts = q.points || 1;
      maxPossibleScore += maxPts;

      if (!fieldScores[q.field]) {
        fieldScores[q.field] = { earned: 0, max: 0, count: 0 };
      }
      fieldScores[q.field].max += maxPts;
      fieldScores[q.field].count += 1;

      let earnedPts = 0;
      let status = 'incorrect';

      if (q.type === 'single-choice') {
        if (userAns && userAns.trim() === q.correctAnswer.trim()) {
          earnedPts = maxPts;
          status = 'correct';
          fullyCorrectCount++;
        }
      } else if (q.type === 'multiple-select') {
        const userSet = Array.isArray(userAns) ? userAns : [];
        const correctSet = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];

        const sortedUser = [...userSet].sort();
        const sortedCorrect = [...correctSet].sort();

        const isExactMatch =
          sortedUser.length === sortedCorrect.length &&
          sortedUser.every((val, i) => val === sortedCorrect[i]);

        if (isExactMatch) {
          earnedPts = maxPts;
          status = 'correct';
          fullyCorrectCount++;
        } else {
          const hasIncorrectChoice = sortedUser.some((choice) => !correctSet.includes(choice));
          if (!hasIncorrectChoice && sortedUser.length > 0) {
            const fraction = sortedUser.length / correctSet.length;
            earnedPts = Math.round(maxPts * fraction * 10) / 10;
            status = 'partial';
            partialCreditCount++;
          }
        }
      } else if (q.type === 'short-answer') {
        if (userAns && typeof userAns === 'string') {
          const normUser = userAns.trim().toLowerCase().replace(/\s+/g, ' ');
          const normCorrect = q.correctAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
          const acceptable = (q.acceptableAnswers || []).map((a) => a.toLowerCase().trim().replace(/\s+/g, ' '));

          if (normUser === normCorrect || acceptable.includes(normUser)) {
            earnedPts = maxPts;
            status = 'correct';
            fullyCorrectCount++;
          } else {
            const userFloat = parseFloat(normUser.replace(/[^0-9.-]/g, ''));
            const correctFloat = parseFloat(normCorrect.replace(/[^0-9.-]/g, ''));
            if (!isNaN(userFloat) && !isNaN(correctFloat)) {
              const diff = Math.abs(userFloat - correctFloat);
              const tolerance = Math.max(0.05, Math.abs(correctFloat) * 0.02);
              if (diff <= tolerance) {
                earnedPts = maxPts;
                status = 'correct';
                fullyCorrectCount++;
              }
            }
          }
        }
      } else if (q.type === 'extended-response') {
        if (userAns && typeof userAns === 'string' && userAns.trim().length > 0) {
          const userLower = userAns.toLowerCase();
          const keywords = q.requiredKeywords || [];
          let matchCount = 0;

          keywords.forEach((kw) => {
            if (userLower.includes(kw.toLowerCase())) {
              matchCount++;
            }
          });

          if (keywords.length > 0) {
            const ratio = matchCount / keywords.length;
            if (ratio >= 0.85) {
              earnedPts = maxPts;
              status = 'correct';
              fullyCorrectCount++;
            } else if (ratio >= 0.25) {
              earnedPts = Math.round(maxPts * ratio * 10) / 10;
              status = 'partial';
              partialCreditCount++;
            }
          } else {
            earnedPts = 5.0;
            status = 'partial';
            partialCreditCount++;
          }
        }
      }

      totalScore += earnedPts;
      fieldScores[q.field].earned += earnedPts;

      taskResults.push({
        taskNumber: taskNum,
        question: q,
        userAnswer: userAns,
        earnedPoints: earnedPts,
        maxPoints: maxPts,
        status: status
      });
    });

    const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 1000) / 10 : 0;

    const reportText = buildPlaintextReport({
      totalScore,
      maxPossibleScore,
      percentage,
      fullyCorrectCount,
      partialCreditCount,
      fieldScores,
      taskResults
    });

    state.gradingResult = {
      totalScore,
      maxPossibleScore,
      percentage,
      fullyCorrectCount,
      partialCreditCount,
      fieldScores,
      taskResults,
      reportText
    };

    scheduleSave();
    renderNavigationMatrix();
    renderEvaluationSection();
  }

  function buildPlaintextReport(res) {
    const lines = [];
    lines.push('========================================================================');
    lines.push(' OPEN DOORS INTERNATIONAL OLYMPIAD: EARTH & ENVIRONMENTAL SCIENCES');
    lines.push(" NOVOSIBIRSK STATE UNIVERSITY (NSU) EXAMINATION OFFICIAL REPORT");
    lines.push('========================================================================');
    lines.push(`Date: ${new Date().toLocaleString()}`);
    lines.push(`Mode: ${PRESETS[state.presetId]?.name || 'Custom Examination'}`);
    lines.push(`Total Score: ${res.totalScore} / ${res.maxPossibleScore} Points (${res.percentage}%)`);
    lines.push(`Tasks Fully Correct: ${res.fullyCorrectCount} / ${res.taskResults.length}`);
    lines.push(`Partially Credited Tasks: ${res.partialCreditCount}`);
    lines.push(`Proctoring Focus Loss Violations: ${state.focusLossCount}`);
    lines.push('');
    lines.push('------------------------------------------------------------------------');
    lines.push(' PERFORMANCE BY FIELD OF SCIENCE');
    lines.push('------------------------------------------------------------------------');

    Object.keys(res.fieldScores).forEach((f) => {
      const d = res.fieldScores[f];
      if (d.max > 0) {
        const pct = Math.round((d.earned / d.max) * 100);
        lines.push(`• ${f.padEnd(36)} : ${d.earned.toFixed(1)} / ${d.max} pts (${pct}%)`);
      }
    });

    lines.push('');
    lines.push('------------------------------------------------------------------------');
    lines.push(' FULLY CORRECT TASKS');
    lines.push('------------------------------------------------------------------------');
    const correctTasks = res.taskResults.filter((t) => t.status === 'correct');
    if (correctTasks.length > 0) {
      lines.push(correctTasks.map((t) => `Task ${t.taskNumber} (${t.question.field})`).join(', '));
    } else {
      lines.push('None.');
    }

    lines.push('');
    lines.push('========================================================================');
    lines.push(' STEP-BY-STEP BREAKDOWN OF WRONG & PARTIAL TASKS');
    lines.push('========================================================================');

    const errorTasks = res.taskResults.filter((t) => t.status !== 'correct');
    if (errorTasks.length === 0) {
      lines.push('Exceptional! 100% of questions answered correctly.');
    } else {
      errorTasks.forEach((t) => {
        lines.push('');
        lines.push(`>>> TASK ${t.taskNumber} [${t.status.toUpperCase()} — ${t.earnedPoints}/${t.maxPoints} pts]`);
        lines.push(`Discipline: ${t.question.field}`);
        lines.push(`Topic: ${t.question.title || 'Untitled'}`);
        lines.push(`Candidate Answer: ${formatAnswerString(t.userAnswer)}`);

        if (t.question.type === 'extended-response') {
          lines.push('Model Solution & Assessment Criteria:');
          lines.push(t.question.modelSolution.replace(/\$\$/g, '').replace(/\$/g, '').trim());
        } else {
          const correctStr = Array.isArray(t.question.correctAnswer)
            ? t.question.correctAnswer.join(', ')
            : t.question.correctAnswer;
          lines.push(`Official Correct Answer: ${correctStr}`);
        }

        if (t.question.explanation) {
          lines.push(`Academic Explanation: ${t.question.explanation.replace(/\$\$/g, '').replace(/\$/g, '')}`);
        }
        lines.push('------------------------------------------------------------------------');
      });
    }

    return lines.join('\n');
  }

  function formatAnswerString(ans) {
    if (ans === undefined || ans === null || ans === '') return '[NO ANSWER SUBMITTED]';
    if (Array.isArray(ans)) {
      return ans.length > 0 ? ans.join('; ') : '[NO OPTIONS SELECTED]';
    }
    return String(ans).trim();
  }

  // ============================================================================
  // Render Evaluation Section & Solutions
  // ============================================================================

  function renderEvaluationSection() {
    if (!state.gradingResult) return;
    const res = state.gradingResult;

    if (DOM.evaluationDivider) DOM.evaluationDivider.style.display = 'block';
    if (DOM.evaluationSection) DOM.evaluationSection.style.display = 'flex';

    if (DOM.scoreEarned) DOM.scoreEarned.textContent = res.totalScore;
    if (DOM.scoreMax) DOM.scoreMax.textContent = res.maxPossibleScore;
    if (DOM.scorePercentage) DOM.scorePercentage.textContent = `${res.percentage}%`;
    if (DOM.scoreCorrectTasks) DOM.scoreCorrectTasks.textContent = res.fullyCorrectCount;
    if (DOM.scoreTotalTasks) DOM.scoreTotalTasks.textContent = res.taskResults.length;
    if (DOM.scorePartialTasks) DOM.scorePartialTasks.textContent = res.partialCreditCount;

    let badgeText = 'Stage 2 Participant';
    if (res.percentage >= 85) badgeText = 'First Tier Laureate (NSU Winner Standard)';
    else if (res.percentage >= 70) badgeText = 'Prize Winner (High Distinction)';
    else if (res.percentage >= 50) badgeText = 'Qualified Stage 2 Threshold';

    if (DOM.scoreGradeBadge) DOM.scoreGradeBadge.textContent = badgeText;

    // Field table
    if (DOM.fieldBreakdownTbody) {
      DOM.fieldBreakdownTbody.innerHTML = '';
      Object.keys(res.fieldScores).forEach((fn) => {
        const item = res.fieldScores[fn];
        if (item.max > 0) {
          const mastery = Math.round((item.earned / item.max) * 100);
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${fn}</strong></td>
            <td>${item.count}</td>
            <td>${item.earned.toFixed(1)}</td>
            <td>${item.max}</td>
            <td>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <div style="flex:1; background:#e2e8f0; height:6px; border-radius:3px; overflow:hidden;">
                  <div style="width:${mastery}%; background:#1967d2; height:100%;"></div>
                </div>
                <span style="font-size:0.8rem; font-weight:600; width:40px;">${mastery}%</span>
              </div>
            </td>`;
          DOM.fieldBreakdownTbody.appendChild(tr);
        }
      });
    }

    // Report Box
    if (DOM.examReportText) {
      DOM.examReportText.value = res.reportText;
    }

    // Solutions Container
    if (DOM.solutionsContainer) {
      DOM.solutionsContainer.innerHTML = '';

      res.taskResults.forEach((t) => {
        const card = document.createElement('article');
        card.className = `solution-card ${t.status}-card`;

        const header = document.createElement('div');
        header.className = 'solution-card-header';

        const title = document.createElement('h3');
        title.style.fontSize = '1.05rem';
        title.innerHTML = `Task ${t.taskNumber}: ${t.question.title || t.question.field}`;

        const badge = document.createElement('span');
        badge.className = `solution-status-badge status-badge-${t.status}`;
        badge.textContent =
          t.status === 'correct'
            ? `✓ FULL CREDIT (${t.earnedPoints}/${t.maxPoints} PTS)`
            : t.status === 'partial'
            ? `⚠ PARTIAL CREDIT (${t.earnedPoints}/${t.maxPoints} PTS)`
            : `✗ INCORRECT (0/${t.maxPoints} PTS)`;

        header.appendChild(title);
        header.appendChild(badge);
        card.appendChild(header);

        // Answers grid
        const grid = document.createElement('div');
        grid.className = 'solution-answers-grid';

        const uBlock = document.createElement('div');
        uBlock.innerHTML = `
          <div class="solution-block-label">Your Submitted Answer:</div>
          <div style="color:${t.status === 'correct' ? '#15803d' : '#d32f2f'}; font-weight:500;">
            ${formatAnswerString(t.userAnswer)}
          </div>`;

        const cBlock = document.createElement('div');
        const correctStr = Array.isArray(t.question.correctAnswer)
          ? t.question.correctAnswer.join('<br>')
          : t.question.correctAnswer;

        cBlock.innerHTML = `
          <div class="solution-block-label">Official Correct Answer:</div>
          <div style="color:#1967d2; font-weight:600;">
            ${t.question.type === 'extended-response' ? 'See model solution & rubric below' : correctStr}
          </div>`;

        grid.appendChild(uBlock);
        grid.appendChild(cBlock);
        card.appendChild(grid);

        // Explanations
        const expl = document.createElement('div');
        expl.className = 'solution-explanation-box';

        if (t.question.modelSolution) {
          expl.innerHTML = `
            <h4>NSU Model Solution & Assessment Criteria:</h4>
            <div style="white-space: pre-wrap; line-height: 1.6;">${t.question.modelSolution}</div>`;
        } else if (t.question.explanation) {
          expl.innerHTML = `
            <h4>Academic Explanation:</h4>
            <p>${t.question.explanation}</p>`;
        }

        card.appendChild(expl);
        DOM.solutionsContainer.appendChild(card);
      });
    }

    triggerMathJax();
  }

  // ============================================================================
  // Event Listeners & Modals
  // ============================================================================

  function setupEventListeners() {
    if (DOM.btnSaveAnswer) {
      DOM.btnSaveAnswer.addEventListener('click', commitSaveCurrentAnswer);
    }

    if (DOM.btnToggleFlag) {
      DOM.btnToggleFlag.addEventListener('click', toggleFlagCurrentQuestion);
    }

    if (DOM.btnPrevTask) {
      DOM.btnPrevTask.addEventListener('click', () => {
        navigateToTask(state.currentIndex - 1);
      });
    }

    if (DOM.btnNextTask) {
      DOM.btnNextTask.addEventListener('click', () => {
        navigateToTask(state.currentIndex + 1);
      });
    }

    // Tools & Constants toggle
    if (DOM.btnToggleCalc && DOM.calcDrawer) {
      DOM.btnToggleCalc.addEventListener('click', () => {
        const isHidden = DOM.calcDrawer.style.display === 'none';
        DOM.calcDrawer.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (DOM.btnCloseCalc && DOM.calcDrawer) {
      DOM.btnCloseCalc.addEventListener('click', () => {
        DOM.calcDrawer.style.display = 'none';
      });
    }

    // PDF Importer Toggle
    if (DOM.btnToggleImporter && DOM.importerModal) {
      DOM.btnToggleImporter.addEventListener('click', () => {
        DOM.importerModal.style.display = 'flex';
      });
    }

    if (DOM.btnCloseImporter && DOM.importerModal) {
      DOM.btnCloseImporter.addEventListener('click', () => {
        DOM.importerModal.style.display = 'none';
      });
    }

    // Presets Modal
    if (DOM.btnToggleConfig && DOM.configModal) {
      DOM.btnToggleConfig.addEventListener('click', () => {
        DOM.configModal.style.display = 'flex';
      });
    }

    if (DOM.btnCloseModal && DOM.configModal) {
      DOM.btnCloseModal.addEventListener('click', () => {
        DOM.configModal.style.display = 'none';
      });
    }

    if (DOM.btnCancelModal && DOM.configModal) {
      DOM.btnCancelModal.addEventListener('click', () => {
        DOM.configModal.style.display = 'none';
      });
    }

    // Preset selection
    document.querySelectorAll('.preset-card').forEach((card) => {
      card.addEventListener('click', () => {
        const val = card.dataset.preset;
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        document.querySelectorAll('.preset-card').forEach((c) => c.classList.remove('active-preset'));
        card.classList.add('active-preset');

        if (val === 'preset-c') {
          DOM.customPresetSettings.style.display = 'block';
        } else {
          DOM.customPresetSettings.style.display = 'none';
        }
      });
    });

    if (DOM.customFilterMode) {
      DOM.customFilterMode.addEventListener('change', (e) => {
        if (e.target.value === 'single-field') {
          DOM.customTargetFieldGroup.style.display = 'block';
        } else {
          DOM.customTargetFieldGroup.style.display = 'none';
        }
      });
    }

    // Apply Presets
    if (DOM.btnApplyModal) {
      DOM.btnApplyModal.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="preset-choice"]:checked');
        const chosenPreset = selectedRadio ? selectedRadio.value : 'preset-a';

        if (chosenPreset === 'preset-c') {
          state.presetId = 'preset-c';
          state.config = {
            id: 'preset-c',
            name: 'Preset C — Custom Quotas',
            quotas: {
              basic: parseInt(DOM.customQuotaBasic.value, 10) || 25,
              intermediate: parseInt(DOM.customQuotaInter.value, 10) || 15,
              advanced: parseInt(DOM.customQuotaAdv.value, 10) || 3
            },
            filterMode: DOM.customFilterMode.value,
            targetField: DOM.customTargetField.value,
            durationMinutes: parseInt(DOM.customTimerMin.value, 10) || 180
          };
        } else {
          state.presetId = chosenPreset;
          state.config = { ...PRESETS[chosenPreset] };
        }

        DOM.configModal.style.display = 'none';
        initNewExamSession();
        showToast(`Initialized ${PRESETS[chosenPreset]?.name || 'Custom Examination'}.`);
      });
    }

    // Finish Attempt & Submit
    if (DOM.btnFinishAttempt) {
      DOM.btnFinishAttempt.addEventListener('click', () => {
        const total = state.activeQuestions.length;
        let answered = 0;
        state.activeQuestions.forEach((q) => {
          const ans = state.savedAnswers[q.id] || state.draftAnswers[q.id];
          if (ans !== undefined && ans !== null && ans !== '') {
            if (Array.isArray(ans) && ans.length > 0) answered++;
            else if (typeof ans === 'string' && ans.trim().length > 0) answered++;
          }
        });

        const unanswered = total - answered;
        let confirmMsg = 'Are you sure you want to finish and submit your attempt?';
        if (unanswered > 0) {
          confirmMsg = `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''} out of ${total}.\n\nDo you want to finalize and grade your exam now?`;
        }

        if (confirm(confirmMsg)) {
          gradeExam();
          showToast('Examination graded successfully!');
          setTimeout(() => {
            if (DOM.evaluationAnchor) {
              DOM.evaluationAnchor.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      });
    }

    // New Random Set
    if (DOM.btnNewRandomSet) {
      DOM.btnNewRandomSet.addEventListener('click', () => {
        if (confirm('Generate a brand-new randomized question set? Your current progress will be reset.')) {
          initNewExamSession();
          showToast('Generated fresh question set.');
        }
      });
    }

    // Reset Answers
    if (DOM.btnResetAnswers) {
      DOM.btnResetAnswers.addEventListener('click', () => {
        if (confirm('Clear all your answers while keeping the current question set?')) {
          state.savedAnswers = {};
          state.draftAnswers = {};
          state.isSubmitted = false;
          state.gradingResult = null;
          if (DOM.evaluationDivider) DOM.evaluationDivider.style.display = 'none';
          if (DOM.evaluationSection) DOM.evaluationSection.style.display = 'none';
          renderCurrentTask();
          scheduleSave();
          showToast('All answers have been reset.');
        }
      });
    }

    // Copy Report
    if (DOM.btnCopyReport && DOM.examReportText) {
      DOM.btnCopyReport.addEventListener('click', () => {
        DOM.examReportText.select();
        navigator.clipboard.writeText(DOM.examReportText.value)
          .then(() => showToast('📋 Report copied to clipboard!'))
          .catch(() => {
            document.execCommand('copy');
            showToast('📋 Report copied to clipboard!');
          });
      });
    }

    // Export Blank PDF
    if (DOM.btnExportBlank) {
      DOM.btnExportBlank.addEventListener('click', () => {
        prepareBlankPrint();
        document.body.classList.add('print-blank-mode');
        window.print();
      });
    }

    // Export Graded PDF
    if (DOM.btnExportGraded) {
      DOM.btnExportGraded.addEventListener('click', () => {
        if (!state.isSubmitted) {
          if (confirm('The exam has not been submitted yet. Auto-grade now to generate the Graded PDF?')) {
            gradeExam();
          } else {
            return;
          }
        }
        document.body.classList.add('print-graded-mode');
        window.print();
      });
    }

    window.addEventListener('afterprint', () => {
      document.body.classList.remove('print-blank-mode');
      document.body.classList.remove('print-graded-mode');
    });
  }

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
            ${q.options.map((opt) => `<div>${symbol} ${opt}</div>`).join('')}
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
  // Initialization & Lifecycle
  // ============================================================================

  function initNewExamSession() {
    state.activeQuestions = sampleQuestions(state.config);
    state.currentIndex = 0;
    state.savedAnswers = {};
    state.draftAnswers = {};
    state.flaggedIds = [];
    state.remainingSeconds = (state.config.durationMinutes || 180) * 60;
    state.focusLossCount = 0;
    state.isSubmitted = false;
    state.gradingResult = null;

    if (DOM.activeModeIndicator) {
      DOM.activeModeIndicator.innerHTML = `Mode: <strong>${state.config.name}</strong>`;
    }

    if (DOM.evaluationDivider) DOM.evaluationDivider.style.display = 'none';
    if (DOM.evaluationSection) DOM.evaluationSection.style.display = 'none';

    renderNavigationMatrix();
    renderCurrentTask();
    startTimer();
    scheduleSave();
  }

  function init() {
    setupEventListeners();
    setupCalculatorAndReference();
    setupPdfImporter();
    setupProctoringMonitors();

    const restored = loadSessionFromStorage();
    if (restored && state.activeQuestions.length > 0) {
      if (DOM.activeModeIndicator) {
        DOM.activeModeIndicator.innerHTML = `Mode: <strong>${state.config?.name || 'Restored Examination'}</strong>`;
      }
      if (DOM.focusLossCount) {
        DOM.focusLossCount.textContent = state.focusLossCount;
      }

      renderNavigationMatrix();
      renderCurrentTask();
      updateTimerDisplay();

      if (!state.isSubmitted) {
        startTimer();
      } else if (state.gradingResult) {
        renderEvaluationSection();
      }

      if (DOM.saveStatusText && state.lastSaved) {
        DOM.saveStatusText.textContent = `Restored session (${state.lastSaved})`;
      }
    } else {
      initNewExamSession();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
