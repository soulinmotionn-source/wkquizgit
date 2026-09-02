/**
 * Master Test Runner for WKQuiz
 */
const { runQuestionBankTests } = require("./test-question-bank");
const { runQuizEngineTests } = require("./test-quiz-engine");

console.log("=========================================");
console.log("🧪 WKQUIZ AUTOMATED TEST SUITE");
console.log("=========================================\n");

try {
  runQuestionBankTests();
  runQuizEngineTests();
  console.log("=========================================");
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY (100%)");
  console.log("=========================================");
  process.exit(0);
} catch (error) {
  console.error("\n❌ TEST SUITE FAILED:");
  console.error(error);
  process.exit(1);
}
