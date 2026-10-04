# AVORA V9.0.5 — Universal Deep Teaching Standard

This release applies AVORA's concept-first teaching standard to every Tutor unit in Mathematics and English, not only selected deep banks.

## Universal teaching sequence
Every Tutor unit now follows the same minimum teaching contract:

1. Why the idea matters.
2. What the learner should understand by the end.
3. Prerequisite/foundation bridge before examples.
4. Every key term defined separately.
5. Every key term followed by why it matters/how to use it.
6. Core explanation broken into small reasoning stages.
7. Worked example analysed by reasoning, not only displayed.
8. Curated deep units keep their multiple worked examples.
9. Units without a curated bank receive an explicit second contrast/transfer example stage rather than jumping directly to a test.
10. Common misconceptions are explained as broken rules/evidence, not merely labelled wrong.
11. A mastery checklist appears before the learner is tested.
12. The final checkpoint asks for the rule/evidence/reasoning, not only the final answer.

## Subject-aware reasoning
Mathematics prompts learners to identify what is given, what must be found, why an operation/formula applies, what changes at each line, and how to check units/relationships.

English prompts learners to identify the exact word, phrase, structure, context or passage evidence that controls an answer and to explain why alternatives fail.

## Quality gate
`npm run test:v905` verifies that the universal depth engine is connected to all Tutor units. It is included in `npm run launch:check`.

No database migration or seed is required.
