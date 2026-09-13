/**
 * WKQUIZ DATA PROVIDER LAYER
 * Abstraction layer between Quiz Engine and Question Bank.
 * Supports on-demand Git/CDN fetching, local caching, static JSON data,
 * strict category + 3-difficulty filtering, and real-time accurate count reporting.
 */

class WKQuizDataProvider {
  constructor(options = {}) {
    this.questions = [];
    this.categoriesMap = new Map();
    this.byIdMap = new Map();
    this.loadedCategories = new Set();
    this.categoryIndex = new Map();
    this.config = (options.config && options.config.questionBank) || (typeof WKQUIZ_CONFIG !== "undefined" && WKQUIZ_CONFIG.questionBank) || {};

    // Load lightweight index if available (keeps theme.xml small while providing instant count stats)
    if (typeof WKQUIZ_INDEX !== "undefined" && WKQUIZ_INDEX.categories) {
      this.loadIndex(WKQUIZ_INDEX);
    }

    // Load initial question pool if passed or globally defined
    if (options.questions && Array.isArray(options.questions)) {
      this.loadQuestions(options.questions);
    } else if (typeof WKQUIZ_QUESTIONS !== "undefined" && Array.isArray(WKQUIZ_QUESTIONS) && WKQUIZ_QUESTIONS.length > 0) {
      this.loadQuestions(WKQUIZ_QUESTIONS);
    }
  }

  /**
   * Load metadata index of category question counts
   */
  loadIndex(indexData) {
    if (!indexData || !indexData.categories) return;
    Object.entries(indexData.categories).forEach(([catSlug, stats]) => {
      this.categoryIndex.set(catSlug.toLowerCase().trim(), stats);
    });
  }

  /**
   * Load or append questions into the provider
   */
  loadQuestions(questionArray) {
    if (!Array.isArray(questionArray)) return;

    questionArray.forEach(q => {
      if (!q || !q.id || this.byIdMap.has(q.id)) return;
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
   * Fetch category questions dynamically from Git/CDN/Local storage
   * @param {string} categorySlug - e.g. "nursing", "nclex"
   * @returns {Promise<Array>} Array of questions loaded
   */
  async fetchCategory(categorySlug) {
    if (!categorySlug) return [];
    let slug = categorySlug.toLowerCase().trim();

    if (slug === "all") {
      slug = "mixed-quiz";
    }

    const aliasMap = {
      "anatomy": "anatomy-physiology",
      "diseases": "diseases-disorders",
      "electrical-symbols": "electrical-symbols-items",
      "english-grammar": "english"
    };
    if (aliasMap[slug]) slug = aliasMap[slug];

    // Return immediately if already loaded in memory
    if (this.loadedCategories.has(slug)) {
      return this.categoriesMap.get(slug) || [];
    }

    // 1. Check LocalStorage Cache (with TTL check)
    const cacheKey = `wk_qb_${slug}`;
    const cacheTtlMs = (this.config.cacheTtlMinutes || 120) * 60 * 1000;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          if (parsedCache && parsedCache.timestamp && (Date.now() - parsedCache.timestamp < cacheTtlMs) && Array.isArray(parsedCache.data)) {
            this.loadQuestions(parsedCache.data);
            this.loadedCategories.add(slug);
            return parsedCache.data;
          }
        }
      }
    } catch (e) {
      console.warn(`[WKQuiz] LocalStorage cache read failed for ${slug}:`, e);
    }

    // 2. Fetch from Git / CDN / Local endpoint
    const urls = [];
    
    // Check local / same-origin question-bank first (for Cloudflare Pages, custom domains, and local previews)
    urls.push(`question-bank/${slug}.json`);
    urls.push(`/question-bank/${slug}.json`);
    urls.push(`../question-bank/${slug}.json`);

    if (this.config.cdnBaseUrl) {
      urls.push(`${this.config.cdnBaseUrl}/${slug}.json`);
    }
    if (this.config.githubRawBaseUrl) {
      urls.push(`${this.config.githubRawBaseUrl}/${slug}.json`);
    }
    
    // Explicit fallbacks for main and master branches of user's repository
    urls.push(`https://cdn.jsdelivr.net/gh/soulinmotionn-source/wkquizgit@main/question-bank/${slug}.json`);
    urls.push(`https://raw.githubusercontent.com/soulinmotionn-source/wkquizgit/main/question-bank/${slug}.json`);
    urls.push(`https://cdn.jsdelivr.net/gh/soulinmotionn-source/wkquizgit@master/question-bank/${slug}.json`);
    urls.push(`https://raw.githubusercontent.com/soulinmotionn-source/wkquizgit/master/question-bank/${slug}.json`);

    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: "default" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            this.loadQuestions(data);
            this.loadedCategories.add(slug);

            // Save to LocalStorage cache
            try {
              if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
              }
            } catch (ce) {}

            return data;
          }
        }
      } catch (err) {
        // Try next URL fallback
      }
    }

    console.warn(`[WKQuiz] Note: Using baseline questions for category "${slug}"`);
    return this.categoriesMap.get(slug) || [];
  }

  /**
   * Get single question by its permanent ID
   * @param {string} id - e.g. "NCLEX-000001"
   */
  getQuestionById(id) {
    return this.byIdMap.get(id) || null;
  }

  /**
   * Main query method used by Quiz Engine & UI Controller
   * @param {Object} options - { category, difficulty, length, status, mode }
   * @returns {Object} { questions: Array, totalAvailable: number, requestedLength: number, shortage: boolean, message: string }
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

      // Category filter with clean slug normalization
      if (category !== "all" && category !== "mixed-quiz") {
        const qCatNorm = (q.category || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const targetCatNorm = category.replace(/[^a-z0-9]/g, "");
        const inTags = q.tags && q.tags.some(t => t.toLowerCase().replace(/[^a-z0-9]/g, "") === targetCatNorm);
        if (!qCatNorm.includes(targetCatNorm) && !targetCatNorm.includes(qCatNorm) && !inTags) return false;
      }

      return true;
    });

    // 2. Strict Difficulty Filter (EASY | MEDIUM | HARD) — ZERO FALLBACK ACROSS DIFFICULTIES
    if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard") {
      pool = pool.filter(q => (q.difficulty || "medium").toLowerCase().trim() === difficulty);
    }

    const totalAvailable = pool.length;
    const shortage = totalAvailable < requestedLength;
    let message = "";

    if (totalAvailable === 0) {
      message = `No active questions found for ${category.toUpperCase()} (${difficulty.toUpperCase()}).`;
    } else if (shortage) {
      message = `Only ${totalAvailable} unique ${difficulty.toUpperCase()} questions are currently available for this category.`;
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
   * Get exact active questions count for a specific category and difficulty
   * @param {string} category - Category slug or "all"
   * @param {string} difficulty - "easy" | "medium" | "hard" | "all"
   * @returns {number} Exact number of active questions
   */
  getAvailableCount(category = "all", difficulty = "all") {
    const catKey = (category || "all").toLowerCase().trim();
    const diffKey = (difficulty || "all").toLowerCase().trim();

    // If 'all' is requested, calculate total across all indexed categories
    if (catKey === "all") {
      if (this.categoryIndex.size > 0) {
        let total = 0;
        this.categoryIndex.forEach(stats => {
          if (diffKey === "easy") total += (stats.easy || 0);
          else if (diffKey === "medium") total += (stats.medium || 0);
          else if (diffKey === "hard") total += (stats.hard || 0);
          else total += (stats.total || 0);
        });
        if (total > 0) return total;
      }
      if (this.questions.length > 0) {
        const result = this.getQuestions({
          category: "all",
          difficulty: diffKey,
          length: 999999,
          status: "active"
        });
        return result.totalAvailable;
      }
      // Baseline fallbacks if index not yet loaded
      if (diffKey === "easy") return 1714;
      if (diffKey === "medium") return 1711;
      if (diffKey === "hard") return 1575;
      return 5000;
    }

    const aliasMap = {
      "anatomy": "anatomy-physiology",
      "diseases": "diseases-disorders",
      "electrical-symbols": "electrical-symbols-items",
      "english-grammar": "english",
      "mixed": "mixed-quiz"
    };
    const resolvedCat = aliasMap[catKey] || catKey;

    // Check pre-compiled lightweight index for instant count
    if (this.categoryIndex.has(resolvedCat)) {
      const stats = this.categoryIndex.get(resolvedCat);
      if (diffKey === "easy") return stats.easy || 0;
      if (diffKey === "medium") return stats.medium || 0;
      if (diffKey === "hard") return stats.hard || 0;
      return stats.total || 0;
    }

    // If questions are already loaded in memory, count directly
    if (this.questions.length > 0 && this.loadedCategories.has(resolvedCat)) {
      const result = this.getQuestions({
        category: resolvedCat,
        difficulty: diffKey,
        length: 999999,
        status: "active"
      });
      return result.totalAvailable;
    }

    return 0;
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
}

// CommonJS export for Node.js test runners & browser window exposure
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQuizDataProvider };
}
if (typeof window !== "undefined") {
  window.WKQuizDataProvider = WKQuizDataProvider;
}
