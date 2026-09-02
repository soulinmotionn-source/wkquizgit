const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\Waqas\\.gemini\\antigravity\\brain\\05d1952e-7d5f-4a41-a920-000f17be7d5e\\.system_generated\\logs\\transcript_full.jsonl';
if (!fs.existsSync(transcriptPath)) {
  console.error('Transcript file not found at:', transcriptPath);
  process.exit(1);
}

const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
console.log('Total transcript lines:', lines.length);

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  if (line.includes('NURSING-EASY-001-1')) {
    const obj = JSON.parse(line);
    let content = obj.content;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    console.log('Found matching step, index:', obj.step_index);
    
    // Find the opening bracket [ and closing bracket ]
    const startIdx = content.indexOf('[{');
    const endIdx = content.lastIndexOf('}]');
    if (startIdx !== -1 && endIdx !== -1) {
      const jsonStr = content.substring(startIdx, endIdx + 2);
      try {
        const jsonArr = JSON.parse(jsonStr);
        console.log('Successfully extracted and parsed JSON array with', jsonArr.length, 'questions!');
        const outDir = path.join(__dirname, 'data');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const outPath = path.join(outDir, 'user-batch.json');
        fs.writeFileSync(outPath, JSON.stringify(jsonArr, null, 2), 'utf8');
        console.log('Saved to', outPath);
        process.exit(0);
      } catch (err) {
        console.error('JSON parse error:', err.message);
      }
    }
  }
}

console.error('Could not find batch in transcript');
