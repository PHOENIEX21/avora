# AVORA exam scheduling schema verification — 2026-10-12

Database: isolated Neon branch `br-blue-scene-ayydvo7l` in project `lingering-bonus-74534876`. Production untouched.

## Executed and verified
- Created `weekly_exam_overrides` with 12 columns and `weekly_exam_schedule_events` with 8 columns.
- Added `weekly_exam_overrides_exam_idx`.
- Added eight named CHECK constraints to the two tables for scope, time ordering, duration, nonempty scope IDs, late entry rule, status, event target exclusivity, and event type.
- Queried `information_schema.columns` to confirm column counts, and `information_schema.tables` to confirm 52 weekly_* tables.

## Important limitations
- Tables were created through smaller compatible SQL statements after larger statements were blocked. Their FK delete actions are not yet identical to migration 050; review before declaring exact migration parity.
- The `weekly_validate_exam_timing` trigger/function from 049–050 has not been installed/verified.
- Old objective/item publication status constraints still block PUBLISHED.
- No runtime API or end-to-end tests were run; do not mark migration 050 fully applied.
- Owner action is NOT required for safe additive work. If the connector blocks an essential destructive constraint replacement, provide the exact reviewed migration and instructions for owner approval/execution.

## Next
Compare full migration 050 schema and triggers, add remaining safe changes, run read-only readiness checks and source-backed tests. Follow original ZIP roadmap; no production deployment.
