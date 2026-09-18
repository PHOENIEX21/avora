# AVORA V8.5 — Deep Curriculum Grounding

This release prioritises teaching depth over UI expansion.

## Academic grounding
- Catalogues the 18 official Sierra Leone MBSSE JSS pupil handbooks (JSS1–JSS3, Mathematics + Language Arts, Terms 1–3) as cross-curriculum depth references.
- Nigeria/NERDC remains AVORA's target curriculum for the Nigerian product.
- MBSSE material is marked reference/non-commercial; it is not treated as AVORA-owned commercial content.
- Adds source-derived scope anchors (short lesson-title maps only) so Tutor can show how a unit is being cross-checked for completeness.

## Tutor reliability
- A missing reviewed question can no longer make a curriculum lesson blank. Tutor can teach the mapped lesson first and attach reviewed assessment later.
- Deep-example checkpoints now display the actual example-specific question rather than incorrectly repeating the unit's generic check.
- Next is disabled at a teaching checkpoint until the learner has answered and AVORA has responded.
- Generic units now receive an unpack-the-example stage, a guided variation, and explicit exam-transfer reasoning instead of one displayed example and immediate progression.

## Expanded deep banks
- Simultaneous equations: elimination, matching coefficients, multiplication before elimination, substitution, word problems.
- Fractions/decimals/percentages.
- Linear equations.
- BODMAS/order of operations.
- Area of plane shapes.
- English concord.
- Oral English sound contrasts.
- Comprehension from evidence.
- Writing/composition planning and paragraph development.

## Quality gate
Run:
`npm run audit:teaching`

The audit checks that core Mathematics/English maps and required TutorUnit teaching fields are present and that high-risk curated deep banks have not disappeared.
