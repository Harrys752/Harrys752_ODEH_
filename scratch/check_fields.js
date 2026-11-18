const { QUESTION_BANK } = require('../questions.js');

console.log("Total questions in QUESTION_BANK:", QUESTION_BANK.length);

const keysSet = new Set();
QUESTION_BANK.forEach(q => {
  Object.keys(q).forEach(k => keysSet.add(k));
});
console.log("All properties found across objects in QUESTION_BANK:", Array.from(keysSet));

// Check missing 'field'
const missingField = QUESTION_BANK.filter(q => !q.field);
console.log("Questions missing 'field':", missingField.length);

// Check distinct fields
const fields = {};
QUESTION_BANK.forEach(q => {
  fields[q.field] = (fields[q.field] || 0) + 1;
});
console.log("\nDistinct fields and counts:");
Object.keys(fields).forEach(f => {
  console.log(` - "${f}": ${fields[f]}`);
});

// Test filtering by 'Geology'
const geologyNorm = 'geology';
const geologyQs = QUESTION_BANK.filter(q => (q.field || '').trim().toLowerCase() === geologyNorm);
console.log(`\nFiltering by 'Geology' (normalized): ${geologyQs.length} questions found.`);
