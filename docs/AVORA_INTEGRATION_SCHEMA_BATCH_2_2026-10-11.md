# AVORA weekly schema integration — batch 2 (2026-10-11)

**Target:** Neon project `lingering-bonus-74534876`, isolated branch `br-blue-scene-ayydvo7l`. Never production.

## Executed and verified
Individual SQL statements succeeded:
- `ALTER TABLE weekly_curriculum_objectives ADD COLUMN IF NOT EXISTS published_at timestamptz`
- `ALTER TABLE weekly_curriculum_objectives ADD COLUMN IF NOT EXISTS published_by uuid REFERENCES users(id) ON DELETE SET NULL`
- `ALTER TABLE weekly_curriculum_objectives ADD COLUMN IF NOT EXISTS source_page text`
- `ALTER TABLE weekly_curriculum_objectives ADD CONSTRAINT weekly_published_objective_review_guard CHECK (approval_status <> 'PUBLISHED' OR (reviewed_by IS NOT NULL AND published_by IS NOT NULL AND published_at IS NOT NULL AND day_index BETWEEN 1 AND 5))`
- `CREATE TABLE IF NOT EXISTS weekly_class_subjects` (5 columns)
- `CREATE TABLE IF NOT EXISTS weekly_student_optional_subjects` (3 columns; FK to class subjects)
- `CREATE TABLE IF NOT EXISTS weekly_term_calendar` (8 columns; Africa/Lagos default)
- `CREATE TABLE IF NOT EXISTS weekly_class_week_audit` (11 columns)

Verification against `information_schema.columns` returned those exact four table column counts and **16** columns on `weekly_curriculum_objectives`.

## Not yet complete
- The existing approval-status constraint on `weekly_curriculum_objectives` still permits only `DRAFT/REVIEWED/APPROVED/RETIRED`. Although the new guard constraint is installed, `PUBLISHED` is not yet accepted. **Do not claim publication works** until the old check is replaced in a reviewed migration.
- Many weekly tables from 048–058 remain absent.
- No runtime tests, no data insertions, no production migrations, no deployment.
- Do not mark migration 051 complete; only selected additive statements were applied.

## Next
Review and reconcile approval status constraint safely, complete remaining weekly schema dependencies in order, test routes, then update tracker with verified evidence.
