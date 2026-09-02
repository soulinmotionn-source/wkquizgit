/**
 * WKQUIZ QUESTION IMPORTER
 * Imports and validates question batches from JSON or CSV files into question-bank/
 * Usage: node tools/import.js <filepath> [categorySlug]
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim());
  const questions = [];

  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parser handling quotes
    const row = [];
    let insideQuotes = false;
    let current = "";
    
    for (const char of lines[i]) {
      if (char === '"' || char === "'") {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        row.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current.trim());

    if (row.length >= 7) {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx] || "";
      });

      // Construct options array
      const options = [
        obj.optionA || obj.option_a || row[5] || "",
        obj.optionB || obj.option_b || row[6] || "",
        obj.optionC || obj.option_c || row[7] || "",
        obj.optionD || obj.option_d || row[8] || ""
      ].filter(o => o.length > 0);

      // Parse answer index (can be "A", "B", "C", "D" or 0, 1, 2, 3)
      let answerIdx = 0;
      const rawAns = (obj.answer || "").toString().trim().toUpperCase();
      if (rawAns === "A" || rawAns === "0") answerIdx = 0;
      else if (rawAns === "B" || rawAns === "1") answerIdx = 1;
      else if (rawAns === "C" || rawAns === "2") answerIdx = 2;
      else if (rawAns === "D" || rawAns === "3") answerIdx = 3;

      const q = {
        id: obj.id || "",
        category: obj.category || "General",
        subcategory: obj.subcategory || "",
        difficulty: (obj.difficulty || "medium").toLowerCase(),
        question: obj.question || "",
        options,
        answer: answerIdx,
        explanation: obj.explanation || "",
        tags: obj.tags ? obj.tags.split(";").map(t => t.trim()) : [],
        status: (obj.status || "active").toLowerCase()
      };

      questions.push(q);
    }
  }

  return questions;
}

function importQuestions(filePath, targetCategory) {
  console.log("=================================================");
  console.log("📥 WKQUIZ QUESTION IMPORTER");
  console.log("=================================================\n");

  if (!filePath || !fs.existsSync(filePath)) {
    console.error("❌ Usage: node tools/import.js <input-file.json|csv> [target-category]");
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  let incoming = [];

  if (filePath.endsWith(".json")) {
    try {
      incoming = JSON.parse(raw);
    } catch (e) {
      console.error("❌ Error parsing JSON:", e.message);
      process.exit(1);
    }
  } else if (filePath.endsWith(".csv")) {
    incoming = parseCSV(raw);
  } else {
    console.error("❌ Unsupported file format. Please provide .json or .csv");
    process.exit(1);
  }

  if (!Array.isArray(incoming) || incoming.length === 0) {
    console.error("❌ No questions found in input file.");
    process.exit(1);
  }

  console.log(`📋 Loaded ${incoming.length} questions from ${path.basename(filePath)}`);

  // Group by category file
  const grouped = {};

  incoming.forEach((q, idx) => {
    const catSlug = targetCategory || (q.category || "general").toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    if (!grouped[catSlug]) grouped[catSlug] = [];

    // Ensure ID exists
    if (!q.id) {
      const prefix = catSlug.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7) || "Q";
      q.id = `${prefix}-${String(Date.now() + idx).slice(-6)}`;
    }

    if (!q.status) q.status = "review"; // Imported questions default to review status

    grouped[catSlug].push(q);
  });

  let totalAppended = 0;

  for (const [catSlug, qList] of Object.entries(grouped)) {
    const targetPath = path.join(qbDir, `${catSlug}.json`);
    let existing = [];
    if (fs.existsSync(targetPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(targetPath, "utf8"));
      } catch (e) {}
    }

    // Append without duplicate IDs
    const existingIds = new Set(existing.map(q => q.id));
    let addedForCat = 0;

    qList.forEach(newQ => {
      if (!existingIds.has(newQ.id)) {
        existing.push(newQ);
        existingIds.add(newQ.id);
        addedForCat++;
        totalAppended++;
      } else {
        console.warn(`  ⚠️ Skipped duplicate ID: ${newQ.id}`);
      }
    });

    fs.writeFileSync(targetPath, JSON.stringify(existing, null, 2), "utf8");
    console.log(`✓ Appended ${addedForCat} questions to question-bank/${catSlug}.json (Total: ${existing.length})`);
  }

  console.log("\n=================================================");
  console.log(`🎉 IMPORT COMPLETE: ${totalAppended} questions added.`);
  console.log("Run 'node tools/validate.js' to verify database integrity.");
  console.log("=================================================");
}

if (require.main === module) {
  const args = process.argv.slice(2);
  importQuestions(args[0], args[1]);
}

module.exports = { importQuestions };
