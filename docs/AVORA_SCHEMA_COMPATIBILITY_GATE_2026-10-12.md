# AVORA isolated integration schema — compatibility gate (2026-10-12)

**Scope:** Neon project `lingering-bonus-74534876`, branch `br-blue-scene-ayydvo7l`. Production remains unchanged.

## Verified this session
- `weekly_moderation_actions` was successfully created after verifying both `study_rooms` and `study_room_posts` dependencies exist. Added `weekly_moderation_room_idx`. Read-only table inventory now confirms **50 weekly_* tables**.
- `weekly_curriculum_objectives`, `weekly_items`, `weekly_class_flags`, and `weekly_moderation_actions` each contain **0 rows** in this isolated branch.
- `weekly_published_objectives_idx` exists.
- Inspected current GitHub routes `app/api/admin/weekly/objectives/route.ts` and `app/api/admin/weekly/flags/route.ts`. Objectives import requires DRAFT status, class, subject, term, week and weekday; flags activation requires 5 distinct published weekdays and matching class week state. These routes were reviewed, **not runtime-tested**.
- Current objective approval check permits only `DRAFT/REVIEWED/APPROVED/RETIRED`. A second, broader check permits `IN_REVIEW/PUBLISHED`, but the first check still blocks both. Item status similarly permits only `DRAFT/IN_REVIEW/APPROVED/RETIRED`. Thus publishing is **blocked**, and the current pilot flag route correctly remains default-deny.
- Do not assume all migrations 048–058 are complete from table counts; 049–050 include procedural SQL, 051 has additional objects/constraints and schema ledger must stay truthful.

## Planned reviewed constraint migration
Existing `database/migrations/051_weekly_phase1_foundations.sql` intentionally replaces two narrow status checks and adds a published-item guard. This is a constraint replacement (DROP), and Neon connector explicitly requires owner approval before destructive SQL, even on an isolated branch. **Do not execute the DROP autonomously.** After approval, use an atomic transaction to replace the old checks, with a prior data audit and postcondition tests; no live rows currently exist in these two tables.

## Next safe work without owner action
1. Review other 048–058 DDL for non-destructive missing indexes and constraints, then apply only additive operations on isolated branch.
2. Add non-mutating, fail-closed schema-readiness diagnostics/tests to GitHub; ensure status conflict is surfaced rather than treated as ready.
3. Review source-backed class-level permissions and scheduler/exam logic and run existing GitHub CI; continue implementation in phase order.
4. Do not touch production, merge main or deploy Vercel without approval.

**Handover:** Read `AGENTS.md`, `docs/AVORA_IMPLEMENTATION_TRACKER.md`, this file and original ZIP specification in Library.
