# AVORA integration schema — consolidated batch 8 (2026-10-12)

**Target:** Neon project `lingering-bonus-74534876`, isolated integration branch `br-blue-scene-ayydvo7l`. Production untouched.

## Executed successfully
Using individual additive statements based on source migrations 052–058:
- Unmapped-content queue and review index.
- Parent consent and PIN tables, question reports, admin audit log.
- Topic question sets, memberships, rotations and event audit.
- Guardian challenge table with verification timestamp.
- Student study settings, baseline state, baseline attempts.
- Indexes for question review, admin audit, question membership, guardian pending/verified challenges and baseline attempts.

## Verification
Queried `information_schema.tables` and verified **49 weekly_* tables** exist on isolated integration branch. Existing 5 weekly exam tables were present before the batches. Queried constraints: `weekly_curriculum_objectives` still has both the original restrictive `weekly_curriculum_objectives_approval_status_check` and the new `weekly_objective_extended_status_check`. This means IN_REVIEW/PUBLISHED **still cannot be stored** until the old constraint is safely replaced.

## Not completed
- Migration 051 has further objects such as moderation actions and a phase marker. Check full file for omissions.
- Migration 048 and 049–050 have remaining indexes, triggers or alterations; no migration has been marked complete in schema_migrations.
- Objective status constraint replacement requires deliberate review; no destructive SQL executed.
- App/API compatibility, permission boundaries, exam scoring and scheduler tests remain pending.
- No production changes, Vercel deployment, or GitHub main merge.

## Next agent
Review the full 048–058 source SQL against this isolated database before any ledger changes. Prefer read-only schema diffs and reversible changes. Resume sequentially with schema compatibility and tests; do not jump to Dawn UI prematurely.
