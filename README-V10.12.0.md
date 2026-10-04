# AVORA V10.12.0 — NCEE Editorial Bank Expansion

V10.12 removes the V10.11 mock-diversity limitation.

## What changed

- Added `lib/nceeEditorialBank.ts` as the live Common Entrance editorial bank builder.
- Both **Primary 5** and **Primary 6** now receive **80 questions in each of the six NCEE domains**.
- That is **480 question records per class / 960 across both classes**.
- Every teaching topic is included because the bank is generated directly from the Primary 5/6 teaching-topic maps.
- Each question keeps class, domain, topic, answer, explanation, difficulty and remediation destination.
- The question builder rejects any item whose correct answer is missing from its options.

## Eight full mocks without question-ID reuse

The full mock engine no longer independently samples 10 random questions from a small bank for each form.

For each learner class and domain AVORA now:

1. creates one stable shuffled order,
2. allocates questions 1–10 to Mock 1,
3. allocates 11–20 to Mock 2,
4. continues through questions 71–80 for Mock 8.

Because every domain has at least 80 items, the eight full 60-question AVORA mock forms can be delivered without reusing a question ID within the eight-form series for that class.

The official domain grouping remains unchanged:

- Paper I — Mathematics; Basic Science & Technology; English Studies; National Values Education.
- Paper II — Quantitative & Vocational Aptitude; Verbal Aptitude.

The official timing contract already used by AVORA remains 130 minutes for Paper I and 80 minutes for Paper II. AVORA's 60-question practice allocation remains clearly identified as AVORA's own design, not an asserted NECO item count.

## Academic safeguards

- Primary 5 and Primary 6 remain separate learner evidence.
- Wrong answers retain exact topic remediation routing.
- Historical NCEE years remain `REFERENCE_ONLY` with `reproduceQuestions:false` until reproduction rights are verified.
- The original V10.11 starter questions remain in source only as regression fixtures; live mocks use the expanded editorial bank.

## Verification

`node scripts/audit-ncee-v1012.mjs`

Result: **15/15 passed**.

The V10.11, V10.10 and base NCEE Prep audits were also rerun after this change and still pass.

A full Next.js/TypeScript production build still needs the project's installed dependencies and should be rerun on the user's actual AVORA environment before deployment.
