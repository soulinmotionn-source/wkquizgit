/**
 * WKQUIZ ENGINE
 * Pure Vanilla JavaScript Quiz Engine.
 * Handles state management, Fisher-Yates shuffling with option remapping,
 * session duplicate prevention, timer, scoring, and deterministic Daily Quiz generator.
 */

class WKQuizEngine {
  constructor(options = {}) {
    this.config = Object.assign({
      defaultLength: 10,
      timePerQuestionSeconds: 20,
      enableAnswerShuffle: true,
      enableQuestionShuffle: true,
      preventSessionDuplicates: true,
      passingScorePercentage: 70
    }, options.config || (typeof WKQUIZ_CONFIG !== "undefined" ? WKQUIZ_CONFIG.quiz : {}));

    this.bank = options.bank || (typeof questionBankInstance !== "undefined" ? questionBankInstance : null);

    // Runtime state
    this.sessionUsedIds = new Set();
    this.currentQuiz = null;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.mode = "classic"; // classic, quick, challenge, exam, timed, survival, daily
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
      } catch (e) {
        // Fallback silently if sessionStorage is blocked
      }
    }
  }

  _saveSessionStorage() {
    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.setItem("wkquiz_used_ids", JSON.stringify([...this.sessionUsedIds]));
      } catch (e) {
        // Fallback
      }
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

  /**
   * String to numeric 32-bit hash
   */
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Standard Fisher-Yates Array Shuffle (with optional custom PRNG)
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
   * Shuffle options of a question while preserving the correct answer pointer
   */
  _shuffleQuestionOptions(question, customRng = Math.random) {
    const originalOptions = question.options;
    const correctOptionText = originalOptions[question.answer];

    // Create indexed array
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
   */
  startQuiz(params = {}) {
    const mode = params.mode || "classic";
    const category = params.category || "all";
    const difficulty = params.difficulty || "all";
    let length = params.length || 10;

    // Adjust length according to mode presets
    if (mode === "quick") length = 5;
    else if (mode === "classic") length = 10;
    else if (mode === "challenge") length = 20;
    else if (mode === "exam") length = 50;

    this.mode = mode;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.startTime = Date.now();
    this.endTime = null;
    this.stopTimer();

    let pool = [];

    if (mode === "daily") {
      // Deterministic Daily Quiz based on today's UTC date
      const todayStr = new Date().toISOString().slice(0, 10);
      const seed = this._hashString("WKQUIZ_DAILY_" + todayStr);
      const rng = this._mulberry32(seed);

      const allQuestions = this.bank ? this.bank.getAll() : [];
      if (allQuestions.length === 0) {
        throw new Error("Question bank is empty");
      }

      // Shuffle entire pool deterministically and pick length
      const shuffledDaily = this._shuffleArray(allQuestions, rng);
      const selected = shuffledDaily.slice(0, Math.min(length, shuffledDaily.length));

      pool = selected.map(q => this._shuffleQuestionOptions(q, rng));
    } else {
      // Regular or Category Quiz
      let available = this.bank ? this.bank.filter({ category, difficulty }) : [];
      if (available.length === 0) {
        // Fallback to all questions if category is empty
        available = this.bank ? this.bank.getAll() : [];
      }

      if (available.length === 0) {
        throw new Error("No questions found for the selected criteria");
      }

      // Session duplicate prevention
      let candidatePool = available;
      if (this.config.preventSessionDuplicates) {
        const unused = available.filter(q => !this.sessionUsedIds.has(q.id));
        if (unused.length >= length) {
          candidatePool = unused;
        } else if (unused.length > 0) {
          // If fewer unused remain than requested length, use all unused and reset session tracking for category
          candidatePool = unused;
          this.sessionUsedIds.clear();
          this._saveSessionStorage();
        } else {
          // All used up, reset session tracking
          this.sessionUsedIds.clear();
          this._saveSessionStorage();
          candidatePool = available;
        }
      }

      // Shuffle questions
      const shuffledQuestions = this.config.enableQuestionShuffle 
        ? this._shuffleArray(candidatePool) 
        : [...candidatePool];

      const selected = shuffledQuestions.slice(0, Math.min(length, shuffledQuestions.length));

      // Mark IDs as used in this session
      selected.forEach(q => this.sessionUsedIds.add(q.id));
      this._saveSessionStorage();

      // Shuffle options for each selected question
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
      totalQuestions: pool.length,
      questions: pool
    };

    return this.getCurrentQuestion();
  }

  /**
   * Get current question details (without revealing answer directly)
   */
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
      mode: this.mode
    };
  }

  /**
   * Submit answer for the current question
   * @param {number} selectedOptionIndex - 0-indexed selection
   */
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

    const result = {
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

    return result;
  }

  /**
   * Advance to the next question
   */
  nextQuestion() {
    if (!this.currentQuiz) return null;

    this.currentIndex++;
    if (this.currentIndex >= this.currentQuiz.totalQuestions) {
      this.finishQuiz();
      return null;
    }

    return this.getCurrentQuestion();
  }

  /**
   * Complete the quiz and generate final evaluation
   */
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

  /**
   * Start question countdown timer
   */
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

  /**
   * Stop active timer
   */
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Generate viral social share text
   */
  getSharePayload(finalStats, siteUrl = "") {
    const stats = finalStats || this.finishQuiz();
    const catName = stats.category ? stats.category.toUpperCase() : "WKQUIZ";
    const text = `I scored ${stats.score}/${stats.totalQuestions} (${stats.percentage}%) on WKQuiz's ${catName} Challenge! Can you beat my score? 🧠🔥`;
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
