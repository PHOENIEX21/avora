# AVORA weekly ↔ academic-core schema compatibility map

Verified 2026-10-11 against Neon development branches. **Do not run on production.**

## Critical runtime mismatch
The GitHub branch `avora-academic-core-v1` includes `app/api/admin/weekly/objectives/route.ts` and `app/api/admin/weekly/flags/route.ts`. Both query `weekly_*` tables. The corresponding Neon branch `avora-academic-core-v1-test` has **no** `weekly_curriculum_objectives`, `weekly_class_flags`, `weekly_class_week_state`, or `weekly_student_pins` tables. Those tables are present on `avora-weekly-phase1-validation`. The academic-core branch therefore cannot serve these routes without additional schema integration. The API currently responds 503 after the missing-table exception.

## Separate models; do not equate by name
| Academic-core model | Weekly validation model | Integration requirement |
| --- | --- | --- |
| `academic_daily_objectives` | `weekly_curriculum_objectives` | Daily objective refers to a schedule and has day index; weekly objective is class/subject/term/week with source and approval. Define explicit mapping and approval ownership. |
| `daily_assessments` | `weekly_items`, `weekly_english_daily_plan` | Assessment is not the same as a question or daily plan; preserve publication and marking rules. |
| `learner_objective_mastery` | `weekly_student_item_schedule` | Mastery aggregate differs from spaced-repetition item schedule. Keep separate. |
| `weekly_exam_blueprints` / `weekly_exam_versions` | `weekly_exams` / `weekly_exam_items` | Different lifecycle and question review model. Avoid duplicate exam releases or grading. |
| Existing `parent_profiles` / `parent_student_links` | `weekly_parent_pins` / `weekly_parent_consents` | Reconcile guardian identity and authorization; do not use PIN alone to establish parental relationship. |
| Existing `study_rooms` | `weekly_moderation_actions` | Enforce single-admin authority and remove teacher-facing permissions from target product. |

## Verified weekly branch columns
- `weekly_curriculum_objectives`: id, class_level, subject_name, term, week_number, curriculum_topic_id, topic_title, objective_text, source_reference, approval_status, reviewed_by, created_at, day_index, published_at, published_by, source_page.
- `weekly_class_flags`: class_level, enabled, pilot_term, pilot_week, updated_by, updated_at.
- `weekly_class_week_state`: class_level, term, current_week, mode, changed_by, changed_at.
- `weekly_student_pins`: student_id, pin_hash, failed_attempts, locked_until, updated_at.

## Required integration sequence
1. Inventory migration files and schema migration ledgers on both development branches.
2. Determine which migrations created weekly tables; verify additive DDL and foreign-key dependencies.
3. Create disposable Neon branch from academic-core testing state; apply compatible weekly DDL there only, never by copying rows blindly.
4. Run schema-drift tests for required routes and all class flags, preserving default disabled.
5. Add explicit mapping tests for objective, exam, guardian and mastery relationships.
6. Only then test student onboarding, daily tasks, admin review, and end-to-end pilot.

## Safety gates
No automatic publishing of generated curriculum or questions. No production migration, destructive SQL, or data copy. Keep all legacy learner progress intact.
