# AVORA V14.8.0 — NCEE Source Integration

This release integrates the uploaded NCEE Primary 5/6 source pack without flattening raw Markdown into learner narration.

## What is active
- All 25 uploaded Markdown files are preserved under `data/ncee-sources/v14.8/` with SHA-256 hashes recorded in `data/ncee-source-content-v14.8.json`.
- 18 lesson source files compile into 110 source entries.
- 101 entries contain actual explanation and/or worked-example content and are eligible for the learner lesson route.
- 9 entries contain practice questions only. They are explicitly marked `PRACTICE_ONLY` and cannot be opened as teaching lessons. AVORA does not invent an explanation just to make an audit pass.
- Author instructions, raw Markdown tables, JSS provenance markers, and dynamic “current President” prompts are excluded from static learner narration.
- The common-entrance browser and topic page use the source-backed runtime (`lib/nceeSourceRuntime.ts`).
- Board text and narration are separate fields in the runtime instead of one raw text stream.

## Uploaded mock-set handling
The six uploaded CBT mock files are preserved as source material but are not silently merged into the live 960-question editorial bank. Five of the six have severe answer-position bias (>70% of parseable keyed answers in one letter position; several are 100% A). Activating them unchanged would teach test-taking by position rather than knowledge. They remain quarantined until they are independently reviewed and rebalanced.

The existing live NCEE mock engine remains the AVORA-original two-paper engine with server-side answer saving/grading and the reviewed editorial question bank.

## Official structure check
AVORA retains the 2026 NECO structure already implemented in `lib/nceePrep.ts`:
- Paper I: Mathematics + Basic Science & Technology; English Studies + National Values Education — 130 minutes.
- Paper II: Quantitative & Vocational Aptitude; Verbal Aptitude — 80 minutes.

The uploaded curriculum document's “40/40/60, 140 marks, 2hrs 30min” statement is not promoted to the live exam structure because the official 2026 NECO timetable/general information identifies the two-paper structure above.

## Verification completed in this environment
- `audit:ncee-prep` — 13/13 PASS
- `audit:ncee-v1010` — 15/15 PASS
- `audit:ncee-v1011` — 13/13 PASS
- `audit:ncee-v1012` — 15/15 PASS
- `audit:ncee-v1013` — 13/13 PASS
- `audit:v14.8-ncee-source` — 23/23 PASS

## Compiler/build status
A clean dependency reinstall could not complete inside the sandbox because the npm install timed out after the inherited partial `node_modules` tree was removed. Therefore this release does **not** claim a completed `typecheck`, `lint`, or `next build` in the sandbox. Run those locally before deployment.

## Local verification
Preserve `.env.local`, then run:

```powershell
npm install
npm run build:ncee-source
npm run audit:v14.8-ncee-source
npm run typecheck
npm run lint
npm run build
npm run launch:check
```

No database migration is introduced by V14.8.0.
