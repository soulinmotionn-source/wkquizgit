/**
 * RUN USER BATCH IMPORT
 */

const fs = require("fs");
const path = require("path");
const { processBatch } = require("./import-user-batch");

// Load user provided JSON
const dataPath = path.join(__dirname, "data", "user-batch.json");
if (!fs.existsSync(dataPath)) {
  console.error("Missing data file: " + dataPath);
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
console.log(`Loaded ${rawData.length} items from ${dataPath}`);

const total = processBatch(rawData);
console.log(`Done! Question bank has ${total} total questions.`);
