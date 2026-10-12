# Study settings and starting-check safety

Branch: `avora-academic-core-v1`, continuing from `719ae4a`. Scope: Phase 1d study-time preferences and starting-check safety, not completion of registration or the baseline assessment.

## Implemented

- `/weekly/settings` lets the authenticated student select After school, Evening or After dinner and an exact time. It loads persisted values, saves through the existing API, and provides retry/error/success states. The dashboard links to it.
- Preferences use the existing `weekly_student_study_settings` table. PostgreSQL formats times consistently as `HH:MM`; timezone is `Africa/Lagos`. No new table or migration.
- Student settings updates preserve `parent_weekly_summary_enabled`. Explicit attempts to change that guardian preference are rejected; compatible requests repeating its existing value are accepted without changing it. The student form never submits guardian settings.
- The starting-check API now requires the existing guardian/released-class context before reads or mutations. The first offer initializes a stable three-day postponement deadline; repeated reads/postponements cannot reset it. Legacy completed/in-progress records retain their original dates, including missing dates.
- `START` no longer marks an unassigned assessment in progress. It returns a clear not-ready response without writes, preserving completed records. There is still no implemented reviewed 20-question timed baseline runner: do not claim this safety fix is that assessment.
- Repeated-answer verification exposed tied transaction-start submission timestamps. Practice completion now records `clock_timestamp()` so latest-answer progress follows actual finish order rather than random UUID tie-breaks. Scores and replay handling are otherwise unchanged.

Study-time preferences can be saved before guardian activation because they expose only the student's own settings, not released learning or guardian-only controls. No reminders or guardian messages are sent by this screen.

## Verification

- 100 Node regression tests passed, including nine new onboarding handler tests, now included in GitHub Actions.
- Independent TypeScript passed; lint passed with zero errors and 11 existing warnings.
- Production build, all seven curriculum audits and 12 answer-marking checks passed. Existing source-backed lessons are untouched.
- Browser component checks passed at 360, 390, 412 and 1280 pixels: failed load/retry, persisted initial values, failed save/retry, successful save, reload persistence, guardian-preference preservation and no horizontal overflow/page errors. Existing dashboard/practice and Revisit browser flows also passed at those widths.
- 202 real route/database assertions passed on `br-blue-scene-ayydvo7l`, including time formatting, persistence/ownership, guardian setting preservation, baseline access, fixed postponement, legacy completed-state preservation and corrected latest-answer ordering. Identity checked before writes; all fixtures rolled back; a separate query confirmed no fixture users remained.
- Actual app health returned HTTP 200 with the database connected. An unauthenticated browser opening the settings page redirected to login. Browser fixtures simulate explicit authorized contexts; they do not verify or activate a real guardian workflow.

## Remaining Phase 1d Work

Reviewed class-appropriate baseline assignment/snapshots, timed autosave/submission, non-scored objective summaries, baseline-driven revisit/catch-up seeding, and once-daily study reminders remain unfinished. Verified guardian onboarding, English Daily and the remaining original roadmap are also incomplete.

No guardian activation, production mutation/connection, main merge, deployment, permanent fixture, fabricated lesson/question, or destructive database operation. The cloud interface still cannot expose an owner-accessible browser preview; component screenshots are test evidence, not a live student account.
