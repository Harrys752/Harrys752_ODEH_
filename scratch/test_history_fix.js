// Test mock for renderAttemptHistory logic
const legacyItem1 = {
  id: 'att_1794888000000',
  percentage: 56,
  taskCount: 19,
  durationSeconds: 1200,
  presetName: "Preset C — Discipline Specialization",
  mode: "unproctored",
  filterMode: "single-field",
  targetField: "Geology",
  earnedTotal: undefined, // Simulates the bug
  maxTotal: undefined,
  correctCount: undefined,
  partialCount: undefined,
  incorrectCount: undefined
};

const legacyItem2 = {
  id: 'att_1794888100000',
  percentage: 96,
  taskCount: 18,
  durationSeconds: 1500,
  presetName: "Preset C — Discipline Specialization",
  mode: "unproctored",
  filterMode: "single-field",
  targetField: "Meteorology & atmospheric sciences",
  earnedTotal: undefined,
  maxTotal: undefined,
  correctCount: undefined,
  partialCount: undefined,
  incorrectCount: undefined
};

function resolveItem(item) {
  let earned = item.pointsEarned ?? item.earnedPoints ?? item.earnedTotal;
  let maxPts = item.pointsMax ?? item.maxPoints ?? item.maxTotal;
  let correct = item.correctCount ?? item.fullyCorrectCount;
  let partial = item.partialCount ?? item.partialCreditCount;
  let incorrect = item.incorrectCount;

  const taskCount = item.taskCount || (item.snapshot?.activeQuestions?.length) || 0;
  if (maxPts === undefined || isNaN(maxPts)) {
    maxPts = taskCount > 0 ? (taskCount === 43 ? 100 : taskCount) : 100;
  }
  if (earned === undefined || isNaN(earned)) {
    earned = Math.round(((item.percentage || 0) / 100) * maxPts * 10) / 10;
  }
  if (correct === undefined || isNaN(correct)) {
    correct = Math.round(((item.percentage || 0) / 100) * taskCount);
  }
  if (partial === undefined || isNaN(partial)) {
    partial = 0;
  }
  if (incorrect === undefined || isNaN(incorrect)) {
    incorrect = Math.max(0, taskCount - correct - partial);
  }

  const displayEarned = Number.isInteger(earned) ? earned : Number(earned).toFixed(1);
  return { displayEarned, maxPts, correct, partial, incorrect, taskCount };
}

console.log("Resolving legacy 56% attempt:", resolveItem(legacyItem1));
console.log("Resolving legacy 96% attempt:", resolveItem(legacyItem2));
