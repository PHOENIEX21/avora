# AVORA V13.0.0 — Master Curriculum Replacement

V13 replaces the former parallel curriculum registries with the user-supplied **Avora Complete Curriculum (NERDC-Aligned)** as AVORA's single runtime topic inventory.

## Runtime authority
- `lib/masterCurriculum.ts` — 96 stable master topics.
- `data/curriculum-sources/2026-09-12/MASTER-CURRICULUM.md` — preserved uploaded master index.
- `lib/curriculumAuthority.ts` — now derives its inventory only from the master curriculum.
- `lib/curriculumTutor.ts` — surfaces only master topics and builds teaching from source-backed runtime units.
- `lib/curriculumCoverage.ts` — coverage is measured by source-backed teaching units, not old revised/legacy registries.

## Deep teaching retained
All 20 supplied deep curriculum documents remain compiled into:
- 151 source-backed lesson units
- 2,019 ordered teaching steps
- 513 learner-first checkpoints

Every one of the 96 master topics has at least one source-backed runtime teaching unit.

## Assessment compatibility
Old database topic labels are not shown as curriculum topics. `lib/masterTopicAliases.ts` maps them underneath the master topics so existing reviewed Practice/Tutor/Exam questions remain retrievable while the database is progressively re-keyed.

## Release gate
`npm run audit:v13-master-curriculum` must pass before release.
`npm run launch:check` now uses the V13 authority gate instead of obsolete revised-2025 reconciliation.
