# AVORA V7.20.7 — Academic Tutor Engine

Built on top of V7.20.6 Live Teaching Board.

## Purpose
Make Tutor feel like an experienced private teacher: students always know what they are learning, why it matters, what knowledge is required first, what they should be able to do afterwards, and when they have actually shown understanding.

## Academic depth
- Deepened all current BECE Mathematics teaching maps.
- Added JSS3 depth for binary numbers, rational/irrational numbers, factorisation, equations involving fractions, graphical simultaneous equations, compound interest, similar shapes, introductory trigonometry, geometric construction, and data presentation.
- Deepened BECE English grammar, tenses/aspect, active/passive/modal forms, clauses, critical reading, reading speed, summary, vocabulary formation, sentence meaning, editing, word-function shifts and advanced concord.
- Added complete BECE Tutor topics for Oral English, Writing & Composition and Literature.
- Added exam/class-specific NCEE Mathematics teaching plans instead of reusing BECE plans.
- Added exam/class-specific NCEE English teaching plans instead of reusing BECE plans.
- Added NCEE Ratio & Proportion, Oral English and Writing & Usage teaching/question coverage.

## Tutor experience
- Each teaching section can now show WHY YOU ARE LEARNING THIS, WHAT YOU NEED FIRST, and BY THE END YOU SHOULD BE ABLE TO.
- Generic voice narration now speaks like a teacher: introduces the idea, defines terms, explains the method, walks through an example and prepares the learner for the check.
- Spoken maths normalises symbols such as ÷, ×, =, fractions and common metric abbreviations instead of reading them mechanically.
- Ask AVORA now looks for the exact term in the current lesson and can define it in context; why/example/explain-again requests use the current teaching section.
- Complete academic topic names are merged into the Tutor picker so the visible map is curriculum-led rather than only whatever happens to exist in the bank.

## Question bank
The new seed items are AVORA-original, curriculum/exam-aligned questions. They are not represented as copied official past questions.

## Database
No schema migration is required.

Run the seed once so the new Oral English, Writing, Literature and additional NCEE topic banks are created:

```powershell
node --env-file=.env.local scripts/seed.mjs
```

Then run:

```powershell
npm run dev -- --hostname 0.0.0.0
```

## Validation
- `scripts/seed.mjs`: Node syntax check passed.
- Modified TypeScript/TSX files: TypeScript transpile/syntax checks passed.
- Full Next production build was not completed in the build container because dependency installation did not finish there; run `npm install` locally before `npm run build`.
