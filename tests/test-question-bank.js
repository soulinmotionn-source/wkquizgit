/**
 * Question Bank Validation Tests
 */
const assert = require("assert");
const { WKQUIZ_QUESTIONS, WKQuizQuestionBank } = require("../src/questions");

function runQuestionBankTests() {
  console.log("▶ Running Question Bank Validation Tests...");

  // Test 1: Bank is loaded and non-empty
  assert(Array.isArray(WKQUIZ_QUESTIONS), "WKQUIZ_QUESTIONS must be an array");
  assert(WKQUIZ_QUESTIONS.length >= 25, `Expected at least 25 questions, found ${WKQUIZ_QUESTIONS.length}`);
  console.log(`  ✓ Loaded ${WKQUIZ_QUESTIONS.length} initial questions`);

  // Test 2: Unique IDs and valid schemas
  const seenIds = new Set();
  WKQUIZ_QUESTIONS.forEach((q, index) => {
    assert(q.id && typeof q.id === "string", `Question at index ${index} must have a valid string id`);
    assert(!seenIds.has(q.id), `Duplicate question ID detected: "${q.id}"`);
    seenIds.add(q.id);

    assert(q.category && typeof q.category === "string", `Question ${q.id} missing category`);
    assert(q.question && typeof q.question === "string", `Question ${q.id} missing question text`);
    assert(Array.isArray(q.options) && q.options.length >= 2, `Question ${q.id} options must have >= 2 items`);
    assert(typeof q.answer === "number" && q.answer >= 0 && q.answer < q.options.length, 
      `Question ${q.id} answer index (${q.answer}) out of range for options length ${q.options.length}`);
    assert(q.explanation && typeof q.explanation === "string", `Question ${q.id} missing explanation text`);
  });
  console.log("  ✓ All question schemas and unique IDs validated");

  // Test 3: QuestionBank class filtering
  const bank = new WKQuizQuestionBank(WKQUIZ_QUESTIONS);
  
  const nclexQs = bank.getByCategory("nclex");
  assert(nclexQs.length > 0, "NCLEX category must return questions");
  assert(nclexQs.every(q => q.category === "nclex" || (q.tags && q.tags.includes("nclex"))), "NCLEX filtering mismatch");

  const hardQs = bank.filter({ difficulty: "hard" });
  assert(hardQs.length > 0, "Hard difficulty filter must return questions");
  assert(hardQs.every(q => q.difficulty === "hard"), "Hard difficulty filtering mismatch");

  const searchResults = bank.filter({ search: "Ohm" });
  assert(searchResults.length > 0, "Search query 'Ohm' must return electrical questions");

  console.log("  ✓ Filter, category, and search methods working properly");
  console.log("✔ Question Bank Tests Passed!\n");
}

module.exports = { runQuestionBankTests };

if (require.main === module) {
  runQuestionBankTests();
}
