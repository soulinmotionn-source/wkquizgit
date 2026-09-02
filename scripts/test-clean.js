const fs = require("fs");

const files = ["src/config.js", "src/questions.js", "src/quiz-engine.js", "src/ui-controller.js"];

function cleanForBrowserOld(code) {
  return code
    .replace(/if\s*\(typeof module\s*!==\s*"undefined"[\s\S]*?}/g, "")
    .trim();
}

files.forEach(f => {
  const content = fs.readFileSync(f, "utf8");
  const cleaned = cleanForBrowserOld(content);
  try {
    new Function(cleaned);
    console.log(`✓ ${f} is valid`);
  } catch (err) {
    console.error(`❌ ${f} BROKEN by cleanForBrowser:`, err.message);
    console.log("End of cleaned code:\n" + cleaned.slice(-150));
  }
});
