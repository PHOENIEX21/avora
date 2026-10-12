# Guarded Today Milestone

Development branch `avora-academic-core-v1`, continuing verified commit `9a8c059`. Existing lessons, assessments, academic tables and production data are preserved. This is the released-objective/Revisit subset of Today, not complete Phase 4, English Daily or the full visual specification.

## Implemented

- `/weekly/today` requires an authenticated entitled student and the existing guardian/release context before reading the plan. `/home` and `/dawn` route ready students here. Pending guardian access stays closed; no policy/flag was activated.
- A read-only planner selects current-week published objectives assigned to the database's Africa/Lagos weekday through existing class/active-subject/optional-enrolment filters. Other weekdays, future weeks, drafts and other classes are not introduced. Weekends do not borrow Friday's objectives.
- Each assigned objective has a study activity connected to its actual subject view and a practice activity connected to the existing objective runner. Deep-link subject selection uses the supplied authorized objective list; an unknown subject cannot expose private data.
- Study completion reflects the persistent objective study record, including valid earlier study of that assigned objective. Practice completion requires a nonempty full snapshot, at least five questions, all stored answer rows, submitted PRACTICE/DAILY_LESSON mode and the current Lagos date. Yesterday's or incomplete legacy submissions cannot finish today's practice activity. No grade/mastery is inferred from viewing or study.
- Existing assigned Revisit sessions can be resumed/completed. Before a session exists, a read-only due preview reuses the same reviewed-item eligibility query and eight-question budget as the actual scheduler. It rejects unsupported/unreviewed keys, reported/retired/non-LIVE items, unauthorized objectives and unenrolled optional subjects. The preview does not seed catch-up, create a paper or consume the budget. Starting Revisit remains the authoritative locked operation.
- Outstanding due revision cannot be hidden by an earlier completed set. Completed Revisit metadata requires complete answers and retains class/publication/week/enrolment checks for its objective snapshots.
- Accessible progress ring shows actual completed/planned activities, an honest zero/empty state and a finite completed state. The Dawn night surface and gold/rose/teal ring use scoped tokens; no fake words, streaks, scores, photos or exam times were added.
- Existing source lessons and study/practice/Revisit engines are reused. No new tables, competing model, migration, publication, rollout flag, main merge or deployment occurred.

## Review Screenshots

Screenshots are actual components with production global CSS and explicitly labelled TEST_ONLY fixtures. They are not a live authenticated learner account, curriculum, a public app preview or final owner visual sign-off.

[Today pending, 390px](screenshots/weekly-today/today-390.png)

[Today complete, 390px](screenshots/weekly-today/today-complete-390.png)

Reproduce using `scripts/verify-weekly-visual-browser.mjs` with the temporary esbuild install documented in the previous visual checkpoint. Its server always closes afterward. All four-width artifacts are generated under `/tmp/avora-weekly-visual`.

## Verification

- 161 Node regressions pass, including eight new Today planner/page/ring/navigation tests and the revised home-entry redirect. CI includes Today coverage.
- Real isolated Neon workspace SQL/routes: **255 assertions**, passed with full rollback and fixture-absence checks. Tests include actual same-day completion, stale/incomplete submissions, source/visibility boundaries, guardian denial, an unspent read-only eight-item preview, assigned Revisit and completion. Baseline integration: **60 assertions**, also passed with rollback. Auth and guardian-ready contexts are simulated inside fixtures; this does not establish legal approval or live guardian onboarding.
- Actual guest browser navigation to `/weekly/today` reaches login; internal app health returns HTTP 200 with database connected.
- Browser workflows pass at 360, 390, 412 and 1280px: Today zero/full/empty ring, direct subject study navigation, readable long text, at least 44px action targets, text contrast >=4.5:1 and reduced-motion mode; existing subject/study/history/practice/settings flows remain passing. Fixed a real global-heading/CSS-composition contrast conflict and reran verification. No horizontal overflow or page script errors.
- Production build, independent TypeScript, lint, seven curriculum audits and teaching pipeline pass. Eleven pre-existing lint warnings remain. Teaching preserves 144 source-backed units, 3,232 learner moments and 1,099 authored checks. Check final push/PR Actions before subsequent work.

## Remaining

Real English Daily words/rule/oral/sentence tasks, independent uploaded-work keys, exam countdown/notifications, Today photos/profile/menu, the full navigation shell, self-hosted fonts, time-of-day theme, rest-day/streak rules and complete reference matching remain outstanding. The ring counts only the currently implemented real assigned plan, not imagined completion of these future modules. No launch/production-readiness claim is made. Guardian and SendGrid activation remain owner-deferred; remind before rollout, not repeatedly during independent development.
