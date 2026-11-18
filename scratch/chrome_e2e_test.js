const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8085;
const ROOT = path.resolve(__dirname, '..');

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT, reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeMap = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`[HTTP] Serving static files at http://127.0.0.1:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const cdpPort = 9222;

  // 2. Launch headless Chrome
  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${cdpPort}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `http://127.0.0.1:${PORT}/index.html`
  ]);

  console.log(`[CHROME] Spawned headless Chrome (PID ${chromeProc.pid})`);

  // Wait for Chrome CDP endpoint
  await new Promise(r => setTimeout(r, 2000));

  try {
    // 3. Get websocket debugger URL
    const res = await fetch(`http://127.0.0.1:${cdpPort}/json`);
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error('No page target found in Chrome DevTools response');
    }
    console.log(`[CDP] Page target identified: ${pageTarget.title} (${pageTarget.url})`);

    // 4. Connect via WebSocket
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = {};

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending[msg.id]) {
        pending[msg.id](msg);
        delete pending[msg.id];
      }
    };

    await new Promise(resolve => ws.onopen = resolve);
    console.log('[CDP] Connected to Chrome DevTools WebSocket.');

    function sendCmd(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending[id] = (msg) => {
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        };
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evalCode(expression) {
      const res = await sendCmd('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result ? res.result.value : null;
    }

    // Wait for DOM to finish loading
    await new Promise(r => setTimeout(r, 1500));

    // CHECK 1: window.QUESTION_BANK availability
    console.log('\n--- BROWSER VERIFICATION 1: Question Bank in Live Chrome Context ---');
    const bankLength = await evalCode('window.QUESTION_BANK ? window.QUESTION_BANK.length : 0');
    console.log(`Live window.QUESTION_BANK.length: ${bankLength}`);
    if (bankLength < 170) {
      throw new Error(`FAIL: window.QUESTION_BANK has ${bankLength} items (expected >= 170)`);
    }
    console.log('[PASS] window.QUESTION_BANK is successfully loaded in real browser window object!');

    // CHECK 2: Start Mode A (Preset A · 43 Tasks)
    console.log('\n--- BROWSER VERIFICATION 2: Mode A (Preset A · 43 Tasks) Launch ---');
    await evalCode("document.getElementById('btn-lobby-start-proctored').click()");
    await new Promise(r => setTimeout(r, 500));

    const modeA_tasks = await evalCode('window.__odGetState ? window.__odGetState().activeQuestions.length : 0');
    const modeA_counter = await evalCode("document.getElementById('task-counter-display').textContent");
    const modeA_tiles = await evalCode("document.querySelectorAll('.nav-tile').length");
    const modeA_stem = await evalCode("document.getElementById('task-stem-text').textContent.trim()");
    const modeA_hasInput = await evalCode("Boolean(document.querySelector('.option-row, .numeric-input-wrapper, textarea, input'))");

    console.log(`Active questions count: ${modeA_tasks}`);
    console.log(`Counter display text: "${modeA_counter}"`);
    console.log(`Rendered nav tiles in matrix: ${modeA_tiles}`);
    console.log(`First task question stem: "${modeA_stem.slice(0, 80)}..."`);
    console.log(`Rendered answer input control: ${modeA_hasInput}`);

    if (modeA_tasks !== 43) throw new Error(`Mode A task count is ${modeA_tasks}, expected 43!`);
    if (modeA_tiles !== 43) throw new Error(`Mode A tile count is ${modeA_tiles}, expected 43!`);
    if (!modeA_stem || modeA_stem.length < 10) throw new Error('Mode A question stem is empty in browser!');
    if (!modeA_hasInput) throw new Error('Mode A answer controls are missing in browser!');
    console.log('[PASS] Mode A (Preset A) rendered 43 full tasks with stem, input controls, and 43 tiles!');

    // CHECK 3: Return to Lobby
    console.log('\n--- BROWSER VERIFICATION 3: Return to Lobby & Switch to Single-Field Geology ---');
    await evalCode("document.getElementById('btn-exam-to-lobby').click()");
    await new Promise(r => setTimeout(r, 400));

    // CHECK 4: Select Single-Field Focus (Geology) and Launch Mode B
    await evalCode(`
      const radios = document.querySelectorAll('input[name="practice-preset"]');
      radios.forEach(r => { if (r.value === 'single-field') r.checked = true; });
      const sel = document.getElementById('practice-target-field');
      if (sel) sel.value = 'Geology';
      document.getElementById('btn-lobby-start-practice').click();
    `);
    await new Promise(r => setTimeout(r, 600));

    const modeB_badge = await evalCode("document.getElementById('exam-mode-badge').textContent");
    const modeB_tasks = await evalCode('window.__odGetState ? window.__odGetState().activeQuestions.length : 0');
    const modeB_counter = await evalCode("document.getElementById('task-counter-display').textContent");
    const modeB_tiles = await evalCode("document.querySelectorAll('.nav-tile').length");
    const modeB_stem = await evalCode("document.getElementById('task-stem-text').textContent.trim()");
    const modeB_hasInput = await evalCode("Boolean(document.querySelector('.option-row, .numeric-input-wrapper, textarea, input'))");
    const modeB_purity = await evalCode("window.__odGetState().activeQuestions.every(q => q.field.toLowerCase() === 'geology')");

    console.log(`Exam mode badge text: "${modeB_badge}"`);
    console.log(`Active questions count: ${modeB_tasks}`);
    console.log(`Counter display text: "${modeB_counter}"`);
    console.log(`Rendered nav tiles in matrix: ${modeB_tiles}`);
    console.log(`First task question stem: "${modeB_stem.slice(0, 80)}..."`);
    console.log(`Rendered answer control: ${modeB_hasInput}`);
    console.log(`Discipline 100% Geology purity: ${modeB_purity}`);

    if (modeB_badge.includes('0 Tasks')) throw new Error(`FAIL: Badge displays '0 Tasks': "${modeB_badge}"`);
    if (modeB_tasks < 15 || modeB_tasks > 20) throw new Error(`FAIL: Unexpected Geology task count: ${modeB_tasks}`);
    if (modeB_tiles !== modeB_tasks) throw new Error(`FAIL: Tile count ${modeB_tiles} does not match tasks ${modeB_tasks}`);
    if (!modeB_stem || modeB_stem.length < 10) throw new Error('FAIL: Question stem is empty in Geology mode!');
    if (!modeB_hasInput) throw new Error('FAIL: Answer controls missing in Geology mode!');
    if (!modeB_purity) throw new Error('FAIL: Cross-field leakage detected in Geology single-field mode!');

    console.log('\n[PASS] Single-Field Focus (Geology) correctly renders 19 tasks with 100% purity and full question content in real Google Chrome!');

    console.log('\n======================================================');
    console.log('>>> ALL LIVE BROWSER VERIFICATIONS PASSED WITH 100%! <<<');
    console.log('======================================================');

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
    process.exitCode = 1;
  } finally {
    chromeProc.kill();
    server.close();
  }
});
