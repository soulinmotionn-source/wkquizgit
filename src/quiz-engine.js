/**
 * WKQUIZ ENGINE
 * Pure Vanilla JavaScript Quiz Engine.
 * Features:
 * - 3 Selectable Modes: Normal Mode, Time Mode (global countdown), Survival Mode (sudden death).
 * - Unbiased Fisher-Yates Question & Answer Shuffling.
 * - Session-level No-Repeat & Rotation System.
 * - Accurate Question Count Enforcement (5/10/20/50).
 * - Complete scoring, streak, and timer management.
 */

class WKQuizEngine {
  constructor(options = {}) {
    this.config = Object.assign({
      defaultLength: 10,
      availableLengths: [5, 10, 20, 50],
      availableDifficulties: ["easy", "medium", "hard"],
      availableModes: ["normal", "time", "survival"],
      defaultMode: "normal",
      timeModeDurationPerQuestion: 20,
      timeModeFixedSeconds: { 5: 60, 10: 120, 20: 240, 50: 600 },
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

    // Session-level used question IDs
    this.sessionUsedIds = new Set();
    this._loadSessionStorage();

    // Active Quiz Runtime state
    this.currentQuiz = null;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.isSurvivalOver = false;
    this.isTimeExpired = false;
    this.mode = "normal";
    this.category = null;
    this.difficulty = null;
    this.shortageNotice = "";
    this.startTime = null;
    this.endTime = null;

    // Timer variables
    this.timerInterval = null;
    this.timeRemaining = 0;
    this.totalTimeDuration = 0;
    this.onTick = null;
    this.onTimeExpired = null;
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
   * Prepare and start a new quiz session
   * @param {Object} params - { category, difficulty, length, mode }
   */
  startQuiz(params = {}) {
    let mode = (params.mode || this.config.defaultMode || "normal").toLowerCase().trim();
    if (mode === "classic") mode = "normal"; // normalize legacy classic mode to normal
    if (mode !== "normal" && mode !== "time" && mode !== "survival" && mode !== "daily") {
      mode = "normal";
    }

    const category = params.category || "all";
    const difficulty = (params.difficulty || "medium").toLowerCase().trim();
    let length = parseInt(params.length, 10) || this.config.defaultLength || 10;

    this.mode = mode;
    this.category = category;
    this.difficulty = difficulty;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.userAnswers = [];
    this.isCompleted = false;
    this.isSurvivalOver = false;
    this.isTimeExpired = false;
    this.shortageNotice = "";
    this.startTime = Date.now();
    this.endTime = null;
    this.stopTimer();

    if (!this.provider) {
      throw new Error("No Data Provider configured for Quiz Engine");
    }

    let selectedQuestions = [];

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
      selectedQuestions = selected.map(q => this._shuffleQuestionOptions(q, rng));
    } else {
      // Strict category + difficulty query (Strict 3-Difficulty, Status=Active)
      const queryResult = this.provider.getQuestions({
        category,
        difficulty,
        length: 999999, // retrieve full active pool
        status: "active"
      });

      const available = queryResult.questions;

      if (available.length === 0) {
        throw new Error(`No active questions available for "${category}" (${difficulty.toUpperCase()}).`);
      }

      // Check if available pool has fewer questions than requested
      if (available.length < length) {
        // Enforce exact count rule: do not silently serve fewer questions without user awareness
        this.shortageNotice = `Note: Pool contains ${available.length} active questions for ${category.toUpperCase()} (${difficulty.toUpperCase()}).`;
        length = available.length;
      }

      // Session-level No-Repeat and Rotation System
      let candidatePool = [];
      const unusedInSession = available.filter(q => !this.sessionUsedIds.has(q.id));

      if (unusedInSession.length >= length) {
        // We have enough fresh questions that haven't been seen in this session
        candidatePool = unusedInSession;
      } else if (unusedInSession.length > 0) {
        // Take all unused questions, and fill the remaining slots from previously seen questions
        const seenInSession = available.filter(q => this.sessionUsedIds.has(q.id));
        const shuffledSeen = this._shuffleArray(seenInSession);
        const needed = length - unusedInSession.length;
        candidatePool = [...unusedInSession, ...shuffledSeen.slice(0, needed)];
        // Clear session history to start a fresh cycle
        this.sessionUsedIds.clear();
        this._saveSessionStorage();
      } else {
        // All questions in the pool have been seen in this session -> Reset history & cycle
        this.sessionUsedIds.clear();
        this._saveSessionStorage();
        candidatePool = available;
      }

      // Unbiased Fisher-Yates question shuffle
      const shuffledQuestions = this.config.enableQuestionShuffle 
        ? this._shuffleArray(candidatePool) 
        : [...candidatePool];

      // Select exactly the requested number of unique questions
      const selected = shuffledQuestions.slice(0, length);

      // Verify absolute uniqueness within the active quiz
      const uniqueCheck = new Set(selected.map(q => q.id));
      if (uniqueCheck.size !== selected.length) {
        throw new Error("Duplicate questions detected in quiz generation!");
      }

      // Record selected questions in session memory
      selected.forEach(q => this.sessionUsedIds.add(q.id));
      this._saveSessionStorage();

      // Shuffle answer options for each question
      selectedQuestions = selected.map(q => {
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
      totalQuestions: selectedQuestions.length,
      shortageNotice: this.shortageNotice,
      questions: selectedQuestions
    };

    // Initialize Timer for Time Mode
    if (mode === "time") {
      const fixedSeconds = this.config.timeModeFixedSeconds && this.config.timeModeFixedSeconds[length];
      this.totalTimeDuration = fixedSeconds || (this.config.timeModeDurationPerQuestion * length) || (20 * length);
      this.timeRemaining = this.totalTimeDuration;
    }

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
      shortageNotice: this.shortageNotice,
      timeRemaining: this.timeRemaining,
      totalTimeDuration: this.totalTimeDuration
    };
  }

  /**
   * Submit answer for current question
   * @param {number|null} selectedOptionIndex - 0..3 or null (if timed out/skipped)
   */
  submitAnswer(selectedOptionIndex) {
    if (!this.currentQuiz || this.isCompleted) {
      throw new Error("No active quiz in progress");
    }

    const currentQ = this.currentQuiz.questions[this.currentIndex];
    const isCorrect = (selectedOptionIndex === currentQ.answer);

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
      questionNumber: this.currentIndex + 1,
      questionId: currentQ.id,
      questionText: currentQ.question,
      options: [...currentQ.options],
      selectedIndex: selectedOptionIndex,
      selectedOptionText: selectedOptionIndex !== null && selectedOptionIndex !== undefined ? currentQ.options[selectedOptionIndex] : "Timed Out / Skipped",
      correctIndex: currentQ.answer,
      correctOptionText: currentQ.options[currentQ.answer],
      isCorrect,
      explanation: currentQ.explanation || "No additional explanation provided."
    };

    this.userAnswers.push(answerRecord);

    // Survival Mode termination condition: first wrong answer terminates immediately
    if (this.mode === "survival" && !isCorrect) {
      this.isSurvivalOver = true;
      this.stopTimer();
    }

    const hasNext = (this.currentIndex + 1 < this.currentQuiz.totalQuestions) && !this.isSurvivalOver && !this.isTimeExpired;

    return {
      isCorrect,
      correctIndex: currentQ.answer,
      selectedIndex: selectedOptionIndex,
      explanation: currentQ.explanation || "No additional explanation provided.",
      score: this.score,
      streak: this.streak,
      hasNext,
      isSurvivalOver: this.isSurvivalOver,
      isTimeExpired: this.isTimeExpired,
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.currentQuiz.totalQuestions,
      survivedCount: this.score
    };
  }

  nextQuestion() {
    if (!this.currentQuiz) return null;

    this.currentIndex++;
    if (this.currentIndex >= this.currentQuiz.totalQuestions || this.isSurvivalOver || this.isTimeExpired) {
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

    if (this.mode === "survival") {
      if (!this.isSurvivalOver && this.score === total) {
        badge = "Survival Champion 🛡️";
        message = `Incredible mastery! You survived all ${total} questions without a single mistake!`;
      } else {
        badge = this.score >= 10 ? "Survivor ⚔️" : "Fallen Explorer 🧭";
        message = `Survival ended on Question ${this.currentIndex + 1}. You successfully survived ${this.score} questions!`;
      }
    } else if (this.mode === "time") {
      if (this.isTimeExpired) {
        badge = "Time Out ⏱️";
        message = `Time expired! You answered ${this.score} out of ${this.userAnswers.length} attempted questions correctly.`;
      } else {
        badge = percentage >= 80 ? "Speed Demon ⚡" : "Time Fighter ⏱️";
        message = `Time challenge complete! You finished with ${Math.max(0, this.timeRemaining)}s remaining on the clock.`;
      }
    } else {
      // Normal Mode
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
    }

    return {
      quizId: this.currentQuiz ? this.currentQuiz.id : "",
      mode: this.mode,
      category: this.currentQuiz ? this.currentQuiz.category : "all",
      difficulty: this.difficulty,
      score: this.score,
      totalQuestions: total,
      answeredCount: this.userAnswers.length,
      percentage,
      passed: percentage >= this.config.passingScorePercentage,
      timeSpentSeconds,
      timeRemaining: this.timeRemaining,
      totalTimeDuration: this.totalTimeDuration,
      isTimeExpired: this.isTimeExpired,
      isSurvivalOver: this.isSurvivalOver,
      survivedCount: this.score,
      failedQuestionNumber: this.isSurvivalOver ? this.currentIndex + 1 : null,
      maxStreak: this.maxStreak,
      badge,
      message,
      answersSummary: [...this.userAnswers]
    };
  }

  /**
   * Start global or per-question countdown timer
   */
  startTimer(durationSeconds, onTick, onTimeExpired) {
    this.stopTimer();
    this.timeRemaining = durationSeconds || this.timeRemaining || 20;
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
        this.isTimeExpired = true;
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
    const modeName = (stats.mode || "normal").toUpperCase();
    let text = "";

    if (stats.mode === "survival") {
      text = `I survived ${stats.survivedCount}/${stats.totalQuestions} questions on WKQuiz's ${catName} Survival Mode! Can you beat my streak? 🛡️🔥`;
    } else if (stats.mode === "time") {
      text = `I scored ${stats.score}/${stats.totalQuestions} in WKQuiz's ${catName} Time Attack Mode! Beat the clock! ⏱️⚡`;
    } else {
      text = `I scored ${stats.score}/${stats.totalQuestions} (${stats.percentage}%) on WKQuiz's ${catName} Challenge (${(stats.difficulty || 'MEDIUM').toUpperCase()})! Can you beat my score? 🧠🔥`;
    }

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
