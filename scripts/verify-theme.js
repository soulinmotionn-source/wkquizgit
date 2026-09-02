const fs = require("fs");
const themeXml = fs.readFileSync("theme.xml", "utf8");

// Extract JavaScript from CDATA
const scriptRegex = /<script type='text\/javascript'>\s*\/\/<!\[CDATA\[([\s\S]*?)\/\/\]\]>\s*<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(themeXml)) !== null) {
  count++;
  const js = match[1];
  console.log(`Checking script ${count} (length ${js.length})...`);
  try {
    new Function(js);
    console.log(`✓ Script ${count} syntax is 100% VALID!`);
  } catch (err) {
    console.error(`❌ Script ${count} syntax error:`, err);
    process.exit(1);
  }
}

console.log("\n🎉 ALL THEME SCRIPTS VALIDATED SUCCESSFULLY!");
