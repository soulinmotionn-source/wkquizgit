# WKQuiz — Quiz Engine & Difficulty Architecture Guide

This guide details the technical architecture of the **WKQuiz Engine**, the **Data Provider Layer**, the **Difficulty System**, and the question selection pipeline.

---

## 1. System Architecture

The WKQuiz platform uses a modular, decoupled 4-layer architecture:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Blogger UI & Theme Layout (theme.xml / ui-controller.js) │
└──────────────────────────────┬──────────────────────────────┘
                               │ User chooses Category, Difficulty, Length
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. WKQuizEngine (Pure Logic, Randomization, Scoring)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Requests questions via abstract methods
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. WKQuizDataProvider (Abstraction Layer)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Queries static JSON, or future API / DB
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Structured Question Bank (question-bank/*.json)          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The 3-Level Difficulty System

When a user selects any topic or category, the engine supports exactly 3 difficulty levels:

```
[ 🟢 EASY ]   [ 🟡 MEDIUM ]   [ 🔴 HARD ]
```

- **Strict Constraint:** There is no 4th difficulty option.
- **Filtering:** The Data Provider filters questions matching both `category` and `difficulty`, and ensures only questions with `"status": "active"` are eligible.
- **Fallback Handling:** If a newly created category does not yet have enough questions in the selected difficulty, the engine gracefully falls back to available active questions in that category and displays an informative notice.

---

## 3. Configurable Quiz Lengths

Quiz lengths are centrally controlled in `WKQUIZ_CONFIG.quiz.availableLengths`:

```javascript
quiz: {
  defaultLength: 10,
  availableLengths: [5, 10, 20, 50], // Easily change or add lengths here
  availableDifficulties: ["easy", "medium", "hard"],
  defaultDifficulty: "medium"
}
```

### User Setup Flow:
```
1. Category Selection
      ↓
2. Difficulty Choice [Easy | Medium | Hard]
      ↓
3. Question Count [5 | 10 | 20 | 50]
      ↓
4. Start Quiz
```

---

## 4. Randomization & Shuffling Pipeline

When a quiz starts, the engine executes this 9-step pipeline:

1. **Query Data Provider:** Request active questions for `category` and `difficulty`.
2. **Session Duplicate Filter:** Exclude question IDs already seen in the current browser session (`sessionStorage`).
3. **Shortage Check:** If fewer unique questions exist than requested (e.g. 14 available when 20 requested), select **all 14 unique questions** and notify the user. **Never duplicate questions.**
4. **Fisher-Yates Question Shuffle:** Randomize question presentation order without bias.
5. **Slice Requested Count:** Select `N` questions.
6. **Fisher-Yates Option Shuffle:** For each question, shuffle options `[A, B, C, D]`.
7. **Accurate Option Pointer Remapping:** Recalculate `answer` index so that the pointer tracks the correct option wherever it moves.
8. **Mark Used IDs:** Record selected IDs in `sessionStorage`.
9. **Render Question 1:** Begin countdown timer (if enabled).

---

## 5. Deterministic Daily Quiz Algorithm

The Daily Quiz mode provides a synchronized challenge worldwide without requiring a backend server:

1. Takes today's UTC calendar date string: `YYYY-MM-DD` (e.g. `2026-09-02`).
2. Hashes the string with a 32-bit hash function to generate a deterministic integer seed.
3. Feeds the seed into a **Mulberry32 PRNG** (Pseudo-Random Number Generator).
4. Shuffles and selects questions deterministically using this PRNG.
5. **Result:** Every player on the same calendar date receives the identical questions in the identical order. At midnight UTC, a new challenge automatically begins.

---

## 6. Future API / Database Migration Path

The Quiz Engine communicates exclusively with `WKQuizDataProvider`:

```javascript
provider.getQuestions({ category: "nclex", difficulty: "hard", length: 10, status: "active" });
provider.getQuestionById("NCLEX-000001");
provider.getAvailableCount("nclex", "hard");
```

To migrate to a backend database or REST API in the future:
1. Replace `src/data-provider.js` with an `async fetch()` API implementation.
2. The UI Controller, Blogger XML theme, and Quiz Engine remain 100% untouched.
