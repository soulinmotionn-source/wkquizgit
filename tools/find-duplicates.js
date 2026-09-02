/**
 * WKQUIZ DUPLICATE QUESTION DETECTOR
 * Detects duplicate IDs, exact question matches, and fuzzy similarity (>80%).
 * Generates human-readable review reports without deleting data automatically.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");

function getWordTokens(text) {
  return new Set(
    (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 2)
  );
}

function calculateJaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function findDuplicates() {
  console.log("=================================================");
  console.log("🔎 WKQUIZ DUPLICATE QUESTION DETECTION");
  console.log("=================================================\n");

  const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json"));
  const allQuestions = [];

  files.forEach(file => {
    const raw = fs.readFileSync(path.join(qbDir, file), "utf8");
    try {
      const questions = JSON.parse(raw);
      if (Array.isArray(questions)) {
        questions.forEach(q => {
          allQuestions.push({
            id: q.id,
            category: q.category,
            question: q.question,
            file,
            tokens: getWordTokens(q.question)
          });
        });
      }
    } catch (e) {}
  });

  console.log(`📊 Analyzing ${allQuestions.length} questions across ${files.length} categories...\n`);

  const duplicateIds = [];
  const exactMatches = [];
  const fuzzyMatches = [];

  // Check all pairs
  for (let i = 0; i < allQuestions.length; i++) {
    for (let j = i + 1; j < allQuestions.length; j++) {
      const qA = allQuestions[i];
      const qB = allQuestions[j];

      // 1. Duplicate ID Check
      if (qA.id && qB.id && qA.id === qB.id) {
        duplicateIds.push({ id: qA.id, fileA: qA.file, fileB: qB.file });
      }

      // 2. Exact Question Match
      const cleanA = (qA.question || "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const cleanB = (qB.question || "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");

      if (cleanA && cleanB && cleanA === cleanB) {
        exactMatches.push({
          idA: qA.id,
          idB: qB.id,
          fileA: qA.file,
          fileB: qB.file,
          text: qA.question
        });
      } else {
        // 3. Fuzzy Similarity (>80%)
        const similarity = calculateJaccardSimilarity(qA.tokens, qB.tokens);
        if (similarity >= 0.80) {
          fuzzyMatches.push({
            idA: qA.id,
            idB: qB.id,
            similarity: Math.round(similarity * 100),
            questionA: qA.question,
            questionB: qB.question
          });
        }
      }
    }
  }

  // Report Results
  let issueCount = 0;

  if (duplicateIds.length > 0) {
    console.log("❌ DUPLICATE IDs DETECTED:");
    duplicateIds.forEach(d => {
      console.log(`  - ID: ${d.id} found in both ${d.fileA} and ${d.fileB}`);
    });
    issueCount += duplicateIds.length;
  }

  if (exactMatches.length > 0) {
    console.log("\n⚠️ EXACT MATCHING QUESTION TEXTS:");
    exactMatches.forEach(m => {
      console.log(`  - ${m.idA} (${m.fileA}) and ${m.idB} (${m.fileB}):\n    "${m.text}"`);
    });
    issueCount += exactMatches.length;
  }

  if (fuzzyMatches.length > 0) {
    console.log("\n🔍 HIGH SIMILARITY QUESTIONS FOR REVIEW (>80% similar):");
    fuzzyMatches.forEach(m => {
      console.log(`  - ${m.idA} vs ${m.idB} (${m.similarity}% similarity)`);
      console.log(`    A: "${m.questionA}"`);
      console.log(`    B: "${m.questionB}"`);
      console.log(`    Action: REVIEW REQUIRED\n`);
    });
    issueCount += fuzzyMatches.length;
  }

  console.log("-------------------------------------------------");
  if (issueCount === 0) {
    console.log("✅ NO DUPLICATES DETECTED! Question Bank is 100% unique.");
  } else {
    console.log(`⚠️ Total potential duplicate issues flagged for review: ${issueCount}`);
  }
  console.log("=================================================");
}

if (require.main === module) {
  findDuplicates();
}

module.exports = { findDuplicates };
