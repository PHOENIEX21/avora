# AVORA Phase 1 validation and migration reconciliation

## Source and scope
Approved Phase 1 only. The Dawn screenshots and design-reference ZIP define future UI; **no mockup content is seeded**. Five independently tracked Dawn tasks; teachers and school admins may change a class week; subjects are core or optional by class.

## Existing schema ledger
The production `schema_migrations` ledger has 32 filenames, ending at `032_ai_gateway_email_launch.sql`, although some later structures already exist. The repository contains duplicate migration number prefixes 037, 038 and 039 (identity is full filename). **Do not backfill missing ledger rows without independently verifying their exact effects. Do not run `npm run db:migrate` against production until reconciled.** The script executes all unrecorded files in sorted order, so replaying 033–050 on production is not presently approved.

## Validated isolated branch
Project: `lingering-bonus-74534876`. Validation branch: `br-patient-rice-ayghqro8`. Existing 048, 049 and 050 are present there. Migration 051 was applied atomically there with 31 statements, successfully. It is not installed on the primary branch.

Post-migration checks: 35 `weekly_*` tables; 0 enabled class flags; 0 published objectives; 0 published items; 1 phase1 schema marker; 9 pre-existing study rooms and 1 pre-existing upload, matching primary counts. Production has 0 `weekly_*` tables.

## Schema acceptance criteria
- Objective and question status support DRAFT, IN_REVIEW, APPROVED, PUBLISHED and RETIRED. Publication requires reviewer evidence and published metadata. Import defaults to DRAFT.
- Subject classification CORE/OPTIONAL; optional enrollments separate from core subjects.
- Term calendar, held/auto class week, assigned teacher week-change permission, and append-only week-change audit structure.
- English Daily plan references exactly five word IDs plus rule, oral lesson and sentence-task set; vocabulary, rule, oral and audio assets are stored separately and default to DRAFT.
- CBT sessions, encouragement messages/log, content batches, moderation actions and separate photo-consent records.
- Existing academic and community data untouched. New tables have no seeded sample educational content.

## Outstanding before Phase 2
1. Reconcile historical 033–047 migration contents with the production schema, in a disposable clone, before any primary DB deployment.
2. Add server-side publication and class-week release gates, and teacher authorization checks when implementing Phase 2/3 APIs; existing prototype objectives API exposes APPROVED data and must **not** be enabled for learners before it is corrected.
3. Resolve open decisions about audio standard, revisit eligibility, reviewers, photo consent method and notification provider in their respective phases.
4. Validate that the production migration runner can apply all intended changes from a clean clone, and record the exact ledger entries only after successful verification.

## Rollback and preservation
Feature-flag rollback: disable the relevant `weekly_class_flags.enabled` entries, leaving data intact. Database rollback is a separate, approval-gated operation: first confirm all newly introduced Phase 1 tables are empty, then remove only migration 051 additions in reverse dependency order. **Do not drop tables or constraints automatically**, and do not remove 048–050 structures as part of a 051 rollback. Restore from a branch snapshot if data has been written. This plan is deliberately not an executable destructive migration.
