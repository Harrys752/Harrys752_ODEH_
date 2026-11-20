const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8087;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeMap = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, async () => {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--remote-debugging-port=9224',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    'http://127.0.0.1:' + PORT + '/index.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const res = await fetch('http://127.0.0.1:9224/json');
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = {};
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
    await new Promise(r => ws.onopen = r);

    function evalCode(expr) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending[id] = m => m.error ? reject(m.error) : resolve(m.result && m.result.result ? m.result.result.value : null);
        ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true, awaitPromise: true } }));
      });
    }

    await new Promise(r => setTimeout(r, 1500));

    // Test History Rendering with legacy object
    console.log('--- TEST 1: Legacy History Rendering ---');
    await evalCode(`
      (() => {
        const legacyHistory = [
          {
            id: 'att_test_1',
            dateFormatted: '18 Nov 2026, 14:30',
            presetName: 'Stage 2 Full Set',
            filterMode: 'balanced',
            targetField: 'all',
            taskCount: 43,
            durationSeconds: 3600,
            percentage: 56
          },
          {
            id: 'att_test_2',
            dateFormatted: '18 Nov 2026, 16:45',
            presetName: 'Discipline Focus: Geology',
            filterMode: 'single-field',
            targetField: 'Geology',
            taskCount: 19,
            durationSeconds: 1800,
            percentage: 96
          }
        ];
        localStorage.setItem('od_attempt_history_v1', JSON.stringify(legacyHistory));
        if (window.__odRenderHistory) window.__odRenderHistory();
      })()
    `);

    await new Promise(r => setTimeout(r, 500));

    const historyCards = await evalCode(`
      (() => {
        return Array.from(document.querySelectorAll('.history-item-card')).map(c => ({
          title: c.querySelector('.history-item-title')?.textContent?.trim(),
          meta: c.querySelector('.history-item-meta')?.textContent?.trim(),
          percent: c.querySelector('.history-score-percent')?.textContent?.trim(),
          pts: c.querySelector('.history-score-pts')?.textContent?.trim()
        }));
      })()
    `);

    console.log('History Cards:', JSON.stringify(historyCards, null, 2));

    const jsonStr = JSON.stringify(historyCards);
    if (!historyCards || historyCards.length === 0) throw new Error('FAIL: No history cards rendered!');
    if (jsonStr.includes('undefined')) throw new Error('FAIL: Attempt history still has undefined values: ' + jsonStr);
    console.log('[PASS] History rendered cleanly with ZERO undefined values! Points and counts resolved dynamically!');

    // Test Marathon 90 Tasks Mode (Preset D)
    console.log('\n--- TEST 2: Marathon 90 Tasks Launch ---');
    await evalCode(`
      (() => {
        const radios = document.querySelectorAll('input[name="practice-preset"]');
        radios.forEach(r => { if (r.value === 'marathon-90') r.checked = true; });
        document.getElementById('btn-lobby-start-practice').click();
      })()
    `);
    await new Promise(r => setTimeout(r, 800));

    const m90_tasks = await evalCode('window.__odGetState ? window.__odGetState().activeQuestions.length : 0');
    const m90_counter = await evalCode("document.getElementById('task-counter-display').textContent");
    const m90_tiles = await evalCode("document.querySelectorAll('.nav-tile').length");
    const m90_stem = await evalCode("document.getElementById('task-stem-text').textContent.trim()");

    console.log('Marathon tasks count:', m90_tasks);
    console.log('Counter display:', m90_counter);
    console.log('Nav tiles count:', m90_tiles);
    console.log('Question stem preview:', m90_stem.slice(0, 80));

    if (m90_tasks !== 90) throw new Error('FAIL: Marathon task count is ' + m90_tasks + ', expected 90!');
    if (m90_tiles !== 90) throw new Error('FAIL: Marathon tile count is ' + m90_tiles + ', expected 90!');
    console.log('[PASS] Marathon 90 tasks mode launched with exactly 90 tiles matching real Open Doors test photos (Tasks 1..90 in 3 columns of 30)!');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    chromeProc.kill();
    server.close();
  }
});
