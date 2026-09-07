# AVORA V7.11 — Trust & Evidence Layer

This release makes learner progress more academically honest and adds an automated content-bank quality gate.

## Trust changes
- Unattempted skills no longer display a misleading 0% mastery.
- Progress explicitly shows evidence strength.
- Mastery requires repeated independent evidence (minimum five answers at the current rule).
- Tutor-guided learning is described separately from independent proof.
- Added a parent/teacher-facing explanation of what AVORA will not claim.

## Question-bank reliability audit
Run:
`node --env-file=.env.local scripts/audit-question-bank.mjs`

The audit checks every published question for duplicate prompts, broken curriculum links, missing exam/provenance/explanations, invalid MCQ options, and correct answers that are not present in the choices. It exits non-zero when it finds a quality problem, so it can later be used as a deployment gate.

No database migration is required for V7.11.
