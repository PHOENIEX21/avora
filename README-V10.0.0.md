# AVORA V10.0.0 — Revised-2025 Academic Rebuild + Assessment Parity

This release is the post-reconciliation launch candidate for Mathematics and English across the currently served Nigerian JSS cohorts.

## Curriculum versioning

- Current JSS1 and JSS2: mapped to NERDC's New Revised Basic Education Curriculum introduced from September 2025 and rolled forward yearly from the JSS1 entry point.
- Current JSS3: remains on the prior-cycle JSS curriculum until that cohort exits, avoiding an academically incorrect mid-cycle switch.
- AVORA records whether a revised topic is directly official-revised or official-plus-current-scheme cross-checked. It does not represent secondary scheme wording as verbatim NERDC extraction.

## Rebuilt current JSS1/JSS2 map

The current-cohort overlay contains 111 class-specific curriculum entries:

- JSS1 Mathematics: 23
- JSS1 English Language: 29
- JSS2 Mathematics: 22
- JSS2 English Language: 37

Every current entry resolves to a deep AVORA teaching record. Existing valid lessons were retained as evidence components, while 23 new/reorganised competencies received fresh deep lessons.

## Independent assessment parity

The JSS1/JSS2 assessment bank is regenerated from the reconciled current curriculum:

- 888 reviewed AVORA-original questions
- exactly 8 questions for each of the 111 current topics
- 111 curriculum-linked independent performance/mastery tasks
- concept, application, misconception, objective, transfer and mastery evidence per topic
- class + subject + curriculum-topic routing in Practice, Diagnostic and Exam Centre
- superseded V9.9 current-cohort questions are archived by the seed step rather than mixed into current evidence

Performance tasks remain necessary for productive skills such as writing and oral-language work; multiple-choice recognition alone must not be interpreted as complete productive skill evidence.

## Launch hardening

- Live Learn/Tutor topic menus are driven by the cohort-correct curriculum inventory.
- Tutor and Tutor Chat resolve revised JSS1/JSS2 deep lessons and current JSS3 prior-cycle lessons.
- Exam Centre and Practice select the learner's actual class bank.
- Past-year BECE mode remains JSS3-only.
- Production preflight checks exact JSS1/JSS2 topic footprint and at least 8 reviewed questions per current topic.
- Registration/database/email guards from the prior launch candidate remain preserved.

## Verification completed in build workspace

`npm run launch:check` passes completely, including curriculum, academic trust, Tutor behavior, assessment parity, revised-2025 reconciliation, TypeScript and ESLint. ESLint reports 0 errors and 14 non-blocking warnings.

A Linux production `next build` could not complete in the build workspace because Next.js attempted to download the Linux SWC binary and the sandbox has no registry network access. This is an environment dependency-fetch limitation, not a TypeScript/application assertion failure. Run the production build on the target Windows/deployment environment after `npm install`.

The real Neon + SendGrid `npm run preflight` must also run in the target project because `.env.local` is intentionally excluded from release archives.

## Final local gate before deployment

Keep the existing `.env.local`, then run:

```bash
npm install
npm run db:migrate
npm run launch:check
npm run preflight
npm run build
```

Do not deploy if any command exits non-zero.
