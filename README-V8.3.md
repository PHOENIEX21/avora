# AVORA V8.3 — Past-question intelligence integration

This release integrates reference-safe past-question practice while the full licensed textbook ingestion work is pending.

## What changed
- New migration `011_past_question_reference_mode.sql`.
- New seed `scripts/seed-past-question-intelligence.mjs`.
- NCEE Mathematics + English year references remain available for 2011–2024.
- Verified BECE/NECO BECE Mathematics reference years added: 2015, 2016, 2017, 2018, 2020, 2021, 2022, 2023, 2024.
- Verified BECE English reference years added where sources were confirmed: 2020, 2021, 2023, 2024.
- `/exam/archive` now shows both NCEE and BECE year/source references and links to the cited mirror/reference.
- Exam Centre now includes **Past-year practice**. Students choose a verified year.
- Past-year practice keeps year/source provenance visible, but uses AVORA-original standard-equivalent questions when exact-paper reproduction rights are not cleared.
- Full post-submission worked solutions remain enabled.
- Exam sessions now persist `assessment_type`, `past_year`, and `source_key`.

## Run after replacing the project
```powershell
npm install
node --env-file=.env.local scripts/migrate.mjs
node --env-file=.env.local scripts/seed-past-question-intelligence.mjs
npm run preflight
npm run build
```

Do not rerun the older academic seed unless you specifically need it; V8.3's seed is additive/idempotent.
