/**
 * QUESTION GENERATOR UTILITY
 * Common helper for generating and inserting verified questions into question-bank/
 */
const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "..", "question-bank");

// Load all existing question IDs and texts to ensure global uniqueness
const globalSeenIds = new Set();
const globalSeenTexts = new Set();

const files = fs.readdirSync(qbDir).filter(f => f.endsWith(".json") && f !== "index.json");
const categoryFilesData = {};

files.forEach(file => {
  const filePath = path.join(qbDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    categoryFilesData[file] = data;
    data.forEach(q => {
      if (q.id) globalSeenIds.add(q.id.trim().toUpperCase());
      if (q.question) globalSeenTexts.add(q.question.trim().toLowerCase());
    });
  } catch (err) {
    categoryFilesData[file] = [];
  }
});

const defaultPrefixes = {
  "anatomy-physiology.json": "ANAT",
  "automotive.json": "AUTO",
  "celebrity.json": "CELEB",
  "computers.json": "COMP",
  "diseases-disorders.json": "DIS",
  "drama.json": "DRAMA",
  "electrical-symbols-items.json": "ELECSYM",
  "electrical.json": "ELEC",
  "electronics.json": "ELX",
  "engineering.json": "ENG",
  "english.json": "ENGL",
  "entertainment.json": "ENT",
  "general-knowledge.json": "GENKNOW",
  "geography.json": "GEO",
  "history.json": "HIST",
  "hvac.json": "HVAC",
  "iq-logic.json": "IQLOGIC",
  "mathematics.json": "MATH",
  "medical-terminology.json": "MEDTERM",
  "medical.json": "MED",
  "mixed-quiz.json": "MIXED",
  "movies.json": "MOV",
  "music.json": "MUSIC",
  "nclex.json": "NCLEX",
  "nursing.json": "NURS",
  "pharmacology.json": "PHARM",
  "science.json": "SCI",
  "technology.json": "TECH",
  "tv-shows.json": "TVSHOW"
};

const categoryDisplayNames = {
  "anatomy-physiology.json": "Anatomy & Physiology",
  "automotive.json": "Automotive",
  "celebrity.json": "Celebrity",
  "computers.json": "Computers",
  "diseases-disorders.json": "Diseases & Disorders",
  "drama.json": "Drama",
  "electrical-symbols-items.json": "Electrical Symbols",
  "electrical.json": "Electrical",
  "electronics.json": "Electronics",
  "engineering.json": "Engineering",
  "english.json": "English & Grammar",
  "entertainment.json": "Entertainment",
  "general-knowledge.json": "General Knowledge",
  "geography.json": "Geography",
  "history.json": "History",
  "hvac.json": "HVAC",
  "iq-logic.json": "IQ & Logic",
  "mathematics.json": "Mathematics",
  "medical-terminology.json": "Medical Terminology",
  "medical.json": "Medical",
  "mixed-quiz.json": "mixed",
  "movies.json": "Movies",
  "music.json": "Music",
  "nclex.json": "NCLEX",
  "nursing.json": "Nursing",
  "pharmacology.json": "Pharmacology",
  "science.json": "Science",
  "technology.json": "Technology",
  "tv-shows.json": "TV Shows"
};

function generateUniqueId(prefix) {
  let counter = 1;
  while (true) {
    const candidate = `${prefix}-${String(counter).padStart(6, "0")}`;
    if (!globalSeenIds.has(candidate.toUpperCase())) {
      globalSeenIds.add(candidate.toUpperCase());
      return candidate;
    }
    counter++;
  }
}

/**
 * Adds questions to a category file
 * @param {string} fileName - e.g. "automotive.json"
 * @param {Array<Object>} newQuestions - list of question definitions
 */
function addQuestionsToCategory(fileName, newQuestions) {
  if (!categoryFilesData[fileName]) {
    categoryFilesData[fileName] = [];
  }
  const targetArray = categoryFilesData[fileName];
  const prefix = defaultPrefixes[fileName] || "WKQ";
  const defaultCategory = categoryDisplayNames[fileName] || "General Knowledge";
  let addedCount = 0;

  newQuestions.forEach(qDef => {
    const cleanQText = (qDef.question || "").trim();
    if (!cleanQText) return;
    if (globalSeenTexts.has(cleanQText.toLowerCase())) {
      return; // Skip duplicate question text
    }

    if (!Array.isArray(qDef.options) || qDef.options.length !== 4) {
      console.warn(`[WARN] Skipping question without 4 options: "${cleanQText.slice(0, 30)}..."`);
      return;
    }

    const answerIdx = typeof qDef.answer === "number" ? qDef.answer : 0;
    if (answerIdx < 0 || answerIdx > 3) {
      console.warn(`[WARN] Skipping question with invalid answer index: "${cleanQText.slice(0, 30)}..."`);
      return;
    }

    const diff = (qDef.difficulty || "medium").toLowerCase();
    if (!["easy", "medium", "hard"].includes(diff)) {
      console.warn(`[WARN] Invalid difficulty "${diff}" on: "${cleanQText.slice(0, 30)}..."`);
      return;
    }

    const id = qDef.id || generateUniqueId(prefix);
    globalSeenIds.add(id.toUpperCase());
    globalSeenTexts.add(cleanQText.toLowerCase());

    const questionObj = {
      id,
      category: qDef.category || defaultCategory,
      subcategory: qDef.subcategory || defaultCategory,
      difficulty: diff,
      question: cleanQText,
      options: qDef.options.map(opt => String(opt).trim()),
      answer: answerIdx,
      explanation: (qDef.explanation || "").trim() || `The correct answer is "${qDef.options[answerIdx]}".`,
      tags: Array.isArray(qDef.tags) ? qDef.tags : [prefix.toLowerCase(), diff],
      status: "active"
    };

    targetArray.push(questionObj);
    addedCount++;
  });

  return addedCount;
}

function saveCategoryFile(fileName) {
  if (!categoryFilesData[fileName]) return;
  const filePath = path.join(qbDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(categoryFilesData[fileName], null, 2), "utf8");
}

function saveAllCategoryFiles() {
  Object.keys(categoryFilesData).forEach(fileName => {
    saveCategoryFile(fileName);
  });
}

function getCategoryCount(fileName) {
  return (categoryFilesData[fileName] || []).length;
}

function getTotalQuestionCount() {
  return Object.values(categoryFilesData).reduce((sum, arr) => sum + arr.length, 0);
}

module.exports = {
  addQuestionsToCategory,
  saveCategoryFile,
  saveAllCategoryFiles,
  getCategoryCount,
  getTotalQuestionCount,
  categoryFilesData
};
