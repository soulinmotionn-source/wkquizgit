const fs = require("fs");
const path = require("path");

const files = [
  "src/config.js",
  "src/questions.js",
  "src/quiz-engine.js",
  "src/ui-controller.js"
];

let fullBundle = files.map(f => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n\n");

// Add initial execution
fullBundle += `
document.addEventListener('DOMContentLoaded', function() {
  if (typeof WKQuizEngine !== 'undefined' && typeof WKQuizUI !== 'undefined') {
    var bank = typeof wkQuizBank !== 'undefined' ? wkQuizBank : new WKQuizQuestionBank(WKQUIZ_QUESTIONS);
    var engine = new WKQuizEngine({ bank: bank, config: WKQUIZ_CONFIG.quiz });
    window.wkQuizApp = new WKQuizUI(engine, WKQUIZ_CONFIG);
  }
});
`;

try {
  new Function(fullBundle);
  console.log("✓ Entire JS Bundle is 100% SYNTACTICALLY VALID and ready!");
} catch (err) {
  console.error("❌ Bundle syntax error:", err);
}
