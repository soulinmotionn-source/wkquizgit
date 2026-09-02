/**
 * WKQUIZ ENGINE
 * Pure Vanilla JavaScript Quiz Engine.
 * Handles state management, unbiased Fisher-Yates shuffling with option remapping,
 * strict session duplicate prevention, timer, scoring, and deterministic Daily Quiz generator.
 * Decoupled from storage via Data Provider layer.
 */

class WKQuizEngine {
  constructor(options = {}) {
    this.config = Object.assign({
      defaultLength: 10,
      availableLengths: [5, 10, 20, 50],
      availableDifficulties: ["easy", "medium", "hard"],
      timePerQuestionSeconds: 20,
      enableAnswerShuffle: true,
      enableQuestionShuffle: true,
      preventSessionDuplicates: true,
      passingScorePercentage: 70
    }, options.config || (typeof WKQUIZ_CONFIG !== "undefined" ? WKQUIZ_CONFIG.quiz : {}));

    // Data Provider interface
    if (options.provider) {
      this.provider = options.provider;
    } else if (typeof WKQuizDataProvider !== "undefined") {
      this.provider = new WKQuizDataProvider();
    } else {
      this.provider = null;
    }

    // Runtime state (initially null until a quiz is started)
    this.sessionUsedIds = new Set();
    this.currentQuiz = null;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.mode = null;
    this.category = null;
    this.difficulty = null;
    this.shortageNotice = "";
    this.startTime = null;
    this.endTime = null;

    // Timer variables
    this.timerInterval = null;
    this.timeRemaining = 0;
    this.onTick = null;
    this.onTimeExpired = null;

    this._loadSessionStorage();
  }

  _loadSessionStorage() {
    if (typeof sessionStorage !== "undefined") {
      try {
        const stored = sessionStorage.getItem("wkquiz_used_ids");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            parsed.forEach(id => this.sessionUsedIds.add(id));
          }
        }
      } catch (e) {}
    }
  }

  _saveSessionStorage() {
    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.setItem("wkquiz_used_ids", JSON.stringify([...this.sessionUsedIds]));
      } catch (e) {}
    }
  }

  /**
   * Mulberry32 Deterministic PRNG for Daily Quiz
   */
  _mulberry32(seed) {
    return function() {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  /**
   * Standard Unbiased Fisher-Yates Array Shuffle
   */
  _shuffleArray(array, customRng = Math.random) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(customRng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Shuffle options of a question while preserving the exact correct answer pointer
   */
  _shuffleQuestionOptions(question, customRng = Math.random) {
    const originalOptions = question.options;
    const correctOptionText = originalOptions[question.answer];

    const indexed = originalOptions.map((text, idx) => ({ text, isCorrect: idx === question.answer }));
    const shuffled = this._shuffleArray(indexed, customRng);

    const newOptions = shuffled.map(item => item.text);
    const newAnswerIndex = shuffled.findIndex(item => item.isCorrect);

    return Object.assign({}, question, {
      options: newOptions,
      answer: newAnswerIndex,
      _originalAnswerText: correctOptionText
    });
  }

  /**
   * Prepare questions for a new quiz session
   * @param {Object} params - { category, difficulty, length, mode }
   */
  startQuiz(params = {}) {
    const mode = params.mode || "classic";
    const category = params.category || "all";
    const difficulty = params.difficulty || "medium";
    let length = params.length || this.config.defaultLength || 10;

    if (mode === "quick") length = 5;
    else if (mode === "classic" && !params.length) length = 10;
    else if (mode === "challenge") length = 20;
    else if (mode === "exam") length = 50;

    this.mode = mode;
    this.category = category;
    this.difficulty = difficulty;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.shortageNotice = "";
    this.startTime = Date.now();
    this.endTime = null;
    this.stopTimer();

    if (!this.provider) {
      throw new Error("No Data Provider configured for Quiz Engine");
    }

    let pool = [];

    if (mode === "daily") {
      // Deterministic Daily Quiz based on today's UTC date
      const todayStr = new Date().toISOString().slice(0, 10);
      const seed = this._hashString("WKQUIZ_DAILY_" + todayStr);
      const rng = this._mulberry32(seed);

      const queryResult = this.provider.getQuestions({ category: "all", difficulty: "all", status: "active" });
      const allActive = queryResult.questions;

      if (allActive.length === 0) {
        throw new Error("Question bank is empty");
      }

      const shuffledDaily = this._shuffleArray(allActive, rng);
      const selected = shuffledDaily.slice(0, Math.min(length, shuffledDaily.length));

      pool = selected.map(q => this._shuffleQuestionOptions(q, rng));
    } else {
      // Strict category + difficulty query (No Cross-Difficulty Fallback!)
      const queryResult = this.provider.getQuestions({
        category,
        difficulty,
        length,
        status: "active"
      });

      const available = queryResult.questions;

      if (available.length === 0) {
        throw new Error(`No active questions available for "${category}" (${difficulty.toUpperCase()}).`);
      }

      // Session duplicate prevention
      let candidatePool = available;
      if (this.config.preventSessionDuplicates) {
        const unused = available.filter(q => !this.sessionUsedIds.has(q.id));
        if (unused.length >= length) {
          candidatePool = unused;
        } else if (unused.length > 0) {
          candidatePool = unused;
          this.sessionUsedIds.clear();
          this._saveSessionStorage();
        } else {
          this.sessionUsedIds.clear();
          this._saveSessionStorage();
          candidatePool = available;
        }
      }

      // Shortage notice if pool has fewer questions than requested (NEVER DUPLICATE QUESTIONS!)
      if (candidatePool.length < length) {
        this.shortageNotice = `Note: Only ${candidatePool.length} active unique questions available for ${category.toUpperCase()} (${difficulty.toUpperCase()}).`;
      }

      const shuffledQuestions = this.config.enableQuestionShuffle 
        ? this._shuffleArray(candidatePool) 
        : [...candidatePool];

      const selected = shuffledQuestions.slice(0, Math.min(length, shuffledQuestions.length));

      // Assert uniqueness
      const uniqueCheck = new Set(selected.map(q => q.id));
      if (uniqueCheck.size !== selected.length) {
        throw new Error("Duplicate questions detected in quiz generation!");
      }

      selected.forEach(q => this.sessionUsedIds.add(q.id));
      this._saveSessionStorage();

      pool = selected.map(q => {
        return this.config.enableAnswerShuffle 
          ? this._shuffleQuestionOptions(q) 
          : Object.assign({}, q);
      });
    }

    this.currentQuiz = {
      id: `quiz_${Date.now()}`,
      mode,
      category,
      difficulty,
      requestedLength: length,
      totalQuestions: pool.length,
      shortageNotice: this.shortageNotice,
      questions: pool
    };

    return this.getCurrentQuestion();
  }

  getCurrentQuestion() {
    if (!this.currentQuiz || this.currentIndex >= this.currentQuiz.questions.length) {
      return null;
    }

    const q = this.currentQuiz.questions[this.currentIndex];
    return {
      index: this.currentIndex,
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.currentQuiz.totalQuestions,
      id: q.id,
      category: q.category,
      subcategory: q.subcategory || "",
      difficulty: q.difficulty || "medium",
      question: q.question,
      options: [...q.options],
      progressPercentage: Math.round(((this.currentIndex) / this.currentQuiz.totalQuestions) * 100),
      mode: this.mode,
      shortageNotice: this.shortageNotice
    };
  }

  submitAnswer(selectedOptionIndex) {
    if (!this.currentQuiz || this.isCompleted) {
      throw new Error("No active quiz in progress");
    }

    const currentQ = this.currentQuiz.questions[this.currentIndex];
    const isCorrect = selectedOptionIndex === currentQ.answer;

    if (isCorrect) {
      this.score++;
      this.streak++;
      if (this.streak > this.maxStreak) {
        this.maxStreak = this.streak;
      }
    } else {
      this.streak = 0;
    }

    const answerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      options: currentQ.options,
      selectedIndex: selectedOptionIndex,
      selectedOptionText: selectedOptionIndex !== null && selectedOptionIndex !== undefined ? currentQ.options[selectedOptionIndex] : "Timed Out / Skipped",
      correctIndex: currentQ.answer,
      correctOptionText: currentQ.options[currentQ.answer],
      isCorrect,
      explanation: currentQ.explanation || "No additional explanation provided."
    };

    this.userAnswers.push(answerRecord);

    const isSurvivalOver = (this.mode === "survival" && !isCorrect);
    const hasNext = (this.currentIndex + 1 < this.currentQuiz.totalQuestions) && !isSurvivalOver;

    return {
      isCorrect,
      correctIndex: currentQ.answer,
      selectedIndex: selectedOptionIndex,
      explanation: currentQ.explanation || "No additional explanation provided.",
      score: this.score,
      streak: this.streak,
      hasNext,
      isSurvivalOver,
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.currentQuiz.totalQuestions
    };
  }

  nextQuestion() {
    if (!this.currentQuiz) return null;

    this.currentIndex++;
    if (this.currentIndex >= this.currentQuiz.totalQuestions) {
      this.finishQuiz();
      return null;
    }

    return this.getCurrentQuestion();
  }

  finishQuiz() {
    this.isCompleted = true;
    this.endTime = Date.now();
    this.stopTimer();

    const total = this.currentQuiz ? this.currentQuiz.totalQuestions : this.userAnswers.length;
    const percentage = total > 0 ? Math.round((this.score / total) * 100) : 0;
    const timeSpentSeconds = this.startTime ? Math.round((this.endTime - this.startTime) / 1000) : 0;

    let badge = "Novice";
    let message = "Good effort! Keep practicing to sharpen your knowledge.";

    if (percentage === 100) {
      badge = "Grandmaster 🏆";
      message = "Flawless victory! You scored 100% with absolute mastery.";
    } else if (percentage >= 90) {
      badge = "Expert 🌟";
      message = "Outstanding performance! You possess elite subject knowledge.";
    } else if (percentage >= 75) {
      badge = "Scholar 🎓";
      message = "Great job! You demonstrated solid understanding and skill.";
    } else if (percentage >= 50) {
      badge = "Apprentice 📖";
      message = "Decent start! Review the explanations and challenge yourself again.";
    } else {
      badge = "Explorer 🧭";
      message = "Every expert was once a beginner. Keep exploring and try again!";
    }

    return {
      quizId: this.currentQuiz ? this.currentQuiz.id : "",
      mode: this.mode,
      category: this.currentQuiz ? this.currentQuiz.category : "all",
      difficulty: this.difficulty,
      score: this.score,
      totalQuestions: total,
      percentage,
      passed: percentage >= this.config.passingScorePercentage,
      timeSpentSeconds,
      maxStreak: this.maxStreak,
      badge,
      message,
      answersSummary: [...this.userAnswers]
    };
  }

  startTimer(durationSeconds, onTick, onTimeExpired) {
    this.stopTimer();
    this.timeRemaining = durationSeconds || this.config.timePerQuestionSeconds;
    this.onTick = onTick;
    this.onTimeExpired = onTimeExpired;

    if (typeof this.onTick === "function") {
      this.onTick(this.timeRemaining);
    }

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (typeof this.onTick === "function") {
        this.onTick(this.timeRemaining);
      }
      if (this.timeRemaining <= 0) {
        this.stopTimer();
        if (typeof this.onTimeExpired === "function") {
          this.onTimeExpired();
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getSharePayload(finalStats, siteUrl = "") {
    const stats = finalStats || this.finishQuiz();
    const catName = stats.category ? stats.category.toUpperCase() : "WKQUIZ";
    const text = `I scored ${stats.score}/${stats.totalQuestions} (${stats.percentage}%) on WKQuiz's ${catName} Challenge (${(stats.difficulty || 'MEDIUM').toUpperCase()})! Can you beat my score? 🧠🔥`;
    const shareUrl = siteUrl || (typeof window !== "undefined" ? window.location.href : "https://wkquiz.com");

    return {
      text,
      url: shareUrl,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`
    };
  }
}

// CommonJS and Browser compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQuizEngine };
}
if (typeof window !== "undefined") {
  window.WKQuizEngine = WKQuizEngine;
}
