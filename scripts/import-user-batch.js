/**
 * IMPORTER & VALIDATOR FOR USER-PROVIDED QUESTION BATCH
 * 
 * Validates, deduplicates, maps categories, and integrates user-provided questions
 * into the existing WKQuiz Question Bank.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");

// Slug map to match our config.js and existing category file naming
const categorySlugMap = {
  "nursing": "nursing",
  "nclex": "nclex",
  "medical": "medical",
  "medical terminology": "medical-terminology",
  "diseases & disorders": "diseases",
  "diseases and disorders": "diseases",
  "diseases": "diseases",
  "anatomy & physiology": "anatomy",
  "anatomy and physiology": "anatomy",
  "anatomy": "anatomy",
  "pharmacology": "pharmacology",
  "entertainment": "entertainment",
  "movies": "movies",
  "tv shows": "tv-shows",
  "tv-shows": "tv-shows",
  "drama": "drama",
  "celebrity": "celebrity",
  "music": "music",
  "general knowledge": "general-knowledge",
  "history": "history",
  "geography": "geography",
  "science": "science",
  "engineering": "engineering",
  "electrical": "electrical",
  "electrical symbols / items": "electrical-symbols",
  "electrical symbols": "electrical-symbols",
  "electronics": "electronics",
  "hvac": "hvac",
  "technology": "technology",
  "computers": "computers",
  "automotive": "automotive",
  "iq & logic": "iq-logic",
  "iq-logic": "iq-logic",
  "mathematics": "mathematics",
  "english": "english",
  "english & grammar": "english"
};

const prefixes = {
  "nclex": "NCLEX", "nursing": "NURS", "medical": "MED", "medical-terminology": "MEDTERM",
  "diseases": "DIS", "anatomy": "ANAT", "pharmacology": "PHARM", "hvac": "HVAC",
  "electrical": "ELEC", "electrical-symbols": "ELECSYM", "electronics": "ELX", "engineering": "ENG",
  "technology": "TECH", "computers": "COMP", "automotive": "AUTO", "iq-logic": "IQLOGIC",
  "mathematics": "MATH", "science": "SCI", "history": "HIST", "geography": "GEO",
  "english": "ENGL", "general-knowledge": "GENKNOW", "entertainment": "ENT", "movies": "MOV",
  "tv-shows": "TVSHOW", "drama": "DRAMA", "celebrity": "CELEB", "music": "MUSIC"
};

function normalizeSlug(catStr) {
  if (!catStr) return "general-knowledge";
  const lower = catStr.toLowerCase().trim();
  return categorySlugMap[lower] || lower.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Function to process and merge batch
function processBatch(incomingQuestions) {
  console.log(`\n=================================================`);
  console.log(`📥 PROCESSING ${incomingQuestions.length} INCOMING QUESTIONS`);
  console.log(`=================================================`);

  // 1. Validation phase
  let validIncoming = 0;
  let validationErrors = 0;

  const sanitized = [];
  const incomingIds = new Set();

  incomingQuestions.forEach((q, idx) => {
    const errors = [];
    if (!q.question || typeof q.question !== "string" || q.question.trim().length === 0) {
      errors.push("Missing question text");
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Options must contain exactly 4 items (found ${q.options ? q.options.length : 0})`);
    } else {
      q.options.forEach((opt, oIdx) => {
        if (!opt || typeof opt !== "string" || opt.trim().length === 0) {
          errors.push(`Option ${oIdx} is empty`);
        }
      });
    }
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer > 3 || !Number.isInteger(q.answer)) {
      errors.push(`Answer index must be integer 0..3 (found ${q.answer})`);
    }
    const diff = (q.difficulty || "").toLowerCase().trim();
    if (!["easy", "medium", "hard"].includes(diff)) {
      errors.push(`Difficulty must be easy, medium, or hard (found ${q.difficulty})`);
    }
    if (!q.category || typeof q.category !== "string") {
      errors.push("Missing category");
    }
    if (!q.explanation || typeof q.explanation !== "string" || q.explanation.trim().length === 0) {
      errors.push("Missing explanation");
    }

    if (errors.length > 0) {
      validationErrors++;
      console.warn(`⚠️ Validation Error in incoming question #${idx + 1} (${q.id || 'NO-ID'}):`, errors.join("; "));
    } else {
      validIncoming++;
      sanitized.push({
        id: q.id,
        category: q.category.trim(),
        subcategory: q.subcategory || q.category.trim(),
        difficulty: diff,
        question: q.question.trim(),
        options: q.options.map(o => o.trim()),
        answer: q.answer,
        explanation: q.explanation.trim(),
        tags: [normalizeSlug(q.category), ...(Array.isArray(q.tags) ? q.tags : [])],
        status: "active"
      });
    }
  });

  console.log(`✓ Scanned ${incomingQuestions.length} incoming items: ${validIncoming} valid, ${validationErrors} errors.`);

  // 2. Load current Question Bank
  const currentBank = {};
  const currentFiles = fs.readdirSync(qbDir).filter(f => f.endsWith(".json"));
  currentFiles.forEach(file => {
    const slug = file.replace(".json", "");
    try {
      currentBank[slug] = JSON.parse(fs.readFileSync(path.join(qbDir, file), "utf8"));
    } catch (e) {
      currentBank[slug] = [];
    }
  });

  // Track all existing IDs and question texts for duplicate detection
  const existingIds = new Set();
  const existingQuestionTexts = new Map(); // text.toLowerCase() -> { id, slug }

  Object.entries(currentBank).forEach(([slug, qList]) => {
    qList.forEach(q => {
      existingIds.add(q.id);
      const textKey = q.question.trim().toLowerCase();
      existingQuestionTexts.set(textKey, { id: q.id, slug });
    });
  });

  // 3. Merge sanitized questions
  let addedCount = 0;
  let skippedDuplicates = 0;
  let idRenamedCount = 0;

  sanitized.forEach(q => {
    const slug = normalizeSlug(q.category);
    if (!currentBank[slug]) {
      currentBank[slug] = [];
    }

    const textKey = q.question.toLowerCase();
    if (existingQuestionTexts.has(textKey)) {
      const match = existingQuestionTexts.get(textKey);
      skippedDuplicates++;
      return; // Exact duplicate question already in bank
    }

    // Ensure ID uniqueness
    let finalId = q.id;
    if (!finalId || existingIds.has(finalId)) {
      const prefix = prefixes[slug] || slug.toUpperCase().slice(0, 6);
      const diffTag = q.difficulty.toUpperCase();
      let seq = currentBank[slug].length + 1;
      finalId = `${prefix}-${diffTag}-${String(seq).padStart(4, "0")}`;
      while (existingIds.has(finalId)) {
        seq++;
        finalId = `${prefix}-${diffTag}-${String(seq).padStart(4, "0")}`;
      }
      idRenamedCount++;
    }

    q.id = finalId;
    existingIds.add(finalId);
    existingQuestionTexts.set(textKey, { id: finalId, slug });
    currentBank[slug].push(q);
    addedCount++;
  });

  console.log(`\n=================================================`);
  console.log(`📊 MERGE SUMMARY:`);
  console.log(`  - Newly Added Questions : ${addedCount}`);
  console.log(`  - Skipped Duplicates    : ${skippedDuplicates}`);
  console.log(`  - Re-indexed IDs        : ${idRenamedCount}`);
  console.log(`=================================================`);

  // 4. Save all files
  let grandTotal = 0;
  for (const [slug, qList] of Object.entries(currentBank)) {
    const filePath = path.join(qbDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(qList, null, 2), "utf8");
    grandTotal += qList.length;
  }

  console.log(`\n🎉 Question Bank successfully updated! Total active questions: ${grandTotal}`);
  return grandTotal;
}

module.exports = { processBatch, normalizeSlug };
