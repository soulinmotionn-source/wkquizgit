# WKQuiz — Official Blogger Quiz Platform

> **"Play. Learn. Challenge Yourself."**

**WKQuiz** is a production-quality, lightweight, mobile-first interactive quiz platform built specifically for **Google Blogger**. It delivers a blazing-fast user experience with zero external framework dependencies, full Blogger Layout editability, dedicated AdSense ad containers, dark/light mode, and social-media viral sharing.

---

## 🌟 Key Features

- **⚡ Blazing Fast & Ultra Lightweight**: 100% Vanilla JavaScript & pure CSS variables. Zero jQuery, React, or heavy libraries.
- **📱 Mobile-First Design**: Optimized touch targets (minimum 48px height), zero horizontal scroll, responsive across 320px to 4K displays.
- **🎨 Dark & Light Modes**: Instant zero-flash theme switching with `localStorage` and system preference detection.
- **🧠 Advanced Quiz Engine**:
  - Full question & answer option Fisher-Yates shuffling with accurate answer remapping.
  - Session-level duplicate question prevention.
  - Deterministic date-based **Daily Challenge** (identical daily challenge worldwide without server cost).
  - Multiple modes: *Quick (5 Qs)*, *Classic (10 Qs)*, *Challenge (20 Qs)*, *Exam (50 Qs)*, *Timed Mode*, *Survival Mode (1 Life)*.
  - Interactive feedback, immediate answer explanations, progress indicators, and performance evaluation badges.
- **🚀 Viral Social Sharing**: One-click sharing of score cards to WhatsApp, Facebook, X (Twitter), Web Share API, and clipboard copy.
- **🔍 Instant Search**: Real-time modal search for quizzes, categories, and topics.
- **💰 AdSense-Ready**: Pre-styled, high-viewability ad slots (`#top-ad`, `#sidebar-ad`, `#before-quiz-ad`, in-results) built to prevent layout shifts.
- **🛠️ Blogger Compatible**: Valid Blogger XML theme with editable widgets, `<b:skin>`, `<b:section>`, `<b:widget>`, and standard post/page support.

---

## 📂 Project Structure

```
wk-quiz/
├── theme.xml                     # Master production-ready Blogger XML Theme
├── ADMIN_GUIDE.md                # Comprehensive Non-Programmer Administration Guide
├── README.md                     # Technical architecture documentation
├── package.json                  # NPM test & build scripts
├── src/
│   ├── config.js                 # Central WKQUIZ_CONFIG (branding, modes, links, ads)
│   ├── questions.js              # Scalable question bank (29+ categories)
│   ├── quiz-engine.js            # Pure Vanilla JS Quiz Engine
│   ├── ui-controller.js          # DOM UI Controller & events
│   └── styles.css                # Mobile-first CSS design system
├── dist/
│   ├── wkquiz-theme.xml          # Distributed copy of Blogger XML Theme
│   └── index.html                # Standalone interactive browser preview
├── tests/
│   ├── test-question-bank.js     # Schema and uniqueness test suite
│   ├── test-quiz-engine.js       # Randomization, shuffling, and scoring test suite
│   └── run-tests.js              # Automated master test runner
└── scripts/
    └── build.js                  # Builder script compiling src/ into theme.xml and preview
```

---

## 🚀 Quick Start

### 1. Run Automated Unit Tests
```bash
npm test
```
Executes question bank validation, option shuffle integrity, scoring calculation, session duplicate prevention, and daily PRNG seed tests.

### 2. Build / Recompile Theme
```bash
npm run build
```
Compiles all modular components in `src/` into `theme.xml`, `dist/wkquiz-theme.xml`, and `dist/index.html`.

### 3. Test Offline / Local Browser Preview
Open `dist/index.html` in any web browser to test all interactive features offline.

### 4. Deploy to Blogger
1. Go to **Blogger Dashboard → Theme → Restore / Edit HTML**.
2. Upload or paste the contents of `theme.xml`.
3. Save and launch!

---

## 📖 Administration & Customization

For full details on editing colors, adding questions, creating categories, and setting up AdSense, refer to the [ADMIN_GUIDE.md](file:///d:/projects/wk%20quiz/ADMIN_GUIDE.md).

---
© 2026 WKQuiz. All rights reserved.
