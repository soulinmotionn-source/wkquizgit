/**
 * WKQUIZ DATA PROVIDER LAYER
 * Abstraction layer between Quiz Engine and Question Bank.
 * Supports static JSON data, difficulty filtering, status filtering,
 * and is designed for future API/Database migration without UI changes.
 */

class WKQuizDataProvider {
  constructor(options = {}) {
    this.questions = [];
    this.categoriesMap = new Map();
    this.byIdMap = new Map();
    
    // Load initial question pool
    if (options.questions && Array.isArray(options.questions)) {
      this.loadQuestions(options.questions);
    } else if (typeof WKQUIZ_QUESTIONS !== "undefined" && Array.isArray(WKQUIZ_QUESTIONS)) {
      this.loadQuestions(WKQUIZ_QUESTIONS);
    }
  }

  /**
   * Load or append questions into the provider
   */
  loadQuestions(questionArray) {
    if (!Array.isArray(questionArray)) return;

    questionArray.forEach(q => {
      if (!q || !q.id) return;
      this.questions.push(q);
      this.byIdMap.set(q.id, q);

      const catKey = (q.category || "general").toLowerCase().trim();
      if (!this.categoriesMap.has(catKey)) {
        this.categoriesMap.set(catKey, []);
      }
      this.categoriesMap.get(catKey).push(q);
    });
  }

  /**
   * Get single question by its permanent ID
   * @param {string} id - e.g. "NCLEX-000001"
   */
  getQuestionById(id) {
    return this.byIdMap.get(id) || null;
  }

  /**
   * Main query method used by Quiz Engine
   * @param {Object} options - { category, difficulty, length, status, mode }
   * @returns {Object} { questions: Array, totalAvailable: number, requested: number, shortage: boolean, message: string }
   */
  getQuestions(options = {}) {
    const category = (options.category || "all").toLowerCase().trim();
    const difficulty = (options.difficulty || "all").toLowerCase().trim();
    const requestedLength = options.length || 10;
    const requiredStatus = (options.status || "active").toLowerCase().trim();

    // 1. Filter pool by category and status
    let pool = this.questions.filter(q => {
      // Status filter (strictly "active" for public gameplay)
      const qStatus = (q.status || "active").toLowerCase().trim();
      if (qStatus !== requiredStatus) return false;

      // Category filter
      if (category !== "all" && category !== "mixed-quiz") {
        const qCat = (q.category || "").toLowerCase().trim();
        const inTags = q.tags && q.tags.map(t => t.toLowerCase()).includes(category);
        if (qCat !== category && !inTags) return false;
      }

      return true;
    });

    // 2. Filter by Difficulty (EASY | MEDIUM | HARD)
    if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard") {
      const difficultyFiltered = pool.filter(q => (q.difficulty || "medium").toLowerCase().trim() === difficulty);
      // If we have questions for this difficulty, use them; otherwise keep existing pool
      if (difficultyFiltered.length > 0) {
        pool = difficultyFiltered;
      }
    }

    const totalAvailable = pool.length;
    const shortage = totalAvailable < requestedLength;
    let message = "";

    if (totalAvailable === 0) {
      message = `No active questions found for ${category.toUpperCase()} (${difficulty.toUpperCase()}).`;
    } else if (shortage) {
      message = `Requested ${requestedLength} questions, but only ${totalAvailable} unique ${difficulty.toUpperCase()} questions are currently available.`;
    }

    return {
      questions: pool,
      totalAvailable,
      requestedLength,
      shortage,
      message
    };
  }

  /**
   * Get category counts and difficulty breakdown
   */
  getStats() {
    const stats = {};
    this.questions.forEach(q => {
      const cat = (q.category || "General").trim();
      const diff = (q.difficulty || "medium").toLowerCase().trim();
      const status = (q.status || "active").toLowerCase().trim();

      if (!stats[cat]) {
        stats[cat] = { easy: 0, medium: 0, hard: 0, active: 0, review: 0, draft: 0, disabled: 0, total: 0 };
      }

      stats[cat].total++;
      if (stats[cat][diff] !== undefined) stats[cat][diff]++;
      if (stats[cat][status] !== undefined) stats[cat][status]++;
    });

    return stats;
  }

  /**
   * Get all active questions count for a specific category and difficulty
   */
  getAvailableCount(category = "all", difficulty = "all") {
    const result = this.getQuestions({ category, difficulty, length: 99999 });
    return result.totalAvailable;
  }
}

// CommonJS export for Node.js test runners & browser window exposure
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQuizDataProvider };
}
if (typeof window !== "undefined") {
  window.WKQuizDataProvider = WKQuizDataProvider;
}
