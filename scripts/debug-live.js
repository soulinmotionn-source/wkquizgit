const https = require("https");

https.get("https://iqtestwk.blogspot.com/", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    console.log("Downloaded HTML length:", data.length);
    
    // Find all script tags
    const scriptMatches = data.match(/<script[\s\S]*?<\/script>/gi) || [];
    console.log("Total script tags:", scriptMatches.length);

    scriptMatches.forEach((s, idx) => {
      console.log(`\n=== SCRIPT ${idx} ===`);
      // Extract content
      let content = s.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
      // Remove CDATA markers
      content = content.replace(/\/\/<!\[CDATA\[/g, "").replace(/\/\/\]\]>/g, "").replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();
      
      console.log("Length:", content.length);
      console.log("First 150 chars:", content.substring(0, 150));
      console.log("Last 150 chars:", content.substring(content.length - 150));

      if (content.length > 500) {
        try {
          new Function(content);
          console.log("✓ JavaScript Syntax is VALID!");
        } catch (err) {
          console.error("❌ JavaScript Syntax ERROR:", err.message);
          // Let's pinpoint where
          console.error(err.stack);
        }
      }
    });

    // Check DOM elements in live HTML
    console.log("\n=== DOM ELEMENT CHECKS ===");
    console.log("wk-quiz-container exists:", data.includes('id="wk-quiz-container"') || data.includes("id='wk-quiz-container'"));
    console.log("wk-dark-toggle exists:", data.includes('id="wk-dark-toggle"') || data.includes("id='wk-dark-toggle'"));
    console.log("wk-categories-grid exists:", data.includes('id="wk-categories-grid"') || data.includes("id='wk-categories-grid'"));
    console.log("data-action='start-random' exists:", data.includes("start-random"));
  });
}).on("error", err => {
  console.error("Fetch failed:", err);
});
