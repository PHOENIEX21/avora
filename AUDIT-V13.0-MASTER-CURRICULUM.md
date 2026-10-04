# AVORA V13.0.0 — Master Curriculum Replacement Audit

## Runtime authority
- Master curriculum topics: 96
- JSS1 Mathematics: 25
- JSS1 English Language: 15
- JSS2 Mathematics: 14
- JSS2 English Language: 15
- JSS3 Mathematics: 13
- JSS3 English Language: 14
- Missing master topics with no source-backed teaching: 0
- Source units targeting obsolete curriculum topics: 0

## Deep source layer retained
- Supplied deep curriculum documents: 20
- Source-backed lesson units: 151
- Ordered teaching steps: 2,019
- Learner-first checkpoints: 513
- Complete source term courses: 18

## Audits
- V13 Master Curriculum: 20/20 PASS
- V12.8 Source Truth: 24/24 PASS
- Deep Teaching Standard: 12/12 PASS
- Assessment compatibility/parity: 20/20 PASS
- V12.7 Security Hardening: 14/14 PASS
- Visual teaching mapping: 39/39 PASS
- Changed-source TypeScript/TSX syntax transpilation: PASS

## Architecture boundary
The old revised/legacy curriculum files remain in the repository only as historical/assessment compatibility material. They are not imported by the runtime curriculum authority or Tutor topic adapter.

Existing reviewed assessment-bank labels are resolved through `lib/masterTopicAliases.ts`; these aliases are not shown to learners as curriculum topics.

## Build-environment limitation
This package does not contain `node_modules`. A dependency-backed `npm run typecheck`, `npm run lint`, and `npm run build` must still be run after `npm ci` on the user's machine/deployment environment.
