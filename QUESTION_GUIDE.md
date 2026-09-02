# WKQuiz — Question Bank Management & AI Workflow Guide

This guide explains how to manage, add, edit, validate, and import questions in the **WKQuiz** Question Bank.

---

## 1. Question Bank Architecture

The Question Bank is completely decoupled from the Blogger XML theme and stored as clean, structured JSON files in the `question-bank/` folder:

```
question-bank/
├── nclex.json
├── nursing.json
├── medical.json
├── medical-terminology.json
├── diseases.json
├── anatomy.json
├── pharmacology.json
├── hvac.json
├── electrical.json
├── electrical-symbols.json
├── electronics.json
├── engineering.json
├── entertainment.json
├── movies.json
├── tv-shows.json
├── drama.json
├── celebrity.json
├── music.json
├── general-knowledge.json
├── history.json
├── geography.json
├── science.json
├── technology.json
├── computers.json
├── automotive.json
├── iq-logic.json
├── mathematics.json
└── english.json
```

---

## 2. Question Data Schema

Every question object in a category file follows this standard schema:

```json
{
  "id": "NCLEX-000001",
  "category": "NCLEX",
  "subcategory": "Prioritization",
  "difficulty": "medium",
  "question": "A nurse receives change-of-shift report on four clients. Which client should the nurse assess first?",
  "options": [
    "A client with asthma who was wheezing and is now silent with decreased air movement",
    "A client with diabetes whose fasting blood glucose is 185 mg/dL",
    "A client postoperative day 1 after knee replacement reporting 7/10 pain",
    "A client with chronic kidney disease whose serum creatinine is 2.8 mg/dL"
  ],
  "answer": 0,
  "explanation": "Using the ABC (Airway, Breathing, Circulation) priority framework, a silent chest in acute asthma indicates severe bronchospasm and impending respiratory failure.",
  "tags": ["NCLEX", "prioritization", "triage", "emergency"],
  "status": "active"
}
```

### Required Fields:
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Globally unique, permanent identifier (e.g. `NCLEX-000042`, `HVAC-000127`). Never reused. |
| `category` | String | Display name of the category (e.g. `"NCLEX"`, `"HVAC"`, `"Electrical"`). |
| `difficulty` | String | **Strictly 3 levels:** `"easy"`, `"medium"`, or `"hard"`. No 4th level is allowed. |
| `question` | String | Clear, well-formulated question text. |
| `options` | Array | Exactly 4 string choices `[ "A", "B", "C", "D" ]`. |
| `answer` | Number | Integer index (0, 1, 2, or 3) indicating the correct choice in `options`. |
| `explanation`| String | Educational rationale explaining why the correct choice is right. |
| `status` | String | Lifecycle state: `"active"`, `"review"`, `"draft"`, or `"disabled"`. |

### Optional Fields:
| Field | Type | Description |
| :--- | :--- | :--- |
| `subcategory`| String | Specific sub-topic (e.g. `"Refrigeration Cycle"`, `"Pediatrics"`). |
| `tags` | Array | Keywords for search and filtering. |
| `source` | String | Reference textbook, guideline, or exam source. |

---

## 3. Question Statuses

| Status | Eligible for Public Quizzes? | Purpose |
| :--- | :---: | :--- |
| **`active`** | ✅ **YES** | Verified, live questions ready for public gameplay. |
| **`review`** | ❌ **NO** | Newly generated or imported questions awaiting subject matter review. |
| **`draft`** | ❌ **NO** | In-progress questions being authored. |
| **`disabled`** | ❌ **NO** | Deactivated or retired questions preserved for historical records. |

---

## 4. Question Management Tools

Run these CLI commands in your terminal:

### 1. Validate Entire Question Bank
Checks syntax, required fields, unique IDs, 4 options, and valid answer indices:
```bash
node tools/validate.js
```

### 2. Check for Duplicate Questions
Detects duplicate IDs, identical question text, and fuzzy text similarity (>80%):
```bash
node tools/find-duplicates.js
```

### 3. View Question Counts by Category & Difficulty
Displays a formatted breakdown of questions across all categories:
```bash
node tools/stats.js
```

### 4. Import Questions (JSON or CSV)
```bash
node tools/import.js my-new-questions.csv [categorySlug]
```

---

## 5. Conversational AI Question Workflow

You can manage questions by talking directly to Anti Gravity:

### Adding Questions
> *"Add these 50 NCLEX medium questions to the question bank."*

**Anti Gravity will:**
1. Format questions according to the schema.
2. Assign unique IDs (`NCLEX-000007`, `NCLEX-000008`, ...).
3. Set status to `review` or `active` per your instructions.
4. Run `node tools/validate.js` and `node tools/find-duplicates.js`.
5. Present a summary report and wait for your approval before saving.

### Editing a Question
> *"Find NCLEX-000002 and change the explanation to include potassium levels."*

**Anti Gravity will:**
1. Locate only `NCLEX-000002` in `question-bank/nclex.json`.
2. Update the explanation without modifying IDs or unrelated questions.
3. Validate and recompile.

### Disabling a Question
> *"Disable HVAC-000005."*

**Anti Gravity will:**
1. Change `"status": "active"` to `"status": "disabled"` in `question-bank/hvac.json`.
2. The question will immediately stop appearing in live quizzes upon next build.

### Adding a New Category
> *"Add Plumbing as a new category."*

**Anti Gravity will:**
1. Create `question-bank/plumbing.json`.
2. Register the category in `src/config.js`.
3. Add it to the Quiz Engine and UI navigation without touching unrelated categories.
