# Baseline, Catch-up and Mistakes Milestone

Branch: `avora-academic-core-v1`, continuing from `1c0b626f6646b4a21eba061cfcf828affa5f1c6d`. The starting commit's push and PR verification runs both succeeded (`38197685870`, `38197689340`). This report supersedes earlier notes describing the baseline runner and carried-over seeding as unimplemented. It does not declare the complete platform or original phases complete.

## Implemented

- `/weekly/baseline`: twenty owner-selected reviewed questions, fifteen-minute server deadline, persistent answer autosave/change/resume, expiry and idempotent submission. Marking uses the immutable question snapshot. Students receive only kind objective summaries, never baseline marks, percentages, keys or explanations. Earlier completed records are preserved; legacy incomplete records without valid snapshots require review instead of invented recovery.
- `/admin/weekly/baseline`: class/term selection, twenty distinct published reviewed LIVE questions covering English, Mathematics and every active core subject. Selection is audited and does not activate a class or publish content. Optional-subject-specific baseline variants are not implemented.
- `/admin/weekly/baseline/results`: actual per-objective baseline counts compared with latest distinct completed practice evidence after the baseline. No guessed improvement or substitution of repeated attempts for distinct questions. This initial owner view is limited to 200 objective-result rows; full analytics and pagination remain later work.
- `/weekly/catch-up`: baseline weaknesses, actual later practice difficulties and missed published historical objectives. The list respects class, active subjects, optional enrolment and released weeks. Revisit seeds only genuine reviewed questions, once, without changing an existing due date or streak.
- `/weekly/mistakes` and `/weekly/fix`: owned original wrong-answer snapshots, explanations, confidence priority, To fix/Fixed counts and fifty-row pagination. Existing saved practice mistakes import idempotently; ordinary correct answers never manufacture historical spaced fixes.
- A similar question must be a different reviewed LIVE item linked to the same objective. One correct answer does not mark the original fixed. A different-session correct answer after the two-day confirmation interval does; guessed/wrong follow-up evidence resets the proof. New wrong original answers reopen the mistake. Unavailable banks fail honestly without generated replacement content.
- Similar practice and ordinary Revisit use the same existing CBT sessions/answers and the same eight-item daily budget, serialized by the student lock. Duplicate starts resume the same open follow-up. Finish validates the locked paper so a concurrently appended question cannot be omitted.
- Wrong official-exam answers remain excluded. Their closed-window import is outstanding and must not leak corrections early.

## Isolated Database

The endpoint guard and actual `neon.branch_id` check identify `br-blue-scene-ayydvo7l` before writes. Additive migrations `062_weekly_baseline_paper.sql` and `063_weekly_mistakes.sql` are applied and recorded there only. They extend existing class flags/baseline attempts and add missing mistake references to existing question/answer/session records. No competing academic model, lesson rewrite, production connection, reset, delete, main merge or deployment occurred.

Migrations 048-058 remain partly reconciled. Never blindly rerun or mark them fully applied. No real curriculum, sample questions or class-release flags were published by this milestone. All integration content and user fixtures were in transactions that rolled back; absence of fixture users was checked afterward.

## Verification

- Full Node regression: `node --test scripts/test-*.mjs`, **124 passed, zero failed/skipped**. Includes baseline expiry/private marking, access revocation, mistakes/history/shared-cap policy, existing security/publication tests and preserved teaching behavior.
- Real branch-checked route/SQL integration: **243 workspace assertions plus 60 baseline assertions**, all passed with rollback, using `scripts/verify-weekly-workspace-neon.mjs` and `scripts/verify-weekly-baseline-neon.mjs`. Authentication and guardian-ready contexts are explicitly simulated inside these rollback-only tests; this is not a verified live guardian onboarding journey.
- Actual app guest APIs reject access; guest browser navigation to all six new student/admin pages reaches login. App health returns HTTP 200 with database connected.
- Real components exercised at 360, 390, 412 and 1280 pixels: existing dashboard/practice, Revisit, settings, baseline autosave/resume/non-scored summary/expiry retry, owner selection/results, catch-up layout and mistakes tabs/pagination/similar practice. No horizontal overflow or browser script errors. Browser fixture harness and screenshots are under `/tmp/avora-browser-harness`; fixtures are explicitly not curriculum. No owner-accessible preview exists in this onboarding UI.
- Independent TypeScript, lint, production build, all seven curriculum audits and production dependency audit. Build skips TypeScript internally, so the independent check remains mandatory. Do not run typecheck while Next is regenerating build route types. Eleven pre-existing lint warnings remain; production dependency audit reports zero vulnerabilities.
- Expanded teaching pipeline audits 144 genuine source-backed units, 3,232 learner moments and 1,099 authored checks, plus 107 NCEE teaching-ready topics. Fixed nested editorial annotations leaking into narration without changing authored lesson sources. The audit now includes the actual current-cohort JSS1 Mathematics runtime instead of assuming all teaching is in the older source array.
- Updated obsolete lesson test import/panel assumptions and removed the arbitrary unmatched guided-question fallback. Verified authored definitions, examples, practice and original NERDC source mappings remain intact. These tests and the teaching audit are now in CI.

## Remaining Work and Owner Reminder

Guardian activation and email delivery are explicitly deferred by the owner: use **SendGrid**, not a new Brevo requirement. Do not ask again during unrelated development or turn on guardian access. Before rollout, remind the owner to configure `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` securely, provide approved student-data/photo consent wording and its version, and finish verified guardian identity, recovery and delivery tests. Provider naming alone is not consent approval.

Remaining original work includes reminders, optional baseline variants, reviewed English Daily content and four-part exercises, private uploaded-work independent-key integration, the complete weekly exam/calendar/rollover cycle, official-exam mistakes after window close, term-end retention, parent progress, groups/DMs/photos, complete Dawn screen matching, owner tools, analytics and comprehensive QA. Continue from the existing weekly foundation and original specification, not a rebuild. Do not call this milestone full platform completion.

Runtime connectivity is verified in this session. The saved cloud draft and future secret delivery are separate: review/save/publish the environment configuration in environment settings before relying on it in another task. No application deployment is authorized by that environment action.
