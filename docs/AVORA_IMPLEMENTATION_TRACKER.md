# AVORA restructuring — implementation tracker

**Source of truth:** Original user-provided `files(7)(1).zip` instruction and design package. Read `AGENTS.md` before any changes. **No phase below is declared complete solely because documentation exists.**

| Workstream | Status | Evidence / outstanding work |
|---|---|---|
| Phase 0: repository and database audit | VERIFIED (inventory only) | `docs/AVORA_PHASE0_INTEGRATION_AUDIT_2026-10-11.md`; GitHub run 38180382314 passed |
| Integration environment | VERIFIED (created) | Neon test branch `br-blue-scene-ayydvo7l`; not production |
| Academic-core existing code | PARTIALLY VERIFIED | Existing implementation and CI pass; full runtime/E2E not verified |
| Weekly schema reconciliation | IN PROGRESS | 50 weekly_* tables verified on isolated integration branch; migration 048–058 still partially applied; restrictive objective/item publication checks remain; see batch 1–8 reports |
| Phase 1 data model | IN PROGRESS | Isolated integration branch now has 50 weekly_* tables; constraint reconciliation, missing objects and runtime verification remain |
| Phase 1c registration / parent | NOT VERIFIED | Guardian/PIN CI passes but end-to-end target flow not tested |
| Phase 1d baseline / study time | PARTIALLY VERIFIED | Study-time screen/persistence and guardian preference restrictions verified; baseline access/deadline/stub safety tested; actual timed baseline and reminders remain |
| Phase 2 verified curriculum | NOT VERIFIED | Import/review route exists; source coverage/release not verified |
| Phase 2b all-class objective gating | NOT VERIFIED | Class flag API exists; runtime not tested |
| Phase 3 weekly | PARTIALLY VERIFIED | Guarded dashboard, historical objectives and study/practice implemented; full weekly exam cycle remains |
| Phase 3b exams/notifications/revisit | NOT VERIFIED | Academic-core and weekly models diverge |
| Phase 3c week switching | NOT VERIFIED | Need state transition tests |
| Phase 4 daily tasks | PARTIALLY VERIFIED | Objective practice/submissions and progress verified; English Daily five-task flow remains |
| Existing Daily Check submissions | PARTIALLY VERIFIED | Student/input/bank checks and replay-safe progress updates tested with mocked DB; live Neon integration pending |
| Phase 4g English Daily | NOT VERIFIED | Need approved real content and tests |
| Phase 5 uploads | NOT VERIFIED | Need flow and safety tests |
| Phase 6 scheduler | PARTIALLY VERIFIED | Reviewed-bank daily due runner, eight-item cap/resume, Lagos dates, replay safety, early-repeat protection, wrong/guess resets and 21-day retention verified; uploaded-work/carry-over seeding remains |
| Phase 6b mistakes | NOT VERIFIED | Need remediation tests |
| Phase 7 question bank | NOT VERIFIED | Need provenance, review and rotation |
| Phase 8 monitored groups | NOT VERIFIED | Need admin moderation and permission tests |
| Phase 8b DMs | NOT VERIFIED | Need safety/privacy tests |
| Phase 9 photos | NOT VERIFIED | Need consent/withdrawal and privacy tests |
| Phase 10 23-screen visual redesign | NOT VERIFIED | Compare each screen to ZIP references |
| Phase 10b admin | NOT VERIFIED | Need full workflow coverage |
| Phase 11 analytics | NOT VERIFIED | Need learner/parent/admin accuracy checks |
| Phase 12 QA | NOT STARTED | End-to-end, accessibility, mobile, low-bandwidth, security and release gates |
| Production merge and deployment | BLOCKED BY QA/APPROVAL | Explicit owner approval required |

## Latest change log
- 2026-10-11: CI run 38180382314 successful on academic-core branch; verified TypeScript, lint, security, baseline, curriculum, marking, build.
- 2026-10-11: Audited separate Neon schemas and documented overlap.
- 2026-10-11: Created isolated Neon integration branch `br-blue-scene-ayydvo7l`; subsequently created and verified weekly schema objects in batches 1–8 (see docs/AVORA_INTEGRATION_SCHEMA_*).
- 2026-10-11: Added `AGENTS.md` to make next-agent continuation self-contained about known work and safe next steps. **Original ZIP is still required for full specification fidelity.**

## Next work
Continue from the weekly workspace and scheduler checkpoints. Complete secure guardian workflow, reviewed daily content and daily revisit integration in the original phase sequence. Reconcile remaining statements in migrations 048–058 against the isolated schema; do not blindly rerun or mark incomplete migrations applied. Later checkpoint reports supersede historical publication/network blockers below.

## 2026-10-12 verified checkpoint
- Isolated integration Neon branch contains **50 weekly_* tables**; this does not imply all migrations are complete.
- Both `weekly_curriculum_objectives` and `weekly_items` still have narrow status constraints preventing PUBLISHED. The objective table additionally has a broader constraint; the narrower one still controls. No destructive constraint replacement authorized or executed.
- Additive published-objectives lookup index succeeded; moderation-actions table and its index were subsequently created and verified.
- No production database modification, deployment or main merge. Continue with compatibility review and end-to-end validation before visual reconstruction.

## 2026-10-12 compatibility review
- Read `docs/AVORA_SCHEMA_COMPATIBILITY_GATE_2026-10-12.md` for the verified 50-table inventory and publication constraint gate.
- Inspected admin objectives import and class flags route: activation requires five published weekdays and matching week state; no runtime HTTP test yet.
- Narrow CHECK constraints on objectives and items require an approved atomic replacement; no DROP executed.

## 2026-10-12 cloud continuation

Superseded for current connectivity/specification/workspace status by `docs/AVORA_WORKSPACE_MILESTONE_2026-10-12.md`: source package received and archived, GitHub Actions reads now work, Neon branch identity verified, additive workspace migrations applied, dashboard/practice implemented and tested. Earlier blocker notes below describe the prior checkpoint.
- Base commit: `c109dcaa8ab84262e7bcd46b986be5450c003601`, branch `avora-academic-core-v1`.
- Local checks passed: TypeScript; lint (0 errors, 11 existing warnings); answer marking (12 checks); all seven curriculum audit scripts; 57 weekly/guardian/security tests; 8 new Daily Check route tests; production build with an ephemeral AUTH_SECRET. GitHub Actions API returned Forbidden, so remote run status is unverified.
- Fixed the Phase 1 migration test's false positive on a rollback comment. Added Phase 1/2 and Daily Check tests to the academic-core workflow.
- Daily Check now rejects non-students, invalid JSON/UUIDs/answers, foreign question IDs, and empty/non-objective banks before progress writes. Student-row locking serializes simultaneous Daily Check evidence updates. Replay returns the stored result without new attempts or progress increments.
- The new route tests execute transpiled handler code with mocked SQL and real validation/marking. They do not establish real PostgreSQL transaction/concurrency behavior or live schema compatibility.
- Newer `AVORA_PUBLICATION_GATE_VERIFIED_2026-10-12.md` supersedes the earlier narrow-constraint blocker: it reports owner repair of both checks and 52 weekly tables. This cloud session has not independently queried Neon.
- Owner provided the development endpoint and authorized read-only checks and non-destructive tests. Connection attempts failed with EAI_AGAIN; HTTPS proxy also rejected the endpoint with 403. No database query or write succeeded. Runtime DATABASE_URL is still absent in this running session.
- Original specification and designs remain unavailable: `docs/source/avora-restructure-agent-instructions.md` is a pointer only. Per AGENTS.md, feature implementation requires the original ZIP. `/weekly` remains a placeholder; dashboard, new weekly daily-task integration and complete progress tracking are not complete.
- No production operations, main merge, deployment, migration or data reset performed. Temporary credential-bearing diagnostic file was removed.
- Next: publish the environment configuration with endpoint/API network access and runtime credentials, verify endpoint-to-branch identity, run read-only schema diagnostics, obtain the original ZIP, then continue roadmap implementation and live integration checks.

## 2026-10-12 retention continuation

- `docs/AVORA_REVISIT_SCHEDULER_CHECKPOINT_2026-10-12.md` records the scheduler correction and verification. Early correct practice no longer advances retention; due correct answers use existing intervals and wrong/guessed answers return tomorrow.
- Passed 86 regression tests, 144 real Neon assertions with full rollback, independent TypeScript, lint (11 existing warnings), answer marking and all seven curriculum audits.
- Cloud onboarding has no user-facing browser preview support. Internal app/database health works; a localhost address is not an owner-accessible preview. No deployment or public tunnel authorized or created.

## 2026-10-12 daily Revisit milestone

- `docs/AVORA_DAILY_REVISIT_MILESTONE_2026-10-12.md`: guarded daily set, confident-mistake priority, persisted answers/marking/results, cross-objective progress, cap/resume and retention implemented on the existing weekly CBT model. No migration needed.
- Official exam snapshots are rejected by the practice API before corrections can be returned.
- Verified 91 regression tests, 177 rollback-only Neon assertions, typecheck, production build, curriculum and marking audits, and browser workflows at four widths. Full guardian onboarding and the full platform remain incomplete.
- Next: secure approved guardian onboarding, baseline and reviewed English Daily, private uploaded-work integration and carry-over seeding, My mistakes similar-question follow-up/shared cap, then remaining roadmap phases. Do not mark all of Phase 6 complete from the reviewed-bank subset.

## 2026-10-12 study-time continuation

- `docs/AVORA_STUDY_SETTINGS_MILESTONE_2026-10-12.md`: student study-time screen and persistent preferences implemented on the existing table; guardian summary preferences are protected from student changes.
- Baseline routes now enforce guardian/release gates and fixed first-offer/postponement dates. START fails honestly without a reviewed assessment instead of recording a phantom attempt. Existing completed/active records are preserved.
- Verified 100 regression tests, 202 rollback-only Neon assertions, independent typecheck, lint (11 existing warnings), build/curriculum/marking and four-width browser flows. Fixed a submission timestamp tie exposed by the integration rerun and reran successfully.
- No phase-completion claim for the unfinished timed baseline, reminders, guardian activation or complete platform.
