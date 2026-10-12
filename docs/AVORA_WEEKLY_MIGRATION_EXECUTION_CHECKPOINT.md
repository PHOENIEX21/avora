# Weekly migration execution checkpoint — 2026-10-11

**Status: BLOCKED / UNVERIFIED.** Do not report these migrations as applied.

## Discovered source migrations
GitHub branch `avora-academic-core-v1` contains:
- `database/migrations/048_weekly_restructure_phase1.sql`
- `049_weekly_weekday_exam_revision.sql`
- `050_flexible_exam_scheduling.sql`
- `051_weekly_phase1_foundations.sql`
- `052_weekly_unmapped_teacher_queue.sql`
- `053_owner_only_parent_foundations.sql`
- `054_weekly_question_sets.sql`
- `055_guardian_challenge_foundations.sql`
- `056_guardian_challenge_verification_result.sql`
- `057_weekly_student_onboarding.sql`
- `058_weekly_baseline_attempts.sql`

Migration 048 introduces weekly objectives/items/schedules/notifications. Migration 051 upgrades objective approval statuses to include `IN_REVIEW` and `PUBLISHED`, as required by the API; **do not test publishing against only migration 048**. Migration 049/050 contain procedural SQL (`$$` blocks), so naive semicolon splitting is unsafe. Some migration files contain constraint-drop DDL, requiring explicit safety review before execution.

## Attempted execution
- Target was isolated Neon integration branch `br-blue-scene-ayydvo7l`, never production.
- A multi-statement call to `run_sql` for 048 was rejected because the API accepts one prepared statement.
- A subsequent `run_sql_transaction` attempt for 048 returned an unspecified error. No success was reported.
- A follow-up table verification was blocked by safety checks. Therefore the branch's post-attempt schema state **has not been verified**.
- Next agent must independently inspect the branch's tables and migration state before retrying anything. Never assume a failed/ambiguous tool response means either full success or no changes.

## Safe continuation
1. Read original master ZIP from ChatGPT Library `/AVORA/Source Specification/AVORA_MASTER_RESTRUCTURE_AND_23_DESIGNS_2026-10-11.zip`.
2. Review all migration 048–058 DDL for idempotency, dependencies, procedural blocks and potential destructive operations.
3. Verify isolated integration branch state; do not rerun DDL blindly.
4. Use a reliable migration runner that supports full PostgreSQL scripts and transaction boundaries; get explicit approval for destructive changes.
5. Run schema and runtime tests; update implementation tracker only after evidence.

No production deployment or production migration was intentionally executed in this checkpoint.
