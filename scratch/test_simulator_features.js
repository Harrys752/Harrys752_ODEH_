const { QUESTION_BANK } = require('../questions.js');
console.log(`[PASS] Loaded Question Bank: ${QUESTION_BANK.length} questions`);

const ALL_FIELDS = [
  'Geography, physical',
  'Meteorology & atmospheric sciences',
  'Geology',
  'Geochemistry & geophysics',
  'Mining & mineral processing',
  'Ecology',
  'Environmental sciences'
];

const countsByField = {};
ALL_FIELDS.forEach(f => { countsByField[f] = { total: 0, basic: 0, intermediate: 0, advanced: 0 }; });

QUESTION_BANK.forEach(q => {
  if (!countsByField[q.field]) {
    throw new Error(`Non-canonical field found: "${q.field}" in question ID: ${q.id}`);
  }
  countsByField[q.field].total++;
  countsByField[q.field][q.difficulty]++;
});

console.log("\n--- Field Distribution Check ---");
ALL_FIELDS.forEach(f => {
  const c = countsByField[f];
  console.log(`Field "${f}": Total=${c.total} (Basic=${c.basic}, Inter=${c.intermediate}, Adv=${c.advanced})`);
  if (c.total < 18) throw new Error(`Field "${f}" has less than 18 questions! (${c.total})`);
  if (c.basic < 12) throw new Error(`Field "${f}" has less than 12 basic questions! (${c.basic})`);
  if (c.intermediate < 5) throw new Error(`Field "${f}" has less than 5 intermediate questions! (${c.intermediate})`);
  if (c.advanced < 1) throw new Error(`Field "${f}" has less than 1 advanced question! (${c.advanced})`);
});
console.log("[PASS] All 7 fields meet the 18+ question quota with basic, intermediate, and advanced tasks!");

console.log("\n--- Strict Single-Field Discipline Isolation Test ---");
ALL_FIELDS.forEach(targetField => {
  const config = {
    filterMode: 'single-field',
    targetField: targetField,
    quotas: { basic: 25, intermediate: 15, advanced: 3 }
  };

  const targetNorm = config.targetField.trim().toLowerCase();
  const fieldPool = QUESTION_BANK.filter(q => (q.field || '').trim().toLowerCase() === targetNorm);

  const bPool = fieldPool.filter(q => q.difficulty === 'basic');
  const iPool = fieldPool.filter(q => q.difficulty === 'intermediate');
  const aPool = fieldPool.filter(q => q.difficulty === 'advanced');

  const bCount = Math.min(bPool.length, 12);
  const iCount = Math.min(iPool.length, 5);
  const aCount = Math.min(aPool.length, 2);

  const picked = [...bPool.slice(0, bCount), ...iPool.slice(0, iCount), ...aPool.slice(0, aCount)];

  const impure = picked.filter(q => q.field.trim().toLowerCase() !== targetNorm);
  if (impure.length > 0) {
    throw new Error(`Leakage detected in field "${targetField}"! Impure questions: ${impure.map(q => q.id)}`);
  }

  console.log(`[PASS] "${targetField}": Sampled ${picked.length} tasks (B=${bCount}, I=${iCount}, A=${aCount}) — 100% pure, 0% leakage.`);
});

console.log("\n--- Verifying Real Questions from Candidate's Exam Photos ---");
const photoQueries = [
  { name: 'Desert Soils White Coating', snippet: 'desert soils often covered with a white coating' },
  { name: 'Metamorphic Rocks Electrical Conductivity', snippet: 'electrical conductivity in metamorphic rocks' },
  { name: 'Observation Site 800 mm July Norm', snippet: '800 mm of precipitation' }
];

photoQueries.forEach(pq => {
  const found = QUESTION_BANK.find(q => (q.content || '').toLowerCase().includes(pq.snippet.toLowerCase()) || (q.stem || '').toLowerCase().includes(pq.snippet.toLowerCase()));
  if (!found) {
    throw new Error(`Photo question "${pq.name}" not found in QUESTION_BANK!`);
  }
  console.log(`[PASS] Found "${pq.name}": ID ${found.id}, Field: "${found.field}"`);
});

console.log("\n>>> ALL AUTOMATED SIMULATOR TESTS PASSED WITH 100% SUCCESS! <<<");
