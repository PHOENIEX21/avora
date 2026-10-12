# Official Weekly Exam Integrity Checkpoint

Branch: `avora-academic-core-v1`. Continues `5efbbca4fae399529a885b247b83e0f2fc97f304`; no production merge/deployment authorized. The original specification remains `docs/source/avora-spec.md`, particularly Phases 3 and 3b. This is a verified subset, not completion of those phases or the platform.

## Implemented

- Hardened the existing `weekly_exam_blueprints`, `weekly_exam_versions`, `exam_sessions` and marks workflow. No competing exam model or duplicate academic tables were created.
- Explicit owner approval freezes a complete, class/source/week-matched reviewed paper. New student attempts reshuffle only question/option order from that sealed content. Later bank edits cannot change the approved paper or its solution used for marking.
- Owner edits create a fresh unapproved draft and reset both reviews; they do not overwrite the original verified bank question. Locked versions cannot be edited/reapproved, and papers with saved attempts cannot be replaced. Review actions recheck membership/version status inside the approval lock.
- Only students can start/read/save/finish their own class paper. Weekly-enabled classes also retain guardian and academic-release gates. One student-row lock serializes starts/submissions; repeated starts resume and repeated finishes acknowledge the stored attempt.
- The server owns opening, closing and per-attempt deadlines. Late saves fail; browser expiry and a secret-protected bounded server job finish saved responses. Client time is display only. Autosave, refresh/resume, failed-save retry and paper-switch resets work in the runner.
- MCQ marking uses immutable exact option text, avoiding shuffled-position and literal-letter confusion. Mixed papers remain unscored until owner-finalized theory review. AI theory suggestions stay private and require exact complete owner-approved marks.
- No public keys, explanations, counts or numeric score are returned during submission. Result/progress release requires both window close and results release, plus final marks. Other practice/tutor/Daily Check routes cannot reveal keys for held official-bank IDs; generic exam finish cannot regrade an official session.
- Outcome processing uses one transactional receipt. Attempts, existing skill/objective/topic aggregates, remediation and verified legacy-parent reporting are written only after release. Replays do not duplicate evidence or notifications. Repeated question IDs do not manufacture distinct mastery; activity reports count real attempts and do not pretend an official exam was parent-supervised.
- Owner flexible-window scheduling requires a sealed paper and future opening, keeps results at/after closing, and cannot alter an opened exam or saved attempt. Datetime input means Africa/Lagos even when the owner's browser uses a different timezone.
- Runner layout is scoped and responsive, with stable controls and wrapped content. Owner approval controls are disabled outside review; owner review displays the sealed source, not mutable bank content.

## Schema And Safety

Additive migrations `064_weekly_exam_attempt_integrity.sql` and `065_weekly_locked_paper_snapshot.sql` were applied and recorded only on Neon `br-blue-scene-ayydvo7l`, after checking `neon.branch_id`. Existing sessions remain `LEGACY`; old versions are not automatically snapshotted, published, regraded or backfilled. An older active paper without its original snapshot fails honestly and needs owner review. An older unsealed locked version cannot silently create a new paper. No production connection, destructive migration, data reset, real lesson change, class activation or fabricated published content occurred. All integration content exists only inside rollback transactions.

Migrations 048-058 remain partially reconciled; never blindly rerun or mark them complete. The broader existing weekly CBT study/practice/schedule foundation is preserved. This milestone does not automatically map `academic_daily_objectives` to different `weekly_curriculum_objectives` identities by title or duplicate either model; that deliberate compatibility work remains.

## Verification

- `node --test scripts/test-*.mjs`: **145 passed**, zero failed/skipped. Official-paper suite covers 20 scenarios; Daily Check includes the held-paper regression. Self-service Quick 10 cannot use held IDs to fill a short paper. Existing answer-marking checks preserve 888 reviewed correct answers and reject their distractors.
- Real branch-checked rollback SQL/route workflows: **125 official-exam + 243 workspace + 60 baseline = 428 assertions**, all passed. Fixture absence is checked afterward. Official tests cover owner draft/source preservation and sealing, actual scheduling gates, later students after bank mutation, saved responses, ownership/expiry, private marks, human theory finalization, release, replay, distinct evidence and legacy preservation. An injected parent-notification failure proves the entire outcome transaction rolls back and remains retryable.
- Real components at **360, 390, 412 and 1280px**: official runner retry/autosave/reload/theory/completion/expiry/paper switch; shared dashboard/practice and mistakes regressions; owner edit/disabled approval and Lagos scheduling in a UTC browser. No horizontal overflow or browser script errors. Internal fixture screenshots/harness are in `/tmp/avora-browser-harness`, not curriculum or a user-accessible preview.
- Actual app health: HTTP 200, database connected. All four official student APIs and POST outcome cron reject guests with 401. Browser navigation to index, runner and result redirects guests to login; Next streaming page HTTP 200 alone is not the access-control assertion.
- Independent TypeScript, production build, curriculum audits, teaching pipeline and production dependency audit pass. Teaching preserves 144 source-backed units, 3,232 learner moments and 1,099 authored checks. Lint: zero errors, eleven pre-existing warnings.
- Academic Core Verification now includes the official-paper regression. Both previous baseline commit Actions passed before edits. Check the final pushed development SHA's push and PR Actions; local evidence alone does not establish remote CI success.

## Remaining Work

The secret-protected POST `/api/cron/weekly-exam-outcomes` is implemented but not scheduled or deployed. Secure `CRON_SECRET` and a supported POST scheduler need rollout configuration; no production job was enabled. Result viewing also processes an eligible own released outcome. Large-class load testing, multi-connection race stress and real AI-provider marking/delivery are not verified; AI suggestions are stubbed in integration, with real owner-finalization SQL tested.

Full Phase 3/3b still needs unified existing-objective compatibility, class/group/individual overrides, fixed/live/lobby modes, delivery/open tracking and reminders, uploaded-work/revisit proportions, closed-window corrections and separate midweek improvement attempts. Official-exam mistakes are not imported into the practice notebook yet. No phase-completion claim is made.

Continue the original roadmap from these foundations: reviewed English Daily, private-upload independent keys, calendar/rollover, remediation integration, parent/community/privacy, Dawn reference matching, owner tools, analytics and comprehensive QA. Preserve genuine NERDC provenance and existing deep lessons. Keep guardian activation closed: the owner selected **SendGrid** and deferred activation. Remind before rollout about secure SendGrid bindings, approved student/photo consent wording/version and verification/recovery/delivery tests; do not invent consent or repeatedly interrupt independent work.

The cloud onboarding UI has no owner-accessible browser preview. A working internal localhost request is not a preview link. Saving startup configuration is not publication, fresh-task credential verification or AVORA deployment.
