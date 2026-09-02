const https = require("https");

https.get("https://iqtestwk.blogspot.com/?m=1", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    console.log("Mobile HTML length:", data.length);
    console.log("Is WKQuiz in HTML:", data.includes("WKQuiz") || data.includes("wk-header"));
    console.log("Is Legacy Blogger Mobile:", data.includes("mobile-header") || data.includes("mobile-index") || data.includes("Powered by Blogger"));
    console.log("\nTitle and Head snippet:");
    console.log(data.substring(0, 500));
  });
});
