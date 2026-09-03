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

  // Test 1: Start Quiz with Specific Category, Difficulty, and Length (Exact 5 questions check!)
  const q1 = engine.startQuiz({ category: "nursing", difficulty: "easy", length: 5, mode: "normal" });
  assert(q1 !== null, "startQuiz must return first question");
  assert.strictEqual(q1.questionNumber, 1, "First question must be #1");
  assert.strictEqual(engine.currentQuiz.totalQuestions, 5, "Engine must serve EXACTLY 5 questions when 5 are requested");
  assert.strictEqual(q1.options.length, 4, "Question must have 4 options");
  console.log("  ✓ Start quiz with category (nursing), difficulty (easy), length (5) verified: EXACTLY 5 questions");

  // Test 2: Fisher-Yates Answer Option Remapping Verification
  engine.currentQuiz.questions.forEach((shuffledQ) => {
    const originalQ = provider.getQuestionById(shuffledQ.id);
    assert(originalQ, `Original question ${shuffledQ.id} not found`);
    const originalCorrectText = originalQ.options[originalQ.answer];
    const shuffledCorrectText = shuffledQ.options[shuffledQ.answer];
    assert.strictEqual(
      shuffledCorrectText,
      originalCorrectText,
      `Option shuffle broke answer mapping for ${shuffledQ.id}!`
    );
  });
  console.log("  ✓ Option shuffling preserves exact correct answer mapping across all questions");

  // Test 3: Normal Mode complete 5-question lifecycle
  for (let i = 1; i <= 5; i++) {
    const curQ = engine.currentQuiz.questions[engine.currentIndex];
    const res = engine.submitAnswer(curQ.answer);
    assert.strictEqual(res.isCorrect, true);
    if (i < 5) {
      const nextQ = engine.nextQuestion();
      assert(nextQ !== null, `Expected question #${i + 1} but got null`);
      assert.strictEqual(nextQ.questionNumber, i + 1);
    } else {
      const nextQ = engine.nextQuestion();
      assert.strictEqual(nextQ, null, "Quiz should complete after question 5");
    }
  }
  const finalStats = engine.finishQuiz();
  assert.strictEqual(finalStats.totalQuestions, 5, "Total questions in stats must be 5");
  assert.strictEqual(finalStats.score, 5, "Score must be 5/5");
  assert.strictEqual(finalStats.percentage, 100);
  console.log(`  ✓ Completed full 5-question normal quiz: 5/5 (100%)`);

  // Test 4: Time Mode Continuous Whole-Quiz Countdown Verification (TESTS 1, 2, 3, 4)
  const timeEngine = new WKQuizEngine({ provider });
  timeEngine.startQuiz({ category: "nursing", difficulty: "easy", length: 5, mode: "time" });
  assert.strictEqual(timeEngine.mode, "time");
  assert.strictEqual(timeEngine.currentQuiz.totalQuestions, 5);
  assert.strictEqual(timeEngine.totalTimeDuration, 60, "5 questions in time mode should have 60 seconds duration");
  assert.strictEqual(timeEngine.timeRemaining, 60);

  // Question 1: Answer question
  timeEngine.submitAnswer(timeEngine.currentQuiz.questions[0].answer);
  // Simulate 5 seconds elapsed
  timeEngine.timeRemaining = 55;

  // Transition Question 1 -> Question 2
  const q2Time = timeEngine.nextQuestion();
  assert(q2Time !== null, "Question 2 must load");
  assert.strictEqual(q2Time.questionNumber, 2);
  assert.strictEqual(timeEngine.timeRemaining, 55, "Timer must NOT reset on Question 2 transition; must remain at 55s");

  // Simulate 7 more seconds elapsed on Question 2
  timeEngine.timeRemaining = 48;
  timeEngine.submitAnswer(timeEngine.currentQuiz.questions[1].answer);

  // Transition Question 2 -> Question 3
  const q3Time = timeEngine.nextQuestion();
  assert(q3Time !== null, "Question 3 must load");
  assert.strictEqual(q3Time.questionNumber, 3);
  assert.strictEqual(timeEngine.timeRemaining, 48, "Timer must continue continuously at 48s on Question 3");

  console.log("  ✓ Time Mode continuous whole-quiz countdown across Q1 -> Q2 -> Q3 verified (Never resets)");

  // Test 5: Timer Expiration Test (TEST 5)
  timeEngine.timeRemaining = 0;
  timeEngine.isTimeExpired = true;
  const timeStats = timeEngine.finishQuiz();
  assert.strictEqual(timeStats.isTimeExpired, true, "isTimeExpired must be true when timer reaches 0");
  assert.strictEqual(timeStats.badge, "Time Out ⏱️");
  console.log("  ✓ Time Mode ends correctly when timer reaches zero");

  // Test 6: Survival Mode - Sudden death on wrong answer (TEST 7)
  const survivalEngine = new WKQuizEngine({ provider });
  survivalEngine.startQuiz({ category: "electrical", difficulty: "medium", length: 20, mode: "survival" });
  assert.strictEqual(survivalEngine.mode, "survival");

  // Question 1 correct
  const survQ1 = survivalEngine.currentQuiz.questions[0];
  const survRes1 = survivalEngine.submitAnswer(survQ1.answer);
  assert.strictEqual(survRes1.isCorrect, true);
  assert.strictEqual(survRes1.isSurvivalOver, false);
  assert.strictEqual(survRes1.hasNext, true);
  survivalEngine.nextQuestion();

  // Question 2 wrong -> immediate game over
  const survQ2 = survivalEngine.currentQuiz.questions[1];
  const wrongIdx = (survQ2.answer + 1) % 4;
  const survRes2 = survivalEngine.submitAnswer(wrongIdx);
  assert.strictEqual(survRes2.isCorrect, false);
  assert.strictEqual(survRes2.isSurvivalOver, true, "Survival mode must terminate on wrong answer");
  assert.strictEqual(survRes2.hasNext, false);
  
  const survStats = survivalEngine.finishQuiz();
  assert.strictEqual(survStats.survivedCount, 1, "Survived count must be exactly 1");
  assert.strictEqual(survStats.isSurvivalOver, true);
  console.log("  ✓ Survival Mode correctly terminated on wrong answer with 1 question survived");

  // Test 7: Session-Level No-Repeat Protection
  const sessionEngine = new WKQuizEngine({ provider });
  sessionEngine.sessionUsedIds.clear(); // start clean session
  
  sessionEngine.startQuiz({ category: "hvac", difficulty: "easy", length: 5, mode: "normal" });
  const quiz1Ids = sessionEngine.currentQuiz.questions.map(q => q.id);
  assert.strictEqual(new Set(quiz1Ids).size, 5, "Quiz 1 must have 5 unique questions");

  sessionEngine.startQuiz({ category: "hvac", difficulty: "easy", length: 5, mode: "normal" });
  const quiz2Ids = sessionEngine.currentQuiz.questions.map(q => q.id);
  assert.strictEqual(new Set(quiz2Ids).size, 5, "Quiz 2 must have 5 unique questions");

  // Verify zero overlap between Quiz 1 and Quiz 2 in the same session
  const overlap = quiz1Ids.filter(id => quiz2Ids.includes(id));
  assert.strictEqual(overlap.length, 0, `Quiz 2 repeated questions from Quiz 1 in same session: ${overlap.join(", ")}`);
  console.log("  ✓ Session-level no-repeat verified: 0 repeated questions across consecutive quizzes");

  // Test 8: Deterministic Daily Quiz Seed Consistency
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

  console.log("✔ All Quiz Engine Tests Passed Successfully!\n");
}

module.exports = { runQuizEngineTests };

if (require.main === module) {
  runQuizEngineTests();
}
