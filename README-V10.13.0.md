# AVORA V10.13.0 — NCEE Concrete Deep Teaching + Trial Learning Allowance

## NCEE teaching problem solved
The Common Entrance lesson surface no longer displays generic placeholder examples. Every Primary 5/6 mapped topic now resolves into a concrete deep-teaching lesson built from its own reviewed editorial-bank questions.

Each lesson now includes:
- prerequisite recall
- a topic/domain-specific big idea
- an explicit “why this works” explanation
- definitions before use
- an eight-stage teacher journey
- at least five concrete worked examples with choices, answers and reasoning
- guided and independent practice
- misconception repair
- mastery checks
- targeted prerequisite remediation

The language stays younger and gentler than JSS, while the instructional depth is preserved.

## 14-day trial assessment allowance
The product trial is now intentionally valuable without exposing the entire assessment product:
- **150 unique assessed/self-service questions per learner during the 14-day trial**
- **1 complete full mock per learner during trial**
  - NCEE full mock = 60 of the 150-question allowance
  - JSS full mock = 40 of the 150-question allowance
- **5-question initial diagnostic is separate and does not consume the 150 allowance**
- Deep lesson content remains available throughout the active trial.
- An admin-scheduled parent-supervised weekly Live Assessment is treated as trust/evidence experience and does not reduce the self-service question allowance.
- Paid families retain the complete assessment bank without trial caps (subject to normal product fair-use controls later).

Question exposure is recorded by learner identity, not browser/device, so refreshing or switching devices cannot create a fresh allowance. The existing family/learner trial identity controls continue to prevent trial reset through parent linking.

## Database
Migration `023_trial_learning_allowance.sql` adds:
- `trial_question_exposures`
- `trial_assessment_events`

## Verification
Run:
`npm run audit:ncee-v1013`

Full Next.js build/typecheck still requires installed project dependencies in the deployment/local environment.
