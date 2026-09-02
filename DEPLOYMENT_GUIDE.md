# WKQuiz — Deployment, Git Versioning & Release Guide

This document defines the production release process, Git version control workflow, and Blogger theme deployment procedures for **WKQuiz**.

---

## 1. Production Workflow Pipeline

To ensure data integrity and avoid broken questions on live sites, always follow this 8-step pipeline:

```
┌──────────────┐
│  1. IMPORT   │  Add/edit questions in question-bank/*.json
└──────┬───────┘
       ▼
┌──────────────┐
│ 2. VALIDATE  │  node tools/validate.js (Check 100% schema compliance)
└──────┬───────┘
       ▼
┌──────────────┐
│ 3. DUP CHECK │  node tools/find-duplicates.js (Check for duplicate IDs / text)
└──────┬───────┘
       ▼
┌──────────────┐
│  4. REPORT   │  node tools/stats.js (Review category & difficulty breakdown)
└──────┬───────┘
       ▼
┌──────────────┐
│ 5. APPROVAL  │  Site owner verifies and approves changes
└──────┬───────┘
       ▼
┌──────────────┐
│ 6. GIT COMMIT│  git commit -m "Add 50 NCLEX medium questions"
└──────┬───────┘
       ▼
┌──────────────┐
│   7. BUILD   │  npm run build (Compiles theme.xml and dist/index.html)
└──────┬───────┘
       ▼
┌──────────────┐
│  8. DEPLOY   │  Upload theme.xml to Blogger Dashboard → Theme → Restore
└──────────────┘
```

---

## 2. Git Version Control & Repository Ownership

### Repository Ownership Rule
- The Git repository belongs **100% to the WKQuiz owner**.
- Anti Gravity acts solely as the development assistant/tool.
- All source code, Question Bank files, commit history, and backups remain on your local/remote repository under your control.

### Recommended Commit Messages:
Use clear, descriptive messages:
- `"Add 50 NCLEX medium questions"`
- `"Fix NCLEX-000002 answer pointer and explanation"`
- `"Disable duplicate question HVAC-000014"`
- `"Add Plumbing category with 30 initial questions"`
- `"Update available quiz lengths to 5, 10, 20, 50"`

---

## 3. Creating Backups Before Major Updates

Before performing large batch imports or structural updates:

```bash
# 1. Check current status
git status

# 2. Create a clean checkpoint commit
git add .
git commit -m "Checkpoint before NCLEX batch import"

# 3. Create a tagged release (optional)
git tag -a v1.2 -m "Release v1.2 with 28 categories"
```

### Rolling Back If Needed:
If an update has unintended side effects:
```bash
# Revert to the last safe commit
git reset --hard HEAD~1
npm run build
```

---

## 4. Deploying to Google Blogger

1. Run the build script to compile the latest Question Bank:
   ```bash
   npm run build
   ```
2. Open [Blogger Dashboard](https://www.blogger.com) → **Theme**.
3. Click the downward arrow (or **⋮** 3 dots) next to **Customize** → Select **Restore**.
4. Click **Upload** and select `theme.xml` (or `dist/wkquiz-theme.xml`).
5. **Verify Mobile Setting:**
   - In **Theme**, click the arrow next to **Customize** → **Mobile settings**.
   - Ensure it is set to **Desktop** (to serve your responsive theme on all mobile devices).
   - Click **Save**.

---

## 5. Summary of Key CLI Commands

| Task | Command |
| :--- | :--- |
| **Run Unit Tests** | `npm test` |
| **Compile & Build** | `npm run build` |
| **Validate Question Bank** | `node tools/validate.js` |
| **Detect Duplicates** | `node tools/find-duplicates.js` |
| **View Question Counts** | `node tools/stats.js` |
| **Import CSV/JSON** | `node tools/import.js <file> [category]` |
