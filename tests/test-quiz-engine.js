/**
 * Quiz Engine Unit & Integration Tests
 */
const assert = require("assert");
const { WKQUIZ_QUESTIONS, WKQuizQuestionBank } = require("../src/questions");
const { WKQuizEngine } = require("../src/quiz-engine");

function runQuizEngineTests() {
  console.log("▶ Running Quiz Engine Logic & Randomization Tests...");

  const bank = new WKQuizQuestionBank(WKQUIZ_QUESTIONS);
  const engine = new WKQuizEngine({ bank });

  // Test 1: Start Classic Quiz (10 Qs)
  const q1 = engine.startQuiz({ mode: "classic", category: "all" });
  assert(q1 !== null, "startQuiz must return first question");
  assert.strictEqual(q1.questionNumber, 1, "First question must be #1");
  assert.strictEqual(q1.totalQuestions, 10, "Classic mode must select 10 questions");
  assert.strictEqual(q1.options.length, 4, "Question must have 4 options");
  console.log("  ✓ Start classic quiz returns valid initial question");

  // Test 2: Fisher-Yates Answer Option Remapping Verification
  // Verify that for all questions in the current quiz, the correct answer text matches the original answer text
  engine.currentQuiz.questions.forEach((shuffledQ, idx) => {
    const originalQ = WKQUIZ_QUESTIONS.find(item => item.id === shuffledQ.id);
    assert(originalQ, `Original question ${shuffledQ.id} not found`);
    const originalCorrectText = originalQ.options[originalQ.answer];
    const shuffledCorrectText = shuffledQ.options[shuffledQ.answer];
    assert.strictEqual(
      shuffledCorrectText,
      originalCorrectText,
      `Option shuffle broke answer mapping for ${shuffledQ.id}! Shuffled points to "${shuffledCorrectText}", original was "${originalCorrectText}"`
    );
  });
  console.log("  ✓ Option shuffling preserves exact correct answer mapping across all questions");

  // Test 3: Submitting correct answer increases score and streak
  const currentQObj = engine.currentQuiz.questions[engine.currentIndex];
  const correctIdx = currentQObj.answer;
  const submitResult = engine.submitAnswer(correctIdx);
  assert.strictEqual(submitResult.isCorrect, true, "Submitting correct index should evaluate to true");
  assert.strictEqual(engine.score, 1, "Score should increment to 1");
  assert.strictEqual(engine.streak, 1, "Streak should increment to 1");
  console.log("  ✓ Score and streak calculation on correct answer verified");

  // Test 4: Submitting incorrect answer resets streak
  const q2 = engine.nextQuestion();
  assert(q2 !== null, "nextQuestion must advance");
  const wrongIdx = (engine.currentQuiz.questions[engine.currentIndex].answer + 1) % 4;
  const wrongResult = engine.submitAnswer(wrongIdx);
  assert.strictEqual(wrongResult.isCorrect, false, "Submitting wrong index should evaluate to false");
  assert.strictEqual(engine.score, 1, "Score should remain 1");
  assert.strictEqual(engine.streak, 0, "Streak should reset to 0");
  console.log("  ✓ Score and streak calculation on incorrect answer verified");

  // Test 5: Complete remaining questions and finish
  while (engine.currentIndex + 1 < engine.currentQuiz.totalQuestions) {
    engine.nextQuestion();
    const cur = engine.currentQuiz.questions[engine.currentIndex];
    engine.submitAnswer(cur.answer);
  }
  const finalStats = engine.finishQuiz();
  assert.strictEqual(finalStats.totalQuestions, 10, "Total questions in stats must be 10");
  assert(finalStats.percentage >= 0 && finalStats.percentage <= 100, "Percentage must be between 0 and 100");
  assert(finalStats.badge && typeof finalStats.badge === "string", "Badge must be non-empty");
  console.log(`  ✓ Finished quiz stats: ${finalStats.score}/${finalStats.totalQuestions} (${finalStats.percentage}%) - ${finalStats.badge}`);

  // Test 6: Deterministic Daily Quiz Seed Consistency
  const dailyEngine1 = new WKQuizEngine({ bank });
  dailyEngine1.startQuiz({ mode: "daily" });
  const dailyQIds1 = dailyEngine1.currentQuiz.questions.map(q => q.id);

  const dailyEngine2 = new WKQuizEngine({ bank });
  dailyEngine2.startQuiz({ mode: "daily" });
  const dailyQIds2 = dailyEngine2.currentQuiz.questions.map(q => q.id);

  assert.deepStrictEqual(
    dailyQIds1,
    dailyQIds2,
    "Deterministic Daily Quiz on the same day must generate the exact identical questions"
  );
  console.log("  ✓ Deterministic Daily Quiz generates identical question seed on same day");

  // Test 7: Quick Quiz mode (5 questions)
  const quickEngine = new WKQuizEngine({ bank });
  quickEngine.startQuiz({ mode: "quick" });
  assert.strictEqual(quickEngine.currentQuiz.totalQuestions, 5, "Quick quiz mode must have exactly 5 questions");
  console.log("  ✓ Quick quiz mode (5 questions) verified");

  // Test 8: Survival Mode termination
  const survivalEngine = new WKQuizEngine({ bank });
  survivalEngine.startQuiz({ mode: "survival" });
  const curSurv = survivalEngine.currentQuiz.questions[0];
  const wrongSurvIdx = (curSurv.answer + 1) % 4;
  const survResult = survivalEngine.submitAnswer(wrongSurvIdx);
  assert.strictEqual(survResult.isSurvivalOver, true, "Survival mode must terminate on wrong answer");
  console.log("  ✓ Survival mode termination on error verified");

  console.log("✔ Quiz Engine Tests Passed!\n");
}

module.exports = { runQuizEngineTests };

if (require.main === module) {
  runQuizEngineTests();
}
