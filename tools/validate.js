/**
 * WKQUIZ QUESTION BANK VALIDATOR
 * Scans all JSON files in question-bank/ and strictly validates schema integrity,
 * unique IDs, 3-level difficulty, 4 options, valid answer index, explanations, and statuses.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");

function validateQuestionBank() {
  console.log("=================================================");
  console.log("🔍 WKQUIZ QUESTION BANK VALIDATION");
  console.log("=================================================\n");

  if (!fs.existsSync(qbDir)) {
    console.error(`❌ Question bank directory not found at: ${qbDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json") && f !== "index.json");
  console.log(`📁 Found ${files.length} category files in question-bank/\n`);

  let totalQuestions = 0;
  let validQuestions = 0;
  const errors = [];
  const warnings = [];
  const seenIds = new Map();
  const seenTexts = new Map();

  const validDifficulties = new Set(["easy", "medium", "hard"]);
  const validStatuses = new Set(["active", "review", "draft", "disabled"]);

  files.forEach(file => {
    const filePath = path.join(qbDir, file);
    let data;
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(raw);
    } catch (err) {
      errors.push(`[${file}] Invalid JSON syntax: ${err.message}`);
      return;
    }

    if (!Array.isArray(data)) {
      errors.push(`[${file}] Top-level structure must be an Array of questions`);
      return;
    }

    data.forEach((q, idx) => {
      totalQuestions++;
      const qLocation = `[${file} #${idx + 1} ID: ${q.id || 'MISSING_ID'}]`;
      let isValid = true;

      // 1. Required Fields Check
      const requiredFields = ["id", "category", "difficulty", "question", "options", "answer", "explanation", "status"];
      for (const field of requiredFields) {
        if (q[field] === undefined || q[field] === null || q[field] === "") {
          errors.push(`${qLocation} Missing required field: "${field}"`);
          isValid = false;
        }
      }

      // 2. ID Validation & Uniqueness
      if (q.id) {
        if (typeof q.id !== "string" || q.id.trim() === "") {
          errors.push(`${qLocation} ID must be a non-empty string`);
          isValid = false;
        } else if (seenIds.has(q.id)) {
          errors.push(`${qLocation} Duplicate ID detected! Already used in ${seenIds.get(q.id)}`);
          isValid = false;
        } else {
          seenIds.set(q.id, qLocation);
        }
      }

      // 3. Difficulty Check (Strictly Easy | Medium | Hard)
      if (q.difficulty) {
        const diff = String(q.difficulty).toLowerCase().trim();
        if (!validDifficulties.has(diff)) {
          errors.push(`${qLocation} Invalid difficulty "${q.difficulty}". Must be strictly "easy", "medium", or "hard".`);
          isValid = false;
        }
      }

      // 4. Status Check (Strictly active | review | draft | disabled)
      if (q.status) {
        const stat = String(q.status).toLowerCase().trim();
        if (!validStatuses.has(stat)) {
          errors.push(`${qLocation} Invalid status "${q.status}". Must be "active", "review", "draft", or "disabled".`);
          isValid = false;
        }
      }

      // 5. Options Validation (Exactly 4 options)
      if (q.options) {
        if (!Array.isArray(q.options)) {
          errors.push(`${qLocation} "options" must be an Array`);
          isValid = false;
        } else if (q.options.length !== 4) {
          errors.push(`${qLocation} "options" must contain exactly 4 choices (found ${q.options.length})`);
          isValid = false;
        } else {
          q.options.forEach((opt, optIdx) => {
            if (typeof opt !== "string" || opt.trim() === "") {
              errors.push(`${qLocation} Option [${optIdx}] is empty or not a string`);
              isValid = false;
            }
          });
        }
      }

      // 6. Answer Index Validation (0 to 3)
      if (typeof q.answer !== "number" || !Number.isInteger(q.answer) || q.answer < 0 || (q.options && q.answer >= q.options.length)) {
        errors.push(`${qLocation} Invalid answer index "${q.answer}". Must be an integer between 0 and 3.`);
        isValid = false;
      }

      // 7. Explanation Validation
      if (q.explanation && typeof q.explanation === "string" && q.explanation.trim().length < 10) {
        warnings.push(`${qLocation} Explanation is unusually brief (${q.explanation.length} chars)`);
      }

      // 8. Exact Duplicate Text Check
      if (q.question) {
        const cleanText = q.question.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
        if (seenTexts.has(cleanText)) {
          warnings.push(`${qLocation} Identical question text matches ${seenTexts.get(cleanText)}`);
        } else {
          seenTexts.set(cleanText, qLocation);
        }
      }

      if (isValid) {
        validQuestions++;
      }
    });
  });

  // Summary Report
  console.log("-------------------------------------------------");
  console.log(`Total Questions Scanned : ${totalQuestions}`);
  console.log(`Valid Questions         : ${validQuestions}`);
  console.log(`Errors Found            : ${errors.length}`);
  console.log(`Warnings / Notices      : ${warnings.length}`);
  console.log("-------------------------------------------------");

  if (warnings.length > 0) {
    console.log("\n⚠️ NOTICES & WARNINGS:");
    warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
    if (warnings.length > 10) console.log(`  ... and ${warnings.length - 10} more warnings.`);
  }

  if (errors.length > 0) {
    console.log("\n❌ VALIDATION ERRORS:");
    errors.forEach(e => console.error(`  - ${e}`));
    console.log("\n=================================================");
    console.log("STATUS: FAILED — DO NOT DEPLOY");
    console.log("=================================================");
    process.exit(1);
  } else {
    console.log("\n=================================================");
    console.log("STATUS: PASSED — READY FOR DEPLOYMENT");
    console.log("=================================================");
    process.exit(0);
  }
}

if (require.main === module) {
  validateQuestionBank();
}

module.exports = { validateQuestionBank };
