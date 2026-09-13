# WKQuiz — Official Blogger Quiz Platform

> **"Play. Learn. Challenge Yourself."**

**WKQuiz** is a production-quality, lightweight, mobile-first interactive quiz platform built specifically for **Google Blogger**. It features a dedicated **Structured Question Bank**, **Data Provider Abstraction**, **3-Level Difficulty System (Easy, Medium, Hard)**, **Configurable Quiz Lengths (5, 10, 20, 50)**, full Blogger Layout editability, dedicated AdSense ad containers, dark/light mode, and social-media viral sharing.

---

## 🌟 Key Features

- **⚡ Blazing Fast & Ultra Lightweight**: 100% Vanilla JavaScript & pure CSS variables. Zero heavy framework dependencies.
- **📱 Mobile-First Design**: Large touch targets (minimum 48px height), zero horizontal scroll, responsive across 320px to 4K displays.
- **🎨 Dark & Light Modes**: Instant zero-flash theme switching with `localStorage` and system preference detection.
- **🎯 3-Level Difficulty System**: Dedicated `[ EASY ]`, `[ MEDIUM ]`, and `[ HARD ]` filtering for every category.
- **📏 Configurable Quiz Lengths**: Choose between 5, 10, 20, or 50 questions with one-stop configuration in `WKQUIZ_CONFIG.quiz.availableLengths`.
- **🗃️ Decoupled Question Bank**: Scalable JSON question repository organized by category in `question-bank/` with unique permanent IDs (e.g. `NCLEX-000001`).
- **🛡️ Data Validation & Quality Tooling**:
  - `tools/validate.js`: Checks schema compliance, required fields, 4 options, and answer indices.
  - `tools/find-duplicates.js`: Scans for duplicate IDs, exact question matches, and fuzzy similarity (>80%).
  - `tools/stats.js`: Generates detailed question counts by category and difficulty.
- **🧠 Advanced Quiz Engine**:
  - Fisher-Yates question & answer option shuffling with accurate answer pointer remapping.
  - Session-level duplicate question prevention & shortage reporting without creating duplicates.
  - Deterministic date-based **Daily Challenge** (synchronized worldwide without server cost).
- **🚀 Viral Social Sharing**: One-click sharing to WhatsApp, Facebook, X (Twitter), Web Share API, and clipboard copy.
- **🔍 Instant Search**: Real-time modal search for quizzes, categories, and topics.
- **💰 AdSense-Ready**: Pre-styled, high-viewability ad slots (`#top-ad`, `#sidebar-ad`, `#before-quiz-ad`, in-results) with CLS prevention.

---

## 📂 Project Structure

```
wk-quiz/
├── question-bank/                # Dedicated Structured Question Bank
│   ├── nclex.json
│   ├── nursing.json
│   ├── hvac.json
│   ├── electrical.json
│   └── ... (28 category files)
├── tools/                        # Quality Assurance & Management Tools
│   ├── validate.js               # Validates schema, IDs, options, answer indices
│   ├── find-duplicates.js        # Detects duplicate IDs, exact matches, & fuzzy similarity
│   ├── stats.js                  # Outputs category & difficulty breakdown report
│   └── import.js                 # Imports CSV/JSON batches into question-bank/
├── src/
│   ├── config.js                 # Central WKQUIZ_CONFIG (branding, lengths, modes, categories)
│   ├── data-provider.js          # Data Provider abstraction layer
│   ├── questions.js              # Compiled question bank for local runtime
│   ├── quiz-engine.js            # Pure Vanilla JS Quiz Engine
│   ├── ui-controller.js          # DOM UI Controller with 3-step setup screen
│   └── styles.css                # Mobile-first CSS design system
├── dist/
│   ├── wkquiz-theme.xml          # Distributed copy of Blogger XML Theme
│   └── index.html                # Standalone interactive browser preview
├── tests/
│   ├── test-question-bank.js     # Schema and uniqueness test suite
│   ├── test-quiz-engine.js       # Randomization, difficulty, and scoring test suite
│   └── run-tests.js              # Automated master test runner
├── scripts/
│   └── build.js                  # Compiles question-bank/ and src/ into theme.xml and preview
├── theme.xml                     # Master production-ready Blogger XML Theme
├── ADMIN_GUIDE.md                # Comprehensive Non-Programmer Administration Guide
├── QUESTION_GUIDE.md             # Question Bank Management & AI Workflow Guide
├── QUIZ_ENGINE_GUIDE.md          # Quiz Engine & Difficulty Architecture Guide
├── DEPLOYMENT_GUIDE.md           # Blogger Deployment & Git Versioning Guide
└── CLOUDFLARE_DEPLOYMENT_GUIDE.md# Cloudflare Pages Global Edge Deployment Guide
```

---

## 🚀 Quick Start & CLI Commands

| Task | Command | Description |
| :--- | :--- | :--- |
| **Run Unit Tests** | `node tests/run-tests.js` | Runs full test suite verifying engine, difficulty, and provider |
| **Validate Question Bank** | `node tools/validate.js` | Strictly validates all JSON files in `question-bank/` |
| **Check for Duplicates** | `node tools/find-duplicates.js` | Flags duplicate IDs, identical text, and >80% fuzzy similarity |
| **View Question Stats** | `node tools/stats.js` | Displays difficulty and category count breakdown table |
| **Compile & Build** | `node scripts/build.js` | Compiles question bank and source files into `theme.xml` |
| **Import Questions** | `node tools/import.js <file> [category]` | Imports CSV or JSON question batches into `question-bank/` |

---

## 📖 Complete Documentation

- **[ADMIN_GUIDE.md](file:///d:/projects/wk%20quiz/ADMIN_GUIDE.md)**: Full guide for managing branding, colors, ads, categories, and Blogger layout.
- **[QUESTION_GUIDE.md](file:///d:/projects/wk%20quiz/QUESTION_GUIDE.md)**: Guide for schemas, statuses, editing questions, and working conversationally with Anti Gravity.
- **[QUIZ_ENGINE_GUIDE.md](file:///d:/projects/wk%20quiz/QUIZ_ENGINE_GUIDE.md)**: Technical guide on engine flow, 3 difficulties, option remapping, and future API migration.
- **[DEPLOYMENT_GUIDE.md](file:///d:/projects/wk%20quiz/DEPLOYMENT_GUIDE.md)**: Guide on the 8-step production pipeline, Git versioning, and Blogger release.

---
© 2026 WKQuiz. All rights reserved.
