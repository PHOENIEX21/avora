# AVORA V7.15 — Learning Flow Reliability

This release fixes four connected student-learning failures:

1. **Diagnostic is no longer a permanent Home gate.** `/welcome` remains the real Home after onboarding. An incomplete diagnostic appears as a prominent Start Here task. The diagnostic itself now stops after five questions instead of continuing through the whole question bank. Existing learners with five or more diagnostic answers are finalized automatically when Home loads.

2. **A learner-selected topic stays selected.** Learn now starts five focused evidence questions for the chosen topic. After five independent attempts AVORA hands the learner into the Tutor lesson for that same topic. Explicit topic study can no longer silently jump to another weak topic. General Practice may still adapt automatically.

3. **Answer checking is more reliable.** Practice, Tutor and Exam now share one answer-equivalence engine. It accepts harmless formatting differences such as case/spacing, numeric units/currency formatting, `75` versus `75%` where the stored percentage answer is 75, equivalent fractions/decimals where mathematically identical, and legacy A/B/C/D answer storage.

4. **Neon connection timeouts no longer crash Learn.** Database connection timeout is increased and the Learn page retries transient connection failures. If Neon is temporarily unavailable, the student gets a recovery screen instead of a raw Next.js runtime error.

Also included: the current development origin `10.2.0.194` in `next.config.ts`, and exam question exposure correctness is updated on exam submission.

No database migration is required.
