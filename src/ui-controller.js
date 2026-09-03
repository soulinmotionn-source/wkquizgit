/**
 * WKQUIZ UI CONTROLLER
 * Pure Vanilla JavaScript DOM Controller.
 * Handles category-first 5-step quiz flow:
 * STEP 1: Select Category -> STEP 2: Select Difficulty -> STEP 3: Select Mode -> STEP 4: Select Question Count -> STEP 5: Start
 * Features:
 * - Normal Mode, Time Mode (global countdown), Survival Mode (sudden death).
 * - Real-time data-aware question counts (5, 10, 20, 50).
 * - Zero fake numbers, zero question duplication per quiz session.
 */

class WKQuizUI {
  constructor(engine, config) {
    this.engine = engine;
    this.config = config || (typeof WKQUIZ_CONFIG !== "undefined" ? WKQUIZ_CONFIG : {});
    this.currentQuestionData = null;
    this.isAnswered = false;

    // Current setup selection state
    this.setupState = {
      category: null,
      difficulty: "easy",
      mode: "normal",
      length: 10
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
      // Initial page load: Show clean placeholder inviting category selection
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
      const target = e.target.closest("[data-action]") || e.target.closest(".wk-category-card");
      if (!target) return;

      const action = target.getAttribute("data-action") || (target.classList.contains("wk-category-card") ? "select-category" : null);
      const category = target.getAttribute("data-category");
      const mode = target.getAttribute("data-mode");

      if (action === "select-category" || action === "open-setup" || action === "start-category") {
        e.preventDefault();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove("open");
        const selectedCat = category || (target.closest("[data-category]") && target.closest("[data-category]").getAttribute("data-category"));
        if (selectedCat) {
          this.renderSetupScreen(selectedCat, true);
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
        this.setupState.mode = mode || "normal";
        this.renderSetupScreen(category || "nursing", true);
      } else if (action === "restart-quiz") {
        e.preventDefault();
        const lastCat = this.engine.currentQuiz ? this.engine.currentQuiz.category : "nursing";
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
          mode: mode || "normal"
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
          Choose any topic from our <strong>Browse Quiz Categories</strong> section below to customize your difficulty, mode, and question count.
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
      const headerOffset = 70;
      const elementPosition = catSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  _scrollToQuiz() {
    if (this.dom.container) {
      const headerOffset = 70;
      const elementPosition = this.dom.container.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  /**
   * 5-STEP CUSTOMIZATION SCREEN
   * Flow: Step 1 (Category Selected) -> Step 2 (Difficulty) -> Step 3 (Quiz Mode) -> Step 4 (Question Count) -> Step 5 (Start)
   */
  async renderSetupScreen(categoryId, shouldScroll = true) {
    if (!this.dom.container || !categoryId) return;

    this.setupState.category = categoryId;
    if (!this.setupState.difficulty) this.setupState.difficulty = "easy";
    if (!this.setupState.mode) this.setupState.mode = "normal";

    const cat = (this.config.categories || []).find(c => c.id === categoryId) || {
      id: categoryId,
      name: categoryId === "mixed-quiz" ? "Random Mixed Quiz" : categoryId.toUpperCase(),
      icon: categoryId === "mixed-quiz" ? "🎲" : "📚",
      description: "Test your knowledge across curated subject questions."
    };

    // Query real active pool for this category + difficulty
    const availableCount = this._getRealPoolCount(this.setupState.category, this.setupState.difficulty);

    // Question count options
    const standardLengths = (this.config.quiz && this.config.quiz.availableLengths) || [5, 10, 20, 50];
    
    // Auto-adjust selected length
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
    
    // Auto-adjust selected length
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

    let html = `
      <div class="wk-quiz-card wk-setup-card">
        <div class="wk-setup-header">
          <span class="wk-badge wk-badge-primary" style="margin-bottom: 0.5rem; font-size: 0.85rem;">
            ${cat.icon || "🎯"} ${cat.name.toUpperCase()}
          </span>
          <h2 class="wk-setup-title">Customize Your Quiz</h2>
          <p class="wk-setup-desc">${cat.description || "Configure your difficulty, mode, and question count to begin."}</p>
        </div>

        <!-- STEP 2: Difficulty Selector (Strictly Easy | Medium | Hard) -->
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

        <!-- STEP 3: Quiz Mode Selector (Normal | Time | Survival) -->
        <div class="wk-setup-section">
          <label class="wk-setup-label">2. Select Quiz Mode</label>
          <div class="wk-mode-pills-grid" role="radiogroup" aria-label="Quiz mode selection">
            <button type="button" class="wk-pill-btn pill-mode ${this.setupState.mode === 'normal' ? 'active' : ''}" data-mode-btn="normal">
              <span class="mode-icon">⚡</span>
              <span class="mode-name">Normal Mode</span>
              <span class="mode-desc">Untimed • Step by Step</span>
            </button>
            <button type="button" class="wk-pill-btn pill-mode ${this.setupState.mode === 'time' ? 'active' : ''}" data-mode-btn="time">
              <span class="mode-icon">⏱️</span>
              <span class="mode-name">Time Mode</span>
              <span class="mode-desc">Countdown • Fast Paced</span>
            </button>
            <button type="button" class="wk-pill-btn pill-mode ${this.setupState.mode === 'survival' ? 'active' : ''}" data-mode-btn="survival">
              <span class="mode-icon">🛡️</span>
              <span class="mode-name">Survival Mode</span>
              <span class="mode-desc">Sudden Death • 1 Mistake</span>
            </button>
          </div>
        </div>

        <!-- STEP 4: Question Count Selector (Data-Aware) -->
        <div class="wk-setup-section">
          <label class="wk-setup-label">3. Select Question Count</label>
          <div class="wk-length-pills-grid" id="wk-length-pills" role="radiogroup" aria-label="Question count selection">
            ${this._renderLengthButtonsHtml(standardLengths, availableCount)}
          </div>
        </div>

        <!-- Availability Status Box -->
        <div id="wk-availability-box">
          ${this._renderAvailabilityNoticeHtml(availableCount)}
        </div>

        <!-- STEP 5: Start Quiz CTA -->
        <button type="button" id="wk-start-quiz-btn" class="wk-btn wk-btn-primary wk-btn-block" ${availableCount === 0 ? 'disabled' : ''}>
          🚀 Start ${cat.name} (${this.setupState.difficulty.toUpperCase()}) Quiz ➔
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
        <span>📊 <strong>${availableCount} active unique ${diffName} questions</strong> available in this pool</span>
      </div>
    `;
  }

  _bindSetupEvents() {
    const container = this.dom.container;
    if (!container) return;

    // Difficulty buttons
    const diffButtons = container.querySelectorAll("[data-difficulty]");
    diffButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const newDiff = btn.getAttribute("data-difficulty");
        this.setupState.difficulty = newDiff;
        
        diffButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        this._refreshAvailabilityAndLengths();
      });
    });

    // Mode buttons
    const modeButtons = container.querySelectorAll("[data-mode-btn]");
    modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const newMode = btn.getAttribute("data-mode-btn");
        this.setupState.mode = newMode;
        
        modeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    // Length buttons
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
          mode: this.setupState.mode || "normal"
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

    // Update Start Button
    const startBtn = document.getElementById("wk-start-quiz-btn");
    if (startBtn) {
      startBtn.disabled = (availableCount === 0);
      const cat = (this.config.categories || []).find(c => c.id === this.setupState.category) || { name: "Quiz" };
      startBtn.innerHTML = `🚀 Start ${cat.name} (${this.setupState.difficulty.toUpperCase()}) Quiz ➔`;
    }
  }

  /**
   * STEP 5: Start Quiz and Render Question Screen
   */
  async startQuiz(options = {}, shouldScroll = true) {
    if (!this.engine) return;

    const startBtn = document.getElementById("wk-start-quiz-btn");
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.innerHTML = `⏳ Loading Questions from Git...`;
    }

    try {
      if (this.engine.provider && typeof this.engine.provider.fetchCategory === "function") {
        if (options.category && options.category !== "all" && options.category !== "mixed-quiz") {
          await this.engine.provider.fetchCategory(options.category);
        }
      }

      this.currentQuestionData = this.engine.startQuiz(options);
      this.isAnswered = false;
      this._renderQuizScreen();

      // Start global timer if in Time Mode
      if (options.mode === "time" || this.engine.mode === "time") {
        this._initTimeModeTimer();
      }

      if (shouldScroll) {
        this._scrollToQuiz();
      }
    } catch (err) {
      console.error("[WKQuiz] Could not start quiz:", err);
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.innerHTML = `🚀 Start Quiz ➔`;
      }
      this._renderError(err.message || "Failed to load quiz from Git repository.");
    }
  }

  _initTimeModeTimer() {
    this._updateTimerDisplay(this.engine.timeRemaining);
    this.engine.startTimer(
      this.engine.timeRemaining,
      (secs) => {
        this._updateTimerDisplay(secs);
      },
      () => {
        // Time expired callback
        this._handleTimeExpired();
      }
    );
  }

  _updateTimerDisplay(secs) {
    const timerBadge = document.getElementById("wk-timer-badge");
    const timerSeconds = document.getElementById("wk-timer-seconds");
    if (!timerSeconds) return;

    const currentSecs = typeof secs === "number" ? secs : (this.engine ? this.engine.timeRemaining : 0);
    const mins = Math.floor(currentSecs / 60);
    const remainderSecs = currentSecs % 60;
    timerSeconds.textContent = `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;

    if (timerBadge) {
      if (currentSecs <= 10) timerBadge.classList.add("urgent");
      else timerBadge.classList.remove("urgent");
    }
  }

  _handleTimeExpired() {
    this.engine.stopTimer();
    this.engine.isTimeExpired = true;
    this._renderResultsScreen();
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
    
    let modeBadge = "";
    if (q.mode === "survival") {
      modeBadge = '<span class="wk-badge wk-badge-danger">🛡️ Survival</span>';
    } else if (q.mode === "time") {
      modeBadge = '<span class="wk-badge wk-badge-warning">⏱️ Time Attack</span>';
    } else if (q.mode === "daily") {
      modeBadge = '<span class="wk-badge wk-badge-danger">🔥 Daily</span>';
    }

    // Format current remaining time for seamless question transition
    const currentSecs = (this.engine && typeof this.engine.timeRemaining === "number") ? this.engine.timeRemaining : 0;
    const mins = Math.floor(currentSecs / 60);
    const remainderSecs = currentSecs % 60;
    const timeFormatted = `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
    const isUrgent = currentSecs <= 10;

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
            ${modeBadge}
            <span class="wk-badge wk-badge-warning">
              Question ${q.questionNumber} of ${q.totalQuestions}
            </span>
          </div>
          <div id="wk-timer-badge" class="wk-quiz-timer ${isUrgent ? 'urgent' : ''}" style="${q.mode === 'time' ? 'display: inline-flex;' : 'display: none;'}">
            ⏱️ <span id="wk-timer-seconds">${q.mode === 'time' ? timeFormatted : '--:--'}</span>
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
    if (q.mode === "time") {
      this._updateTimerDisplay(this.engine.timeRemaining);
    }
    this._bindOptionClicks();
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
        if (this.engine.isSurvivalOver || this.engine.isTimeExpired) {
          this._renderResultsScreen();
          return;
        }

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
   * Render Results Screen tailored for Normal, Time, and Survival Modes
   */
  _renderResultsScreen() {
    if (!this.dom.container) return;

    this.engine.stopTimer();
    const stats = this.engine.finishQuiz();
    const sharePayload = this.engine.getSharePayload(stats);

    let modeHeaderHtml = "";
    let scoreDisplayHtml = "";

    if (stats.mode === "survival") {
      const isPerfect = !stats.isSurvivalOver && stats.score === stats.totalQuestions;
      modeHeaderHtml = `
        <div class="wk-badge wk-badge-danger" style="margin-bottom: 0.5rem; font-size: 0.9rem;">
          🛡️ SURVIVAL MODE RESULT
        </div>
        <h2 class="wk-section-title" style="justify-content: center;">
          ${isPerfect ? "Survival Completed! 🏆" : `Survival Ended on Q${stats.failedQuestionNumber || stats.answeredCount}`}
        </h2>
      `;
      scoreDisplayHtml = `
        <div class="wk-score-circle" style="border-color: ${isPerfect ? 'var(--success)' : 'var(--danger)'};">
          <div class="wk-score-number">${stats.survivedCount}/${stats.totalQuestions}</div>
          <div class="wk-score-percent">Questions Survived</div>
        </div>
      `;
    } else if (stats.mode === "time") {
      modeHeaderHtml = `
        <div class="wk-badge wk-badge-warning" style="margin-bottom: 0.5rem; font-size: 0.9rem;">
          ⏱️ TIME ATTACK RESULT
        </div>
        <h2 class="wk-section-title" style="justify-content: center;">
          ${stats.isTimeExpired ? "Time's Up! ⏱️" : "Challenge Completed! ⚡"}
        </h2>
      `;
      scoreDisplayHtml = `
        <div class="wk-score-circle">
          <div class="wk-score-number">${stats.score}/${stats.totalQuestions}</div>
          <div class="wk-score-percent">${stats.percentage}% Accuracy</div>
        </div>
      `;
    } else {
      // Normal Mode
      modeHeaderHtml = `
        <div class="wk-badge wk-badge-primary" style="margin-bottom: 0.5rem; font-size: 0.9rem;">
          ⚡ NORMAL MODE RESULT
        </div>
        <h2 class="wk-section-title" style="justify-content: center;">Quiz Completed!</h2>
      `;
      scoreDisplayHtml = `
        <div class="wk-score-circle">
          <div class="wk-score-number">${stats.score}/${stats.totalQuestions}</div>
          <div class="wk-score-percent">${stats.percentage}% Accuracy</div>
        </div>
      `;
    }

    let html = `
      <div class="wk-quiz-card wk-results-card">
        <div class="wk-results-badge">${stats.badge}</div>
        ${modeHeaderHtml}
        ${scoreDisplayHtml}

        <p class="wk-results-msg">${stats.message}</p>

        <!-- Metrics Grid -->
        <div class="wk-metrics-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1.5rem 0;">
          <div style="background: var(--surface-2); padding: 0.75rem; border-radius: var(--radius); text-align: center;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Correct</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--success);">${stats.score}</div>
          </div>
          <div style="background: var(--surface-2); padding: 0.75rem; border-radius: var(--radius); text-align: center;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Streak</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--warning);">${stats.maxStreak} 🔥</div>
          </div>
          <div style="background: var(--surface-2); padding: 0.75rem; border-radius: var(--radius); text-align: center;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Time</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">${stats.timeSpentSeconds}s</div>
          </div>
        </div>

        <div class="wk-results-buttons">
          <button type="button" class="wk-btn wk-btn-primary" data-action="restart-quiz">
            🔄 Play Again / Change Mode
          </button>
          <button type="button" class="wk-btn wk-btn-secondary" data-action="browse-categories">
            📚 Browse Other Topics
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
    try {
      document.execCommand("copy");
      const copyBtn = document.getElementById("wk-copy-score-btn");
      if (copyBtn) {
        copyBtn.textContent = "✅ Link Copied!";
        setTimeout(() => { copyBtn.textContent = "🔗 Copy Link"; }, 2500);
      }
    } catch (e) {}
    document.body.removeChild(tempInput);
  }

  _renderError(message) {
    if (!this.dom.container) return;
    this.dom.container.innerHTML = `
      <div class="wk-quiz-card" style="text-align: center; border-color: var(--danger);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">⚠️</span>
        <h3 style="color: var(--danger); margin-bottom: 0.5rem;">Quiz Notice</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${this._escapeHtml(message)}</p>
        <button type="button" class="wk-btn wk-btn-primary" data-action="browse-categories">
          Browse Categories
        </button>
      </div>
    `;
  }

  _renderCategoriesGrid() {
    if (!this.dom.categoriesContainer || !this.config.categories) return;

    const cardsHtml = this.config.categories.map(cat => `
      <div class="wk-category-card" data-action="select-category" data-category="${cat.id}" role="button" tabindex="0">
        <div class="wk-category-icon" style="background-color: ${cat.color}15; color: ${cat.color};">
          ${cat.icon || "📚"}
        </div>
        <h3 class="wk-category-title">${this._escapeHtml(cat.name)}</h3>
        <p class="wk-category-desc">${this._escapeHtml(cat.description)}</p>
        <div class="wk-category-footer">
          <span class="wk-category-link" data-action="select-category" data-category="${cat.id}">
            Start Quiz ➔
          </span>
        </div>
      </div>
    `).join("");

    this.dom.categoriesContainer.innerHTML = cardsHtml;
  }

  openSearch() {
    if (this.dom.searchModal) {
      this.dom.searchModal.classList.add("open");
      if (this.dom.searchInput) {
        setTimeout(() => this.dom.searchInput.focus(), 50);
      }
    }
  }

  closeSearch() {
    if (this.dom.searchModal) {
      this.dom.searchModal.classList.remove("open");
      if (this.dom.searchInput) this.dom.searchInput.value = "";
      if (this.dom.searchResults) this.dom.searchResults.innerHTML = "";
    }
  }

  handleSearch(query) {
    if (!this.dom.searchResults) return;
    const q = (query || "").toLowerCase().trim();
    if (!q) {
      this.dom.searchResults.innerHTML = "";
      return;
    }

    const matched = (this.config.categories || []).filter(c => {
      return c.name.toLowerCase().includes(q) || (c.description && c.description.toLowerCase().includes(q));
    });

    if (matched.length === 0) {
      this.dom.searchResults.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); text-align: center;">No categories found matching "${this._escapeHtml(query)}"</div>`;
      return;
    }

    this.dom.searchResults.innerHTML = matched.map(cat => `
      <div class="wk-search-item" data-action="select-category" data-category="${cat.id}">
        <span style="font-size: 1.5rem;">${cat.icon || "📚"}</span>
        <div>
          <div style="font-weight: 700; color: var(--text);">${this._escapeHtml(cat.name)}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${this._escapeHtml(cat.description)}</div>
        </div>
      </div>
    `).join("");
  }

  _escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQuizUI };
}
if (typeof window !== "undefined") {
  window.WKQuizUI = WKQuizUI;
}
