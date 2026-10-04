# AVORA V8.1 — Academic Knowledge + Exam Intelligence

This build combines the V8 Teacher Engine foundation with the first rights-aware academic-source layer and explicit post-submission solutions.

## Added
- Migration 010: academic source registry, exam-year registry, solution metadata, rights/provenance metadata.
- Siyavula Nigeria JSS1–JSS3 Mathematics source registered as an OPEN_TEXTBOOK / CC_BY source **only for the specifically identified unbranded CC BY editions**.
- NCEE 2011–2024 Mathematics + English year-by-year intelligence registry. The public archive reports questions and solutions, but AVORA marks it REFERENCE_ONLY until reproduction rights are verified.
- `/exam/archive` gives the learner a transparent year-by-year archive view.
- Every submitted exam now returns a full review: learner answer, correct answer, solution steps/explanation, topic, skill and Tutor recovery action.
- Existing AVORA-original published questions are backfilled with solution metadata.
- Full mocks retain deliberate topic blocks of up to five questions before moving to another topic.
- Learn remains directly accessible by subject; Mathematics now shows its academic-grounding status.

## Required once
```powershell
node --env-file=.env.local scripts/migrate.mjs
node --env-file=.env.local scripts/seed-academic-sources.mjs
```
Then:
```powershell
npm run preflight
npm run build
```

## Rights rule
AVORA may adapt the specifically identified unbranded Siyavula CC BY textbook editions with attribution. Do not assume Siyavula's website/practice question bank shares that licence. NCEE mirrored past papers remain exam-intelligence/reference records until direct reproduction rights are verified.

## Still intentionally not faked
- No copyrighted past-paper text was copied into the production question bank merely because it is online.
- BECE year coverage is not labelled complete until each Nigerian NECO source/year is verified.
- English does not claim an open textbook source that has not yet been verified.
