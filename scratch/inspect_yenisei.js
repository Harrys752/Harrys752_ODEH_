const { QUESTION_BANK } = require('../questions.js');
const q = QUESTION_BANK.find(x => x.content && x.content.includes('Yenisei River'));
if (q) {
  console.log("Found question:");
  console.log("ID:", q.id);
  console.log("Type:", q.type);
  console.log("Options:", q.options);
  console.log("Content:", q.content);
} else {
  console.log("Question not found");
}
