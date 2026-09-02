/**
 * WKQUIZ UI CONTROLLER
 * Pure Vanilla JavaScript DOM Controller.
 * Handles category-first quiz flow:
 * STEP 1: Select Category -> STEP 2: Select Difficulty -> STEP 3: Select Question Count -> STEP 4: Play
 * Real-time data-aware question counts, zero fake numbers, zero question duplication.
 */

class WKQuizUI {
  constructor(engine, config) {
    this.engine = engine;
    this.config = config || (typeof WKQUIZ_CONFIG !== "undefined" ? WKQUIZ_CONFIG : {});
    this.currentQuestionData = null;
    this.isAnswered = false;

    // Current setup selection state (strictly null until category is selected)
    this.setupState = {
      category: null,
      difficulty: null,
      length: null
    };

    this.dom = {
      container: document.getElementById("wk-quiz-container"),
      darkModeToggle: document.getElementById("wk-dark-toggle"),
      mobileMenuBtn: document.getElementById("wk-menu-btn"),
      mobileDrawer: document.getElementById("wk-mobile-drawer"),
      searchBtn: document.getElementById("wk-search-btn"),
      searchModal: document.getElementById("wk-search-modal"),
      searchInput: document.getElementById("wk-search-input"),
      searchResults: document.getElementById("wk-search-results"),
      searchClose: document.getElementById("wk-search-close"),
      categoriesContainer: document.getElementById("wk-categories-grid")
    };

    this.init();
  }

  init() {
    this._initTheme();
    this._initEvents();
    this._renderCategoriesGrid();
    
    // Check if query param exists (e.g. ?quiz=nclex)
    const hasParams = this._checkUrlParams();
    if (!hasParams && this.dom.container) {
      // On initial page load: Show clean placeholder inviting category selection (NO premature difficulty screen)
      this._renderInitialCategoryPrompt();
    }
  }

  /**
   * Theme Management (Zero-flash Dark Mode)
   */
  _initTheme() {
    const savedTheme = localStorage.getItem("wkquiz_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : (this.config.theme ? this.config.theme.defaultTheme : "light"));
    
    document.documentElement.setAttribute("data-theme", initialTheme);
    if (document.body) document.body.setAttribute("data-theme", initialTheme);
    this._updateThemeIcon(initialTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (document.body) document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("wkquiz_theme", nextTheme);
    this._updateThemeIcon(nextTheme);
  }

  _updateThemeIcon(theme) {
    if (this.dom.darkModeToggle) {
      this.dom.darkModeToggle.innerHTML = theme === "dark" 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  /**
   * Global Event Listeners
   */
  _initEvents() {
    if (this.dom.darkModeToggle) {
      this.dom.darkModeToggle.addEventListener("click", () => this.toggleTheme());
    }

    if (this.dom.mobileMenuBtn && this.dom.mobileDrawer) {
      this.dom.mobileMenuBtn.addEventListener("click", () => {
        this.dom.mobileDrawer.classList.toggle("open");
      });
    }

    if (this.dom.searchBtn && this.dom.searchModal) {
      this.dom.searchBtn.addEventListener("click", () => this.openSearch());
    }
    if (this.dom.searchClose && this.dom.searchModal) {
      this.dom.searchClose.addEventListener("click", () => this.closeSearch());
    }
    if (this.dom.searchModal) {
      this.dom.searchModal.addEventListener("click", (e) => {
        if (e.target === this.dom.searchModal) this.closeSearch();
      });
    }
    if (this.dom.searchInput) {
      this.dom.searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.dom.searchModal && this.dom.searchModal.classList.contains("open")) {
        this.closeSearch();
      }
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        this.openSearch();
      }
    });

    // Global CTA Handlers
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");
      const category = target.getAttribute("data-category");
      const mode = target.getAttribute("data-mode");

      if (action === "select-category" || action === "open-setup" || action === "start-category") {
        e.preventDefault();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove("open");
        if (category) {
          this.renderSetupScreen(category, true);
        } else {
          this._scrollToCategories();
        }
      } else if (action === "start-random") {
        e.preventDefault();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove("open");
        this.renderSetupScreen("mixed-quiz", true);
      } else if (action === "start-daily") {
        e.preventDefault();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove("open");
        this.startQuiz({ mode: "daily", category: "all" }, true);
      } else if (action === "start-mode") {
        e.preventDefault();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove("open");
        this.startQuiz({ mode: mode || "classic", category: category || "all" }, true);
      } else if (action === "restart-quiz") {
        e.preventDefault();
        const lastCat = this.engine.currentQuiz ? this.engine.currentQuiz.category : "mixed-quiz";
        this.renderSetupScreen(lastCat, true);
      } else if (action === "browse-categories") {
        e.preventDefault();
        this._scrollToCategories();
      }
    });
  }

  /**
   * Check URL query parameters on load (e.g. ?quiz=nclex)
   */
  _checkUrlParams() {
    if (typeof window === "undefined" || !window.location.search) return false;
    const params = new URLSearchParams(window.location.search);
    const category = params.get("quiz") || params.get("category");
    const difficulty = params.get("difficulty");
    const length = parseInt(params.get("length"), 10);
    const mode = params.get("mode");

    if (category || mode) {
      if (difficulty && length) {
        this.startQuiz({
          category: category || "all",
          difficulty: difficulty || "medium",
          length: length || 10,
          mode: mode || "classic"
        }, true);
      } else {
        this.renderSetupScreen(category || "mixed-quiz", true);
      }
      return true;
    }
    return false;
  }

  /**
   * Initial page load view: Prompt user to choose a category first
   */
  _renderInitialCategoryPrompt() {
    if (!this.dom.container) return;
    this.dom.container.innerHTML = `
      <div class="wk-setup-placeholder">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">🎯</span>
        <h3 class="wk-setup-placeholder-title">Ready to Test Your Skills?</h3>
        <p class="wk-setup-placeholder-desc">
          Choose any topic from our <strong>Browse Quiz Categories</strong> section below to customize your difficulty and question count.
        </p>
        <button type="button" class="wk-btn wk-btn-primary" data-action="browse-categories">
          📚 Browse Quiz Categories ➔
        </button>
      </div>
    `;
  }

  _scrollToCategories() {
    const catSection = document.getElementById("categories");
    if (catSection) {
      catSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * STEP 2 & 3: Render Quiz Customization Screen (Difficulty & Question Count)
   * User Flow: Category chosen -> Difficulty [Easy | Medium | Hard] -> Real Data-Aware Question Count -> Start
   */
  renderSetupScreen(categoryId, shouldScroll = true) {
    if (!this.dom.container || !categoryId) return;

    // 1. Establish Selected Category
    this.setupState.category = categoryId;
    
    // Default difficulty to easy or medium
    if (!this.setupState.difficulty) {
      this.setupState.difficulty = "easy";
    }

    const cat = (this.config.categories || []).find(c => c.id === categoryId) || {
      id: categoryId,
      name: categoryId === "mixed-quiz" ? "Random Mixed Quiz" : categoryId.toUpperCase(),
      icon: categoryId === "mixed-quiz" ? "🎲" : "📚",
      description: "Test your knowledge across a curated set of questions."
    };

    // 2. Query Real Active Pool for this exact Category + Difficulty
    const availableCount = this._getRealPoolCount(this.setupState.category, this.setupState.difficulty);

    // 3. Determine available question count options
    const standardLengths = (this.config.quiz && this.config.quiz.availableLengths) || [5, 10, 20, 50];
    
    // Auto-adjust selected length to a valid value
    if (!this.setupState.length || this.setupState.length > availableCount) {
      const validLengths = standardLengths.filter(len => len <= availableCount);
      if (validLengths.length > 0) {
        this.setupState.length = validLengths[validLengths.length - 1]; // pick highest available standard count
      } else if (availableCount > 0) {
        this.setupState.length = availableCount; // allow playing all available questions
      } else {
        this.setupState.length = 0;
      }
    }

    let html = `
      <div class="wk-quiz-card wk-setup-card">
        <div class="wk-setup-header">
          <span class="wk-badge wk-badge-primary" style="margin-bottom: 0.5rem; font-size: 0.85rem;">
            ${cat.icon || "🎯"} ${cat.name.toUpperCase()}
          </span>
          <h2 class="wk-setup-title">Customize Your Quiz</h2>
          <p class="wk-setup-desc">${cat.description || "Select your preferred difficulty and number of questions to begin."}</p>
        </div>

        <!-- 1. Difficulty Selector: Strictly Easy | Medium | Hard -->
        <div class="wk-setup-section">
          <label class="wk-setup-label">1. Select Difficulty</label>
          <div class="wk-pills-grid" role="radiogroup" aria-label="Difficulty selection">
            <button type="button" class="wk-pill-btn pill-easy ${this.setupState.difficulty === 'easy' ? 'active' : ''}" data-difficulty="easy">
              <span>🟢 EASY</span>
            </button>
            <button type="button" class="wk-pill-btn pill-medium ${this.setupState.difficulty === 'medium' ? 'active' : ''}" data-difficulty="medium">
              <span>🟡 MEDIUM</span>
            </button>
            <button type="button" class="wk-pill-btn pill-hard ${this.setupState.difficulty === 'hard' ? 'active' : ''}" data-difficulty="hard">
              <span>🔴 HARD</span>
            </button>
          </div>
        </div>

        <!-- 2. Question Count Selector (Data-Aware) -->
        <div class="wk-setup-section">
          <label class="wk-setup-label">2. Select Question Count</label>
          <div class="wk-length-pills-grid" id="wk-length-pills" role="radiogroup" aria-label="Question count selection">
            ${this._renderLengthButtonsHtml(standardLengths, availableCount)}
          </div>
        </div>

        <!-- Real Question Pool Availability Notice -->
        <div id="wk-availability-box">
          ${this._renderAvailabilityNoticeHtml(availableCount)}
        </div>

        <!-- Start Quiz CTA -->
        <button type="button" id="wk-start-quiz-btn" class="wk-btn wk-btn-primary wk-btn-block" ${availableCount === 0 ? 'disabled' : ''}>
          🚀 Start ${cat.name} Quiz ➔
        </button>
      </div>
    `;

    this.dom.container.innerHTML = html;
    this._bindSetupEvents();

    if (shouldScroll) {
      this._scrollToQuiz();
    }
  }

  _getRealPoolCount(category, difficulty) {
    if (!this.engine || !this.engine.provider) return 0;
    return this.engine.provider.getAvailableCount(category, difficulty);
  }

  _renderLengthButtonsHtml(standardLengths, availableCount) {
    let buttons = "";

    standardLengths.forEach(len => {
      const isAvailable = len <= availableCount;
      const isSelected = this.setupState.length === len && isAvailable;
      const disabledAttr = isAvailable ? "" : "disabled";
      const disabledClass = isAvailable ? "" : "disabled";
      const activeClass = isSelected ? "active" : "";

      buttons += `
        <button type="button" class="wk-pill-btn ${activeClass} ${disabledClass}" data-length="${len}" ${disabledAttr} title="${isAvailable ? `${len} Questions` : `Needs at least ${len} questions (only ${availableCount} available)`}">
          <span>${len} Questions</span>
          ${!isAvailable ? `<span style="font-size: 0.65rem; opacity: 0.8;">(Unavailable)</span>` : ''}
        </button>
      `;
    });

    // If pool has fewer than 5 questions but > 0, offer a special custom count for all available questions
    if (availableCount > 0 && availableCount < 5) {
      const isCustomSelected = this.setupState.length === availableCount;
      buttons += `
        <button type="button" class="wk-pill-btn ${isCustomSelected ? 'active' : ''}" data-length="${availableCount}" style="grid-column: span 2; border-color: var(--primary);">
          <span>🎯 All ${availableCount} Available Questions</span>
        </button>
      `;
    }

    return buttons;
  }

  _renderAvailabilityNoticeHtml(availableCount) {
    const diffName = (this.setupState.difficulty || "medium").toUpperCase();

    if (availableCount === 0) {
      return `
        <div class="wk-setup-notice warning">
          ⚠️ <strong>No active ${diffName} questions</strong> are currently available for this category. Please select another difficulty.
        </div>
      `;
    }

    if (availableCount < 5) {
      return `
        <div class="wk-setup-notice warning">
          ⚠️ Only <strong>${availableCount} active ${diffName} questions</strong> are currently available in this pool.
        </div>
      `;
    }

    return `
      <div class="wk-setup-notice">
        <span>📊 <strong>${availableCount} active unique ${diffName} questions</strong> ready in this pool</span>
      </div>
    `;
  }

  _bindSetupEvents() {
    const container = this.dom.container;
    if (!container) return;

    // Difficulty pill buttons
    const diffButtons = container.querySelectorAll("[data-difficulty]");
    diffButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const newDiff = btn.getAttribute("data-difficulty");
        this.setupState.difficulty = newDiff;
        
        diffButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Re-evaluate real pool count and update length buttons
        this._refreshAvailabilityAndLengths();
      });
    });

    // Length pill buttons
    this._bindLengthButtons();

    // Start Quiz button
    const startBtn = document.getElementById("wk-start-quiz-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        const available = this._getRealPoolCount(this.setupState.category, this.setupState.difficulty);
        if (available === 0) {
          alert("No questions available for this difficulty level. Please choose another difficulty.");
          return;
        }

        const len = this.setupState.length || Math.min(10, available);
        this.startQuiz({
          category: this.setupState.category,
          difficulty: this.setupState.difficulty,
          length: len,
          mode: "classic"
        }, true);
      });
    }
  }

  _bindLengthButtons() {
    const container = this.dom.container;
    if (!container) return;

    const lenButtons = container.querySelectorAll("#wk-length-pills [data-length]");
    lenButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.disabled || btn.classList.contains("disabled")) return;
        lenButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.setupState.length = parseInt(btn.getAttribute("data-length"), 10);
      });
    });
  }

  _refreshAvailabilityAndLengths() {
    const availableCount = this._getRealPoolCount(this.setupState.category, this.setupState.difficulty);
    const standardLengths = (this.config.quiz && this.config.quiz.availableLengths) || [5, 10, 20, 50];

    // Adjust selected length
    if (!this.setupState.length || this.setupState.length > availableCount) {
      const validLengths = standardLengths.filter(len => len <= availableCount);
      if (validLengths.length > 0) {
        this.setupState.length = validLengths[validLengths.length - 1];
      } else if (availableCount > 0) {
        this.setupState.length = availableCount;
      } else {
        this.setupState.length = 0;
      }
    }

    // Update Length Pills Container
    const pillsContainer = document.getElementById("wk-length-pills");
    if (pillsContainer) {
      pillsContainer.innerHTML = this._renderLengthButtonsHtml(standardLengths, availableCount);
      this._bindLengthButtons();
    }

    // Update Availability Notice Box
    const availBox = document.getElementById("wk-availability-box");
    if (availBox) {
      availBox.innerHTML = this._renderAvailabilityNoticeHtml(availableCount);
    }

    // Update Start Button Disabled State
    const startBtn = document.getElementById("wk-start-quiz-btn");
    if (startBtn) {
      startBtn.disabled = (availableCount === 0);
    }
  }

  /**
   * STEP 4: Start Quiz and Render Question Screen
   */
  startQuiz(options = {}, shouldScroll = true) {
    if (!this.engine) return;

    try {
      this.currentQuestionData = this.engine.startQuiz(options);
      this.isAnswered = false;
      this._renderQuizScreen();
      if (shouldScroll) {
        this._scrollToQuiz();
      }
    } catch (err) {
      console.error("[WKQuiz] Could not start quiz:", err);
      this._renderError(err.message || "Failed to load quiz.");
    }
  }

  _scrollToQuiz() {
    if (this.dom.container) {
      this.dom.container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * Render Quiz Question Card
   */
  _renderQuizScreen() {
    if (!this.dom.container || !this.currentQuestionData) return;

    const q = this.currentQuestionData;
    const letters = ["A", "B", "C", "D", "E", "F"];

    const categoryObj = (this.config.categories || []).find(c => c.id === q.category) || {
      name: (q.category || "General").toUpperCase(),
      icon: "🎯"
    };

    const difficultyBadgeClass = q.difficulty === "hard" ? "wk-badge-danger" : (q.difficulty === "medium" ? "wk-badge-warning" : "wk-badge-success");

    let html = `
      <div class="wk-quiz-card" id="wk-active-card">
        <div class="wk-quiz-header">
          <div class="wk-quiz-meta">
            <span class="wk-badge wk-badge-primary">
              ${categoryObj.icon || "🎯"} ${categoryObj.name}
            </span>
            <span class="wk-badge ${difficultyBadgeClass}">
              ${(q.difficulty || "medium").toUpperCase()}
            </span>
            <span class="wk-badge wk-badge-warning">
              Question ${q.questionNumber} of ${q.totalQuestions}
            </span>
            ${q.mode === "daily" ? '<span class="wk-badge wk-badge-danger">🔥 Daily</span>' : ''}
          </div>
          <div id="wk-timer-badge" class="wk-quiz-timer" style="display: none;">
            ⏱️ <span id="wk-timer-seconds">20</span>s
          </div>
        </div>

        ${q.shortageNotice ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${this._escapeHtml(q.shortageNotice)}</div>` : ''}

        <div class="wk-progress-bar-wrap" aria-label="Quiz progress">
          <div class="wk-progress-bar-fill" style="width: ${q.progressPercentage}%;"></div>
        </div>

        <h2 class="wk-question-text">${this._escapeHtml(q.question)}</h2>

        <div class="wk-options-list" role="radiogroup" aria-label="Answer options">
          ${q.options.map((opt, idx) => `
            <button type="button" class="wk-option-btn" data-index="${idx}" role="radio" aria-checked="false">
              <span class="wk-option-letter">${letters[idx] || (idx + 1)}</span>
              <span class="wk-option-label">${this._escapeHtml(opt)}</span>
            </button>
          `).join("")}
        </div>

        <div class="wk-explanation-box" id="wk-explanation">
          <div class="wk-explanation-title">
            <span id="wk-expl-icon">💡</span> <span id="wk-expl-heading">Explanation</span>
          </div>
          <div class="wk-explanation-text" id="wk-expl-text"></div>
        </div>

        <div class="wk-quiz-actions">
          <button type="button" id="wk-next-btn" class="wk-btn wk-btn-primary" style="display: none;">
            ${q.questionNumber === q.totalQuestions ? "View Final Results 🏆" : "Next Question ➔"}
          </button>
        </div>
      </div>
    `;

    this.dom.container.innerHTML = html;
    this._bindOptionClicks();

    // Start timer if mode is timed or config enables it
    if (q.mode === "timed" || (this.config.quiz && this.config.quiz.enableTimerByDefault)) {
      const timerBadge = document.getElementById("wk-timer-badge");
      const timerSeconds = document.getElementById("wk-timer-seconds");
      if (timerBadge && timerSeconds) {
        timerBadge.style.display = "inline-flex";
        this.engine.startTimer(
          this.config.quiz.timePerQuestionSeconds || 20,
          (secs) => {
            timerSeconds.textContent = secs;
            if (secs <= 5) timerBadge.classList.add("urgent");
            else timerBadge.classList.remove("urgent");
          },
          () => {
            if (!this.isAnswered) {
              this._handleAnswerSelect(null);
            }
          }
        );
      }
    }
  }

  _bindOptionClicks() {
    const card = document.getElementById("wk-active-card");
    if (!card) return;

    const optionBtns = card.querySelectorAll(".wk-option-btn");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.isAnswered) return;
        const index = parseInt(btn.getAttribute("data-index"), 10);
        this._handleAnswerSelect(index);
      });
    });

    const nextBtn = document.getElementById("wk-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.engine.stopTimer();
        const nextQ = this.engine.nextQuestion();
        if (nextQ) {
          this.currentQuestionData = nextQ;
          this.isAnswered = false;
          this._renderQuizScreen();
        } else {
          this._renderResultsScreen();
        }
      });
    }
  }

  _handleAnswerSelect(selectedIndex) {
    this.isAnswered = true;
    this.engine.stopTimer();

    const result = this.engine.submitAnswer(selectedIndex);
    const card = document.getElementById("wk-active-card");
    if (!card) return;

    const optionBtns = card.querySelectorAll(".wk-option-btn");
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === result.correctIndex) {
        btn.classList.add("correct");
        btn.setAttribute("aria-checked", "true");
      }
      if (idx === result.selectedIndex && !result.isCorrect) {
        btn.classList.add("incorrect");
      }
    });

    // Show Explanation
    const explBox = document.getElementById("wk-explanation");
    const explHeading = document.getElementById("wk-expl-heading");
    const explText = document.getElementById("wk-expl-text");
    const explIcon = document.getElementById("wk-expl-icon");

    if (explBox && explText) {
      explIcon.textContent = result.isCorrect ? "✅" : "❌";
      explHeading.textContent = result.isCorrect ? "Correct! Well Done" : "Incorrect";
      explText.textContent = result.explanation;
      explBox.classList.add("visible");
    }

    // Show Next or Results button
    const nextBtn = document.getElementById("wk-next-btn");
    if (nextBtn) {
      nextBtn.style.display = "inline-flex";
      if (result.isSurvivalOver) {
        nextBtn.textContent = "Game Over - View Results 💀";
      } else if (!result.hasNext) {
        nextBtn.textContent = "View Final Results 🏆";
      }
    }
  }

  /**
   * Render Results Screen
   */
  _renderResultsScreen() {
    if (!this.dom.container) return;

    const stats = this.engine.finishQuiz();
    const sharePayload = this.engine.getSharePayload(stats);

    let html = `
      <div class="wk-quiz-card wk-results-card">
        <div class="wk-results-badge">${stats.badge}</div>
        <h2 class="wk-section-title" style="justify-content: center;">Quiz Completed!</h2>

        <div class="wk-score-circle">
          <div class="wk-score-number">${stats.score}/${stats.totalQuestions}</div>
          <div class="wk-score-percent">${stats.percentage}% Accuracy</div>
        </div>

        <p class="wk-results-msg">${stats.message}</p>

        <div class="wk-results-buttons">
          <button type="button" class="wk-btn wk-btn-primary" data-action="restart-quiz">
            🔄 New Quiz / Retry
          </button>
          <button type="button" class="wk-btn wk-btn-secondary" data-action="start-random">
            🎲 Random Quiz
          </button>
          <button type="button" class="wk-btn wk-btn-secondary" data-action="start-daily">
            🔥 Daily Challenge
          </button>
        </div>

        <!-- Social Viral Sharing -->
        <div class="wk-share-section">
          <div class="wk-share-title">Challenge Your Friends</div>
          <div class="wk-share-grid">
            <a href="${sharePayload.whatsapp}" target="_blank" rel="noopener noreferrer" class="wk-share-btn wk-share-whatsapp">
              📱 WhatsApp
            </a>
            <a href="${sharePayload.facebook}" target="_blank" rel="noopener noreferrer" class="wk-share-btn wk-share-facebook">
              📘 Facebook
            </a>
            <a href="${sharePayload.twitter}" target="_blank" rel="noopener noreferrer" class="wk-share-btn wk-share-twitter">
              ✖️ Share on X
            </a>
            <button type="button" id="wk-copy-score-btn" class="wk-share-btn wk-share-copy">
              🔗 Copy Link
            </button>
          </div>
        </div>
      </div>
    `;

    this.dom.container.innerHTML = html;
    this._bindShareButtons(sharePayload);
    this._scrollToQuiz();
  }

  _bindShareButtons(sharePayload) {
    const copyBtn = document.getElementById("wk-copy-score-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${sharePayload.text}\n${sharePayload.url}`).then(() => {
            copyBtn.textContent = "✅ Link Copied!";
            setTimeout(() => { copyBtn.textContent = "🔗 Copy Link"; }, 2500);
          }).catch(() => {
            this._fallbackCopyText(`${sharePayload.text}\n${sharePayload.url}`);
          });
        } else {
          this._fallbackCopyText(`${sharePayload.text}\n${sharePayload.url}`);
        }
      });
    }
  }

  _fallbackCopyText(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Score copied to clipboard! Share it with your friends.");
  }

  /**
   * STEP 1: Render Categories Grid on Homepage
   */
  _renderCategoriesGrid() {
    if (!this.dom.categoriesContainer || !this.config.categories) return;

    const categories = this.config.categories;
    const html = categories.map(cat => `
      <a href="javascript:void(0)" class="wk-category-card" data-action="select-category" data-category="${cat.id}">
        <span class="wk-category-icon">${cat.icon || "📚"}</span>
        <span class="wk-category-name">${cat.name}</span>
        <span class="wk-category-count">Select Category ➔</span>
      </a>
    `).join("");

    this.dom.categoriesContainer.innerHTML = html;
  }

  /**
   * Instant Search Modal Controls
   */
  openSearch() {
    if (!this.dom.searchModal) return;
    this.dom.searchModal.classList.add("open");
    if (this.dom.searchInput) {
      this.dom.searchInput.value = "";
      this.dom.searchInput.focus();
      this.handleSearch("");
    }
  }

  closeSearch() {
    if (!this.dom.searchModal) return;
    this.dom.searchModal.classList.remove("open");
  }

  handleSearch(query) {
    if (!this.dom.searchResults) return;

    const term = (query || "").toLowerCase().trim();
    const categories = this.config.categories || [];

    const matched = categories.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.description.toLowerCase().includes(term) ||
      c.slug.toLowerCase().includes(term)
    );

    if (matched.length === 0) {
      this.dom.searchResults.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">
          No quizzes found matching "<strong>${this._escapeHtml(query)}</strong>". Try searching for <em>NCLEX</em>, <em>HVAC</em>, <em>Electrical</em>, or <em>Medical</em>.
        </div>
      `;
      return;
    }

    const html = matched.map(cat => `
      <a href="javascript:void(0)" class="wk-search-item" data-action="select-category" data-category="${cat.id}">
        <span style="font-size: 1.5rem;">${cat.icon || "📚"}</span>
        <div>
          <div style="font-weight: 700;">${cat.name} Quiz</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${cat.description}</div>
        </div>
      </a>
    `).join("");

    this.dom.searchResults.innerHTML = html;

    const items = this.dom.searchResults.querySelectorAll(".wk-search-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const catId = item.getAttribute("data-category");
        this.closeSearch();
        this.renderSetupScreen(catId, true);
      });
    });
  }

  _renderError(message) {
    if (!this.dom.container) return;
    this.dom.container.innerHTML = `
      <div class="wk-quiz-card" style="text-align: center; border-color: var(--danger);">
        <h3 style="color: var(--danger); margin-bottom: 0.5rem;">⚠️ Notice</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${this._escapeHtml(message)}</p>
        <button type="button" class="wk-btn wk-btn-primary" data-action="browse-categories">
          Browse Categories
        </button>
      </div>
    `;
  }

  _escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// CommonJS and Browser compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQuizUI };
}
if (typeof window !== "undefined") {
  window.WKQuizUI = WKQuizUI;
}
