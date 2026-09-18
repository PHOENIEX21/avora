# AVORA V14.7.0 — Teacher Script Runtime

This release changes the lesson presentation model from “read source lines aloud” to a learner-facing teacher-script runtime.

## Core change

Curriculum/source material remains the academic truth layer, but raw source lines are no longer the presentation layer. `lib/lessonPresentation.ts` filters author instructions, markdown table scaffolding, source/provenance markers and class-term references, then composes learner-facing board/voice moments.

## Factorization no-jump bridge

Factorization now explicitly establishes:
- standard quadratic form `ax² + bx + c` (and `= 0` when solving an equation),
- meaning of `a`, `b`, `c`, including unwritten coefficient 1,
- why splitting `bx` into `mx + nx` requires `m+n=b`,
- why grouping requires `mn=ac`,
- explicit candidate-pair comparison,
- splitting/grouping only after both conditions are satisfied,
- verification by expansion.

## Learner-facing cleanup

The board no longer shows internal `teach-*` step ids, `SOURCE STEP` labels, source file/provenance text, or author directions such as “AVORA should…”.

## Validation

Run:

```powershell
npm install
npm run typecheck
npm run lint
npm run build
npm run audit:v14.7-teacher-runtime
npm run launch:check
```
