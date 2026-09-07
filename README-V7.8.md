# AVORA V7.8 — Scalable Assessment Engine

This build changes the exam centre from a single fixed 40-question experience into a repeat-aware assessment system.

## Included
- BECE and NCEE selection
- Mathematics and English Language
- Full Mock, Quick 10, Topic Test, Weakness Test
- Per-student question exposure history; unseen questions are preferred on later attempts
- Balanced full-paper selection rather than a fixed hard-coded paper
- Question metadata foundations for origin, curriculum objective, variant family and quality review
- 40+ starter English questions for BECE and NCEE, plus expanded NCEE Mathematics coverage
- Exam results continue into topic choice and AVORA Tutor
- Mobile public navigation exposes Parents and Schools before sign-in
- Signed-in mobile header uses the previously empty space for learner identity + Sign out

## Database
Run:
`node --env-file=.env.local scripts/migrate.mjs`
then:
`node --env-file=.env.local scripts/seed.mjs`

The migration is additive and does not delete existing learner data.

## Scale principle
100M learners do not require 100M separate copies of content. AVORA stores a reviewed content bank once, records exposure per learner, and assembles different curriculum-balanced papers from that bank. The architecture can grow from thousands to hundreds of thousands of reviewed questions without changing the student-facing exam model.
