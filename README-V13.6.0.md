# AVORA V13.6.0 — 12 Authored Mock Exams Integrated

V13.6 adds the complete two-set JSS mock collection supplied by the user without replacing the 888-question independent bank or the V13 Master Curriculum.

## Collection
- JSS1 Mathematics — Set 1, Set 2
- JSS1 English Language — Set 1, Set 2
- JSS2 Mathematics — Set 1, Set 2
- JSS2 English Language — Set 1, Set 2
- JSS3 Mathematics — Set 1, Set 2
- JSS3 English Language — Set 1, Set 2
- 12 source files preserved verbatim
- 370 numbered CBT/structured-response items extracted from the supplied sources

## Runtime flow
Exam Centre → choose subject → Mock Set 1 / 2 → fixed authored order → submit → existing evidence engine → topic analysis → remediation plan → Tutor recovery.

The authored mocks are isolated with `assessment_kind='AUTHORED_MOCK'`; normal Fresh Full Mock / Quick / Topic / Weakness modes continue to use the existing reviewed bank and cannot accidentally mix fixed mock questions into a generated paper.

## Database
Migration `027_authored_mock_exams.sql` adds mock identity fields and `authored_mock_papers`, which retains the complete source Markdown including theory/composition material. `scripts/seed-authored-mock-exams.mjs` seeds the numbered assessment items into the existing `questions`/`skills` engine rather than creating a second assessment architecture.

## Trial
An authored mock counts as the learner's one complete JSS full mock during the 14-day trial and also consumes the existing 150-question self-service allowance. Linking to a family does not reset those learner-bound limits.

## Important source boundary
The source files include theory/composition sections that are preserved in `authored_mock_papers.raw_markdown`. V13.6's scored CBT session imports the numbered items that have explicit supplied answers. The fixed CBT session scores the 370 numbered items. English open short responses are semantically marked against the supplied answer guidance when `AI_API_KEY` is available, with deterministic exact-answer fallback. Mathematics theory and English composition sections are preserved verbatim in `authored_mock_papers.raw_markdown`; they are not falsely auto-scored by exact-string comparison. A rubric-based extended-response layer is still required before those source sections can contribute automated marks.
