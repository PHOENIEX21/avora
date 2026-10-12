# Daily Revisit milestone

Development branch: `avora-academic-core-v1`; continues the verified weekly workspace and retention scheduler. The full restructuring specification remains `docs/source/avora-spec.md`.

## Implemented

- `/weekly/revisit` uses the existing practice runner and is linked from the weekly dashboard. Both page and API require the existing student/guardian/released-class gate.
- Daily Revisit draws only due items belonging to published objectives in the student's released class/weeks and active core or enrolled optional subjects. Questions require published reviewed MCQs, a defensible key, LIVE membership in the matching topic bank, and fewer than three pending distinct-student reports.
- Confident mistakes are served first, followed by due date. A daily set contains at most eight questions. Student-row locking serializes set creation; unfinished sets resume, and a set completed today is returned again instead of generating more questions. Dates use `Africa/Lagos` in PostgreSQL.
- Existing `weekly_cbt_sessions`, `weekly_cbt_answers`, and `weekly_student_item_schedule` persist the set, original content/key snapshot, confidence, marking, scores, and next intervals. No competing model, new table, or migration is introduced.
- Each Revisit snapshot retains the objective identity. Completed answers contribute distinct evidence to the appropriate current or historical objective; unpublished/incomplete answers do not count.
- Snapshots record the scheduled interval and whether a genuine 21-calendar-day revisit is due. The dashboard shows recorded retention only when completed evidence exists, with guessed correct answers distinguished from retained answers.
- Empty approved pools show an honest empty state. No fallback questions, generated curriculum, or fabricated scores are shipped.
- Practice reads now explicitly reject official exam sources/modes so saved exam snapshots cannot expose corrections through the practice API.

## Verification

- 91 regression tests passed, including 21 weekly-workspace tests.
- 177 real route/database assertions passed on Neon branch `br-blue-scene-ayydvo7l`. Identity checked before writes; all fixtures rolled back; a separate query confirmed no fixture users remained.
- Integration covers cap/resume, confident mistakes, future/draft/other-class/unenrolled optional exclusion, retired/reserve/not-yet-due exclusion, marking and stored counts, cross-objective evidence, retention, duplicate finish, daily set replay, foreign ownership, empty pools, and official-exam protection.
- The first expanded integration run failed because a test-only optional objective omitted required reviewer metadata. Corrected the fixture, kept the publication constraint intact, reran successfully. These fixtures are rollback-only and are never published learner content.
- TypeScript and production build passed. Build skips type validation, so the independent typecheck is mandatory.
- All seven curriculum audits and 12 answer-marking checks passed. Existing source-backed deep lessons and banks are preserved.
- Browser component workflows passed at 360, 390, 412 and 1280 pixels for both existing dashboard/practice and new Revisit: answer feedback, reload/resume, completion, empty state, no horizontal overflow/page errors. Fixtures are explicitly labelled test-only; this is not a live guardian onboarding E2E.
- Lint passed with zero errors and 11 existing warnings. Remote CI is checked after pushing the development checkpoint; do not infer its result from local checks.

## Scope still outstanding

This is the reviewed-bank Revisit path, not complete Phase 4/6/6b or platform completion. Private uploaded-work questions need their independent-key/privacy workflow before serving. Baseline/carry-over seeding, English Daily content and task ring, My mistakes similar-question remediation and shared cap, reminders, full exam cycle, and guardian activation remain outstanding.

Owner-approved guardian consent text/configuration must not be invented; existing access stays closed while the approved workflow is completed. No flags were enabled, no legal wording fabricated, and no guardian checks bypassed for browser demonstrations.

No production connection or mutation, main merge, deployment, data reset, destructive operation, permanent test account/content, or public preview tunnel. Cloud onboarding still has no owner-accessible browser preview support.
