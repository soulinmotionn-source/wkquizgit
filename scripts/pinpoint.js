const https = require("https");

https.get("https://iqtestwk.blogspot.com/", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    const scriptMatches = data.match(/<script[\s\S]*?<\/script>/gi) || [];
    let script2 = scriptMatches[2].replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
    script2 = script2.replace(/\/\/<!\[CDATA\[/g, "").replace(/\/\/\]\]>/g, "").replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();

    const lines = script2.split("\n");
    console.log("Total lines in script 2:", lines.length);

    // Let's test progressively line by line or find invalid syntax
    let accumulated = "";
    for (let i = 0; i < lines.length; i++) {
      accumulated += lines[i] + "\n";
      try {
        new Function(accumulated);
      } catch (err) {
        if (!err.message.includes("Unexpected end of input") && 
            !err.message.includes("missing }") && 
            !err.message.includes("Unexpected token '}'") &&
            !err.message.includes("missing )")) {
          console.log(`Error at line ${i + 1}: ${err.message}`);
          console.log(`Line ${i + 1} content: "${lines[i]}"`);
          console.log(`Context lines ${i - 3} to ${i + 3}:`);
          for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
            console.log(`  ${j + 1}: ${lines[j]}`);
          }
          break;
        }
      }
    }
  });
});
