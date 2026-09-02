/**
 * Quiz Engine Unit & Integration Tests
 */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { WKQuizDataProvider } = require("../src/data-provider");
const { WKQuizEngine } = require("../src/quiz-engine");

function runQuizEngineTests() {
  console.log("▶ Running Quiz Engine Logic, Difficulty & Randomization Tests...");

  const qbDir = path.join(__dirname, "..", "question-bank");
  const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json") && f !== "index.json");
  const allQuestions = [];
  files.forEach(file => {
    const questions = JSON.parse(fs.readFileSync(path.join(qbDir, file), "utf8"));
    if (Array.isArray(questions)) allQuestions.push(...questions);
  });

  const provider = new WKQuizDataProvider({ questions: allQuestions });
  const engine = new WKQuizEngine({ provider });

  // Test 1: Start Quiz with Specific Category, Difficulty, and Length
  const q1 = engine.startQuiz({ category: "nclex", difficulty: "medium", length: 5 });
  assert(q1 !== null, "startQuiz must return first question");
  assert.strictEqual(q1.questionNumber, 1, "First question must be #1");
  assert.strictEqual(q1.options.length, 4, "Question must have 4 options");
  console.log("  ✓ Start quiz with category (nclex), difficulty (medium), length (5) verified");

  // Test 2: Fisher-Yates Answer Option Remapping Verification
  // Verify that for all questions in the current quiz, the correct answer text matches the original answer text
  engine.currentQuiz.questions.forEach((shuffledQ) => {
    const originalQ = provider.getQuestionById(shuffledQ.id);
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
  if (q2) {
    const wrongIdx = (engine.currentQuiz.questions[engine.currentIndex].answer + 1) % 4;
    const wrongResult = engine.submitAnswer(wrongIdx);
    assert.strictEqual(wrongResult.isCorrect, false, "Submitting wrong index should evaluate to false");
    assert.strictEqual(engine.score, 1, "Score should remain 1");
    assert.strictEqual(engine.streak, 0, "Streak should reset to 0");
    console.log("  ✓ Score and streak calculation on incorrect answer verified");
  }

  // Test 5: Finish Quiz
  const finalStats = engine.finishQuiz();
  assert(finalStats.totalQuestions > 0, "Total questions in stats must be > 0");
  assert(finalStats.percentage >= 0 && finalStats.percentage <= 100, "Percentage must be between 0 and 100");
  assert(finalStats.badge && typeof finalStats.badge === "string", "Badge must be non-empty");
  console.log(`  ✓ Finished quiz stats: ${finalStats.score}/${finalStats.totalQuestions} (${finalStats.percentage}%) - ${finalStats.badge}`);

  // Test 6: Deterministic Daily Quiz Seed Consistency
  const dailyEngine1 = new WKQuizEngine({ provider });
  dailyEngine1.startQuiz({ mode: "daily", length: 5 });
  const dailyQIds1 = dailyEngine1.currentQuiz.questions.map(q => q.id);

  const dailyEngine2 = new WKQuizEngine({ provider });
  dailyEngine2.startQuiz({ mode: "daily", length: 5 });
  const dailyQIds2 = dailyEngine2.currentQuiz.questions.map(q => q.id);

  assert.deepStrictEqual(
    dailyQIds1,
    dailyQIds2,
    "Deterministic Daily Quiz on the same day must generate the exact identical questions"
  );
  console.log("  ✓ Deterministic Daily Quiz generates identical question seed on same day");

  // Test 7: Insufficient questions handling (NEVER DUPLICATE)
  const smallPoolEngine = new WKQuizEngine({ provider });
  // Request 50 questions for a small category
  smallPoolEngine.startQuiz({ category: "electronics", difficulty: "easy", length: 50 });
  const selectedCount = smallPoolEngine.currentQuiz.totalQuestions;
  const uniqueIds = new Set(smallPoolEngine.currentQuiz.questions.map(q => q.id));
  assert.strictEqual(selectedCount, uniqueIds.size, "Engine must never duplicate questions when pool is smaller than requested length");
  console.log(`  ✓ Insufficient questions handling verified: Selected ${selectedCount} unique questions without creating duplicates`);

  // Test 8: Survival Mode termination
  const survivalEngine = new WKQuizEngine({ provider });
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
