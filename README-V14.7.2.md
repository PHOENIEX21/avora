# AVORA V14.7.2 — Answer Marking + Admin Spacing Audit

This release hardens the learner answer-verdict contract and improves Academic Operations spacing.

## Answer verdict contract
- Practice now marks the learner answer before the evidence-write transaction.
- If the question was read successfully but Neon fails during evidence persistence, AVORA still displays **CORRECT** or **NOT CORRECT YET**.
- Unsaved evidence does not advance the session counter and exposes **Retry saving evidence**.
- Practice, guided-step checking, standard exam marking, live-assessment marking and NCEE mock marking use the shared `answerIsCorrect` matcher.
- A dedicated answer-marking test checks exact text, punctuation/case tolerance, numeric formatting, fractions, percentages, MCQ text/letter forms and every one of the 888 reviewed JSS1/JSS2 assessment-bank questions/distractors.

## Admin dashboard
- Increased spacing between KPI cards, primary action cards, detail panels and search controls.
- Preserved single-column responsive behaviour on smaller screens.

## Runtime truth
Static audits and local compiler/build gates do not prove Neon, Gemini, email, Paystack or Vercel are reachable in production. Live authenticated smoke testing remains required after deployment.
