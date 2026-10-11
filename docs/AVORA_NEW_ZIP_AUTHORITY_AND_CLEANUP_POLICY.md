# AVORA restructure: source-of-truth and conflict cleanup policy

Owner direction (2026-10-12): **Implement the latest uploaded ZIP, not preserve obsolete implementation.** Anything conflicting with the ZIP and genuinely unnecessary should be removed.

## Decision order
1. The latest ZIP's full functional specification is the product contract; its 23 interface references govern the later visual phase.
2. Protect actual student accounts, answers, progress, assignments, uploads, consent and audit records. Never discard learner data merely to simplify migration.
3. Reuse compatible implementation. Refactor contradictory implementation. Remove obsolete code, flags, UI and schema only after a dependency/data-use audit and a safe migration/rollback plan.
4. Single owner admin; parents operate inside student experience behind their own PIN. Do not enable teachers/schools/staff roles from older drafts.
5. Never serve unreviewed curriculum, unapproved question items or invented content. Preserve default-deny class flags.
6. Do not build duplicate sources of truth across academic_daily_* and weekly_* families: select canonical paths through explicit reconciliation before production release.
7. Phase sequence remains 0, 1, 1c, 1d, 2, 2b, 3, 3b, 3c, 4, 4g, 5, 6, 6b, 7, 8, 8b, 9, 10, 10b, 11, 12. Design reconstruction is phase 10, not the current step.

## Concrete conflicts
- The narrow CHECK on weekly_curriculum_objectives.approval_status disallows IN_REVIEW and PUBLISHED even though migration 051 and the admin class flag route require PUBLISHED.
- The narrow CHECK on weekly_items.status similarly disallows PUBLISHED.
- Existing 051 migration replaces these constraints and adds published-item review guard; it should be used as the basis for reviewed replacement. **An attempted isolated-branch transaction was blocked by connector safety checks**; no replacement was verified. Do not report publication as operational.
- Migration 051's weekly_teacher_class_permissions belongs to an older multi-teacher draft and is not a required feature for the owner-only ZIP. Do not create or activate teacher permissions just to match that old migration. Preserve any preexisting table until dependency audit confirms safe cleanup.
- All 048–058 migrations remain only partially applied to isolated integration branch; do not backfill schema_migrations with false completion.

## Required before removals
Produce dependency inventory (SQL references, routes, types, feature flags, background jobs, existing row counts), classify KEEP/ADAPT/REMOVE, write a reversible migration, run against isolated branch, verify data and behavior, then request owner approval before production.

## Working continuity
GitHub branch: avora-academic-core-v1. Isolated Neon integration: br-blue-scene-ayydvo7l, project lingering-bonus-74534876. Read AGENTS.md, docs/AVORA_IMPLEMENTATION_TRACKER.md, and original ZIP. Proceed with non-destructive work without waiting for repeated 'continue' messages; do not promise background execution after the turn.
