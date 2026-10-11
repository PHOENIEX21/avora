# Isolated database publication gate verified — 2026-10-12

The owner executed `database/manual/weekly_status_constraints_isolated_only.sql` in Neon SQL Editor and reported successful BEGIN, four ALTER statements, COMMIT, and SELECT 2.

Independently queried Neon project `lingering-bonus-74534876`, branch `br-blue-scene-ayydvo7l`:

- `weekly_curriculum_objectives_approval_status_check` permits `DRAFT`, `IN_REVIEW`, `REVIEWED`, `APPROVED`, `PUBLISHED`, `RETIRED`.
- `weekly_items_status_check` permits `DRAFT`, `IN_REVIEW`, `APPROVED`, `PUBLISHED`, `RETIRED`.
- Exactly 52 tables whose names begin `weekly_` were visible in `public`.

The obsolete narrow status checks are resolved **on the isolated integration branch only**. Production branch `br-blue-lab-ayq111cy` was not changed by this verification.

Remaining: verify application API, question-bank/exam readiness gates, end-to-end weekly flows, migrations/triggers, and GitHub CI. Do not equate successful schema check with launch readiness.
