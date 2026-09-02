/**
 * WKQUIZ QUESTION COUNT & STATISTICS REPORT
 * Scans question-bank/ and displays category breakdowns by difficulty and status.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");

function generateStats() {
  console.log("==========================================================================================");
  console.log("📊 WKQUIZ QUESTION BANK STATISTICS & COUNT REPORT");
  console.log("==========================================================================================\n");

  const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json"));
  const rows = [];
  const totals = { easy: 0, medium: 0, hard: 0, active: 0, review: 0, draft: 0, disabled: 0, total: 0 };

  files.forEach(file => {
    const raw = fs.readFileSync(path.join(qbDir, file), "utf8");
    try {
      const questions = JSON.parse(raw);
      if (Array.isArray(questions)) {
        const catName = questions.length > 0 ? (questions[0].category || file.replace(".json", "")) : file.replace(".json", "");
        const stat = { name: catName, easy: 0, medium: 0, hard: 0, active: 0, review: 0, draft: 0, disabled: 0, total: questions.length };

        questions.forEach(q => {
          const diff = (q.difficulty || "medium").toLowerCase().trim();
          const st = (q.status || "active").toLowerCase().trim();

          if (stat[diff] !== undefined) stat[diff]++;
          if (stat[st] !== undefined) stat[st]++;

          if (totals[diff] !== undefined) totals[diff]++;
          if (totals[st] !== undefined) totals[st]++;
          totals.total++;
        });

        rows.push(stat);
      }
    } catch (e) {}
  });

  // Sort rows alphabetically by category name
  rows.sort((a, b) => a.name.localeCompare(b.name));

  // Print Header
  console.log(
    "Category".padEnd(26) +
    "Easy".padStart(7) +
    "Medium".padStart(9) +
    "Hard".padStart(7) +
    "Active".padStart(9) +
    "Review".padStart(9) +
    "Draft".padStart(8) +
    "Total".padStart(8)
  );
  console.log("-".repeat(90));

  rows.forEach(r => {
    console.log(
      r.name.padEnd(26) +
      String(r.easy).padStart(7) +
      String(r.medium).padStart(9) +
      String(r.hard).padStart(7) +
      String(r.active).padStart(9) +
      String(r.review).padStart(9) +
      String(r.draft).padStart(8) +
      String(r.total).padStart(8)
    );
  });

  console.log("=".repeat(90));
  console.log(
    "TOTALS".padEnd(26) +
    String(totals.easy).padStart(7) +
    String(totals.medium).padStart(9) +
    String(totals.hard).padStart(7) +
    String(totals.active).padStart(9) +
    String(totals.review).padStart(9) +
    String(totals.draft).padStart(8) +
    String(totals.total).padStart(8)
  );
  console.log("==========================================================================================\n");
}

if (require.main === module) {
  generateStats();
}

module.exports = { generateStats };
