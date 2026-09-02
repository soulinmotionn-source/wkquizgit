/**
 * Question Bank Validation Tests
 */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { WKQUIZ_QUESTIONS } = require("../src/questions");
const { WKQuizDataProvider } = require("../src/data-provider");

function runQuestionBankTests() {
  console.log("▶ Running Question Bank & Provider Validation Tests...");

  const qbDir = path.join(__dirname, "..", "question-bank");
  const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json") && f !== "index.json");

  assert(files.length >= 25, `Expected at least 25 category files, found ${files.length}`);
  console.log(`  ✓ Found ${files.length} category files in question-bank/`);

  // Aggregate questions from files
  const allQuestions = [];
  files.forEach(file => {
    const questions = JSON.parse(fs.readFileSync(path.join(qbDir, file), "utf8"));
    if (Array.isArray(questions)) allQuestions.push(...questions);
  });

  // Test 1: Bank is loaded and non-empty
  assert(Array.isArray(allQuestions), "Questions must be an array");
  assert(allQuestions.length >= 100, `Expected at least 100 questions, found ${allQuestions.length}`);
  console.log(`  ✓ Loaded ${allQuestions.length} questions from question-bank repository`);

  // Test 2: Unique IDs and valid schemas
  const seenIds = new Set();
  const validDifficulties = new Set(["easy", "medium", "hard"]);
  const validStatuses = new Set(["active", "review", "draft", "disabled"]);

  allQuestions.forEach((q, index) => {
    assert(q.id && typeof q.id === "string", `Question at index ${index} must have a valid string id`);
    assert(!seenIds.has(q.id), `Duplicate question ID detected: "${q.id}"`);
    seenIds.add(q.id);

    assert(q.category && typeof q.category === "string", `Question ${q.id} missing category`);
    assert(validDifficulties.has(String(q.difficulty).toLowerCase()), `Question ${q.id} invalid difficulty: ${q.difficulty}`);
    assert(validStatuses.has(String(q.status || "active").toLowerCase()), `Question ${q.id} invalid status: ${q.status}`);
    assert(q.question && typeof q.question === "string", `Question ${q.id} missing question text`);
    assert(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} options must have exactly 4 items`);
    assert(typeof q.answer === "number" && q.answer >= 0 && q.answer < 4, `Question ${q.id} answer index (${q.answer}) out of range 0..3`);
    assert(q.explanation && typeof q.explanation === "string", `Question ${q.id} missing explanation text`);
  });
  console.log("  ✓ All question schemas, 3-level difficulties, and unique IDs validated");

  // Test 3: Data Provider filtering
  const provider = new WKQuizDataProvider({ questions: allQuestions });
  
  const nclexHard = provider.getQuestions({ category: "nclex", difficulty: "hard", status: "active" });
  assert(nclexHard.questions.length > 0, "NCLEX hard query must return questions");
  assert(nclexHard.questions.every(q => (q.difficulty || "").toLowerCase() === "hard"), "Hard difficulty filter mismatch");

  const hvacEasy = provider.getQuestions({ category: "hvac", difficulty: "easy", status: "active" });
  assert(hvacEasy.questions.length > 0, "HVAC easy query must return questions");
  assert(hvacEasy.questions.every(q => (q.difficulty || "").toLowerCase() === "easy"), "Easy difficulty filter mismatch");

  const stats = provider.getStats();
  assert(Object.keys(stats).length >= 25, "Stats must report >= 25 categories");
  console.log("  ✓ Data Provider category, difficulty, and stats methods working properly");

  console.log("✔ Question Bank & Provider Tests Passed!\n");
}

module.exports = { runQuestionBankTests };

if (require.main === module) {
  runQuestionBankTests();
}
