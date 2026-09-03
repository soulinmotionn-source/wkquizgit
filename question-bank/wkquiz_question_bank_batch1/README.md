# WKQuiz Question Bank — Batch 1

This repository-ready package contains the first controlled validation batch for the WKQuiz master question bank.

## Scope
- Categories: 29
- Questions: 232
- Questions per category: 8
- Difficulty: 3 easy, 3 medium, 2 hard per category
- JSON encoding: UTF-8
- Status: `active` for questions that passed this batch's structural/content checks
- Version: `1.0.0-batch1`

## Folder structure
Each category has:
- `nursing/...json` — primary machine-readable source data
- `metadata.json` — category counts and metadata

Top-level files:
- `index.json` — category index
- `validation-report.md` — validation summary
- `README.md` — this guide
- `WKQuiz_Question_Bank_Batch1.docx` — human-readable review copy

## JSON schema
Each question contains:
`id`, `category`, `subcategory`, `difficulty`, `question`, `options`, `answer`, `explanation`, `tags`, `status`.

`answer` is a zero-based index:
- 0 = first option
- 1 = second option
- 2 = third option
- 3 = fourth option

## Difficulty
Only `easy`, `medium`, and `hard` are used. Difficulty is based on knowledge/reasoning complexity, not wording complexity.

## IDs
IDs use permanent category prefixes such as `NURSING-000001`, `NCLEX-000001`, and `ELECTRICAL-SYMBOLS-000001`. Do not reuse or change an existing ID.

## Adding future questions safely
1. Preserve all existing IDs and question text.
2. Assign the next unused permanent ID in the category.
3. Use exactly four options and one correct answer.
4. Store the correct option's zero-based index.
5. Validate for exact and near duplicates before publishing.
6. Keep `status` as `draft` or `review` if factual verification is incomplete.
7. Promote to `active` only after validation.

## Quiz-engine compatibility
The bank is designed around the required flow:
Category → Difficulty → Quiz Mode → Question Count → Start Quiz.

The engine should randomize options only after preserving/updating the correct answer index.

## Important
The JSON files are the source data. The DOCX is for human review only.

This package is intentionally a controlled first batch. The full target in the supplied specification is approximately 360 questions per category (10,440 total), and should be built in additional validated batches rather than by generating filler.
