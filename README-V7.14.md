# AVORA V7.14 — Tutor Reliability Fix

This release fixes real Tutor routing/data mismatches found in V7.13.

## Fixed
- Learn now opens Tutor even when curriculum topic names differ from exam blueprint labels.
  - Example: `Geometry & Measurement` ↔ `Geometry & Mensuration`
  - Example: `Data & Statistics` ↔ `Statistics & Data`
- English profiles now work whether older data says `English` or newer UI says `English Language`.
- Subject filtering now uses stable subject slugs rather than display labels.
- Tutor topic picker reports a visible error instead of silently appearing empty when content cannot load.
- Tutor accepts both curriculum-topic and exam-topic names from Learn and Exam results.
- English Language now has specific Tutor teaching playbooks for Grammar, Vocabulary, Comprehension, Sentence Meaning, Punctuation, Spelling & Usage, Word Classes and Concord.
- Learn, Practice, Progress and Exam subject lookup now use the same stable subject mapping.

## Database
No new migration is required.

If the latest English/assessment seed has not been run on this database, run:

```powershell
node --env-file=.env.local scripts/seed.mjs
```

Then start normally:

```powershell
npm install
npm run dev
```
