# Weekly dashboard and objective practice milestone

Scope: `avora-academic-core-v1`, continued from `d1ded9f`. Owner authorized continuation and the dashboard-to-practice flow. Source specification: `docs/source/avora-spec.md`; all 22 HTML screens in the exact uploaded design archive were inspected. The handover is a continuation map; the owner's current instructions govern approvals and scope.

## Implementation

- `/weekly` organizes published objectives by subject, with historical-week selection, textbook/in-app study choices and persisted study completion. Active core subjects and enrolled optional subjects are selected on the server for the student's class.
- Verified lesson links resolve exact existing curriculum IDs, subject and class through `officialCurriculumTopicInventory`. No lesson, curriculum objective, question or key was generated or imported as learner content.
- `/weekly/practice` uses the existing `weekly_cbt_sessions` model with additive objective linkage, immutable question snapshots and stored result counts. `weekly_cbt_answers` holds step-level answers and optional confidence; `weekly_objective_study` supplies the previously missing study record.
- New practice serves five published, reviewed, answer-checked MCQs from the objective's live topic bank. Reserve, retired, unreviewed, invalid and repeatedly reported items are excluded. Keys and explanations are withheld until each answer is checked.
- Open practice resumes instead of creating another session. Checked answers cannot be changed after feedback. Completion requires all answers, stores counts atomically, and repeated finish calls do not duplicate revisit scheduling.
- The existing 2/7/21-day scheduler is reused; wrong/guessed answers return after one day. Due dates use Africa/Lagos. Progress uses the latest completed evidence per distinct item, separating actual accuracy from confidence-aware mastery. Study completion alone never creates mastery.
- Question reports are student/session scoped, idempotent while pending, and three distinct unresolved reporters block future serving.
- Guardian/class/release/publication guards remain enforced. The ready branch is implemented, but `DAWN_GUARDIAN_WORKFLOW_ACTIVE` and the existing guardian approval input remain false. No live learner rollout is claimed.

## Database evidence

Verified via read-only Neon SQL: project endpoint `ep-rapid-sunset-aye7rhiz` reports branch `br-blue-scene-ayydvo7l`; required weekly tables and publication constraints pass. All schema mutations used the same isolated branch with an identity guard. Production branch was never connected.

Applied additive migrations 059-061 and recorded only those filenames in `schema_migrations`. No earlier partially applied migration was rerun or falsely marked complete.

Before first Git publication, 059 was narrowed to study storage and 060 reused existing CBT sessions. Two empty, unused prototype tables (`weekly_practice_sessions`, `weekly_practice_answers`) remain only on the isolated branch from an earlier iteration; application code and final migration files do not use/create them. No destructive cleanup was executed. Do not migrate those prototype tables into production.

`database/diagnostics/weekly_workspace_rollback_test.sql` passed real PostgreSQL assertions for schema constraints, study persistence, duplicate open sessions/answers and distinct-item progress. Its deliberate success exception rolled back all fixtures.

`scripts/verify-weekly-workspace-neon.mjs` executed the real transpiled routes and SQL in one isolated transaction: 45 assertions, including publication/class/week isolation, saved study, practice start/resume, marking, stored counts, duplicate completion, scheduler, progress, reports and cross-student access. Authentication/guardian authorization are explicit test contexts; the production guardian policy is not bypassed. All fixtures rolled back, followed by an assertion that fixture users do not exist.

This cloud environment supports proxied Neon HTTPS/WebSocket transport; direct PostgreSQL DNS failed. An opt-in `AVORA_DATABASE_TRANSPORT=neon-websocket` adapter now uses Neon's official driver for development, verifies the exact endpoint and branch before queries, and holds transactions on one connection. Production uses the existing native postgres driver. Five transport isolation/transaction tests pass; the same live route integration also runs through this application adapter.

The actual local app at port 3001 returns HTTP 200 / `{status:"ok",database:"connected"}` from `/api/health`. A private temporary startup process supplied the owner-provided development URL and an ephemeral AUTH_SECRET, because saved environment variables are not yet injected into this running shell. No credential file is tracked. Future tasks need the saved variables applied before startup; no need to resend the connection string in chat.

## Validation

- TypeScript and production build pass independently (Next config currently skips type validation during build).
- Lint passes with 11 pre-existing warnings.
- Weekly/guardian/Daily Check/transport regression suite: 83 passing tests, including 13 workspace and five development transport tests.
- All seven curriculum audit scripts and 12 answer-marking checks pass; existing source-backed lessons are preserved.
- Playwright exercised real dashboard/practice components with isolated browser/API fixtures at 360, 390, 412 and 1280 px: subject selection, study commands, previous/next navigation, saved-answer recovery, completion and overflow checks. Screenshots were inspected. These are component workflow checks, not an authenticated live-pilot browser test.
- Next.js and matching ESLint configuration updated from 16.3.3 to 16.3.8; compatible sharp/source-map/brace-expansion updates applied. Production dependency audit is clean. Five development advisories remain through `braces` 3.0.3, whose latest published version is still affected; no force upgrade was used.

## Remaining phases

This milestone does not complete the full week cycle, guardian onboarding, English Daily content, official weekly CBT/revisit comparison, Monday rollover, parent area, uploads, mistakes, group/DM/photo workflows, full Dawn redesign or analytics.

Next: reuse existing Brevo/email and guardian challenge/PIN helpers, locate/configure the owner's approved consent version, verify independent guardian onboarding before activation; complete reviewed bank/admin publication workflows and phase-by-phase calendar/exam integration. Keep existing lessons and legacy progress intact. Do not fabricate missing subject-term content or open class release flags for a demo.

No main merge, production migration, data reset or deployment was performed.

## Additional interface archive

Owner supplied `files(8).zip` with all 22 numbered PNG screenshots and an overview. The only specification difference is the instruction to inspect these PNG exports. Screenshots 17/18/14 were compared with the weekly/objective/practice components; full screenshot matching remains Phase 10. The exact screenshot archive and updated reference instructions are preserved in `docs/source/avora-screens.zip` and `docs/source/avora-interface-reference-instructions.md`.
