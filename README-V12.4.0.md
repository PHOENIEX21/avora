# AVORA V12.4.0 — Answer-First Exercise Coaching

This build strengthens the teaching contract without changing authentication, billing, database migrations, or deployment configuration.

## Added
- Practice remains answer-first: targeted teaching is locked until the learner submits an attempt.
- New `/api/practice/explain` diagnoses a submitted attempt as partial, incomplete, or incorrect and preserves correct work.
- The explanation gives one next move instead of dumping the final answer.
- Practice UI now exposes **Explain this exercise from my attempt** only after an incorrect attempt.
- Learners can continue their own answer after targeted coaching.
- Factorisation teaching now includes the foundational multiplying-two-brackets prerequisite: numerical distribution → single-term algebraic distribution → bracket-by-bracket distribution → like-term collection → later factorisation.
- FOIL is explicitly treated as a shortcut label, not the underlying reason.

## Pedagogical rule
Attempt → check → diagnose → preserve correct steps → one targeted prompt → learner retries → fresh independent evidence.

A correct half-solution is not labelled simply wrong. AVORA should identify that the learner is correct so far and guide the next legal step.
