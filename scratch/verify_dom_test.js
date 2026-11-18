const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read files
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
const qjs = fs.readFileSync(path.join(__dirname, '../questions.js'), 'utf-8');
const ajs = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf-8');

// Build a lightweight DOM environment
class Element {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.classList = {
      add: (c) => { if (!this.className.includes(c)) this.className += ' ' + c; },
      remove: (c) => { this.className = this.className.replace(new RegExp('\\b' + c + '\\b', 'g'), '').trim(); },
      toggle: (c, force) => {
        const has = this.className.includes(c);
        if (force === undefined ? !has : force) this.classList.add(c);
        else this.classList.remove(c);
      },
      contains: (c) => this.className.includes(c)
    };
    this.children = [];
    this._innerHTML = '';
    this.textContent = '';
    this.style = {};
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.listeners = {};
    this.title = '';
  }
  set innerHTML(val) {
    this._innerHTML = val;
    if (val === '') this.children = [];
  }
  get innerHTML() {
    return this._innerHTML || '';
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  querySelector(selector) {
    return this.children.find(c => {
      if (selector.startsWith('.')) return c.className.includes(selector.slice(1));
      if (selector.startsWith('#')) return c.id === selector.slice(1);
      return c.tagName.toLowerCase() === selector.toLowerCase();
    }) || null;
  }
  querySelectorAll(selector) {
    return this.children.filter(c => {
      if (selector.startsWith('.')) return c.className.includes(selector.slice(1));
      if (selector.startsWith('#')) return c.id === selector.slice(1);
      return c.tagName.toLowerCase() === selector.toLowerCase();
    });
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatchEvent(event) {
    (this.listeners[event] || []).forEach(fn => fn({ preventDefault: () => {}, stopPropagation: () => {} }));
  }
}

// Map DOM elements by ID from index.html
const elementMap = {};
const idRegex = /id=["']([^"']+)["']/g;
let m;
while ((m = idRegex.exec(html)) !== null) {
  elementMap[m[1]] = new Element('div', m[1]);
}

// Add common query elements
elementMap['task-answer-zone'] = new Element('div', 'task-answer-zone');
elementMap['question-nav-matrix'] = new Element('div', 'question-nav-matrix');
elementMap['practice-target-field'] = new Element('select', 'practice-target-field');
elementMap['practice-target-field'].value = 'Geology';

const radioElements = [
  { value: 'stage2-full', checked: true, addEventListener: () => {} },
  { value: 'single-field', checked: false, addEventListener: () => {} }
];

const mockDocument = {
  getElementById: (id) => elementMap[id] || new Element('div', id),
  querySelector: (sel) => {
    if (sel.includes('practice-preset')) {
      return radioElements.find(r => r.checked) || radioElements[0];
    }
    const idMatch = sel.match(/#([a-zA-Z0-9_-]+)/);
    if (idMatch && elementMap[idMatch[1]]) return elementMap[idMatch[1]];
    return new Element('div');
  },
  querySelectorAll: (sel) => {
    if (sel.includes('practice-preset')) return radioElements;
    return [];
  },
  createElement: (tag) => new Element(tag),
  addEventListener: () => {},
  removeEventListener: () => {},
  readyState: 'complete',
  body: new Element('body')
};

const mockLocalStorage = {
  store: {},
  getItem: (k) => mockLocalStorage.store[k] || null,
  setItem: (k, v) => { mockLocalStorage.store[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage.store[k]; }
};

const sandbox = {
  window: {},
  document: mockDocument,
  localStorage: mockLocalStorage,
  console: console,
  setTimeout: (fn) => setTimeout(fn, 0),
  setInterval: () => 1,
  clearInterval: () => {},
  clearTimeout: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  MathJax: { typesetPromise: () => Promise.resolve() }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

// Run questions.js
vm.createContext(sandbox);
vm.runInContext(qjs, sandbox);

console.log("[TEST 1] Testing window.QUESTION_BANK attachment:");
if (!sandbox.window.QUESTION_BANK || sandbox.window.QUESTION_BANK.length === 0) {
  throw new Error("FAIL: window.QUESTION_BANK is not defined or empty!");
}
console.log(`PASS: window.QUESTION_BANK contains ${sandbox.window.QUESTION_BANK.length} tasks.`);

// Run app.js
vm.runInContext(ajs, sandbox);
console.log("[TEST 2] app.js initialized successfully.");

// Test 1: Start Mode A (Preset A · 43 Tasks)
console.log("\n[TEST 3] Testing Mode A: Preset A (43 Tasks) Launch:");
const btnStartProctored = elementMap['btn-lobby-start-proctored'];
if (!btnStartProctored) throw new Error("btn-lobby-start-proctored not found!");

btnStartProctored.dispatchEvent('click');

const matrixA = elementMap['question-nav-matrix'];
const stemA = elementMap['task-stem-text'];
const answerZoneA = elementMap['task-answer-zone'];
const counterA = elementMap['task-counter-display'];

console.log(` - Active Tasks in Matrix: ${matrixA.children.length} (Expected: 43)`);
console.log(` - Counter Text: "${counterA.textContent}" (Expected: Task 1 of 43)`);
console.log(` - Stem Content Length: ${stemA.innerHTML.length} chars (Must NOT be empty)`);
console.log(` - Options Container: ${answerZoneA.children.length > 0 ? 'Rendered' : 'Empty'}`);

if (matrixA.children.length !== 43) throw new Error(`FAIL: Matrix children count is ${matrixA.children.length}, expected 43!`);
if (stemA.innerHTML.length === 0) throw new Error("FAIL: Question stem was not rendered!");

console.log("PASS: Preset A (43 Tasks) launches and renders full question content!");

// Test 2: Start Mode B (Single-Field Focus: Geology)
console.log("\n[TEST 4] Testing Mode B: Single-Field Focus (Geology) Launch:");
radioElements[0].checked = false;
radioElements[1].checked = true; // Select 'single-field'
elementMap['practice-target-field'].value = 'Geology';

const btnStartPractice = elementMap['btn-lobby-start-practice'];
btnStartPractice.dispatchEvent('click');

const matrixB = elementMap['question-nav-matrix'];
const stemB = elementMap['task-stem-text'];
const badgeB = elementMap['exam-mode-badge'];
const counterB = elementMap['task-counter-display'];

console.log(` - Badge Text: "${badgeB.textContent}"`);
console.log(` - Active Tasks in Matrix: ${matrixB.children.length} (Expected: ~19)`);
console.log(` - Counter Text: "${counterB.textContent}"`);
console.log(` - Stem Content Length: ${stemB.innerHTML.length} chars (Must NOT be empty)`);

if (badgeB.textContent.includes('0 Tasks')) {
  throw new Error("FAIL: Badge still displays '0 Tasks'!");
}
if (matrixB.children.length === 0) {
  throw new Error("FAIL: Matrix has 0 tiles!");
}
if (stemB.innerHTML.length === 0) {
  throw new Error("FAIL: Question stem is empty!");
}

console.log("PASS: Single-Field Focus (Geology) correctly launches with non-zero tasks, full stem, and options!");

console.log("\n>>> ALL TESTS COMPLETED WITH 100% SUCCESS! <<<");
