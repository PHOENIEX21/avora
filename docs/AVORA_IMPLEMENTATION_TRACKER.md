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
| Phase 1d baseline / study time | NOT VERIFIED | Baseline policy tests pass, runtime not tested |
| Phase 2 verified curriculum | NOT VERIFIED | Import/review route exists; source coverage/release not verified |
| Phase 2b all-class objective gating | NOT VERIFIED | Class flag API exists; runtime not tested |
| Phase 3 weekly | NOT VERIFIED | Weekly routes exist; schema mismatch |
| Phase 3b exams/notifications/revisit | NOT VERIFIED | Academic-core and weekly models diverge |
| Phase 3c week switching | NOT VERIFIED | Need state transition tests |
| Phase 4 daily tasks | NOT VERIFIED | Need complete flow |
| Phase 4g English Daily | NOT VERIFIED | Need approved real content and tests |
| Phase 5 uploads | NOT VERIFIED | Need flow and safety tests |
| Phase 6 scheduler | NOT VERIFIED | Need timezone, retries and idempotency tests |
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
Compare every statement in migrations 048–058 with isolated Neon schema; constraint replacement is gated on owner approval per Neon safety requirements. Meanwhile implement fail-closed diagnostics and test admin/learner routes and permissions. Do not mark full migration files applied while incomplete. Proceed through ZIP phases with evidence.

## 2026-10-12 verified checkpoint
- Isolated integration Neon branch contains **50 weekly_* tables**; this does not imply all migrations are complete.
- Both `weekly_curriculum_objectives` and `weekly_items` still have narrow status constraints preventing PUBLISHED. The objective table additionally has a broader constraint; the narrower one still controls. No destructive constraint replacement authorized or executed.
- Additive published-objectives lookup index succeeded; moderation-actions table and its index were subsequently created and verified.
- No production database modification, deployment or main merge. Continue with compatibility review and end-to-end validation before visual reconstruction.

## 2026-10-12 compatibility review
- Read `docs/AVORA_SCHEMA_COMPATIBILITY_GATE_2026-10-12.md` for the verified 50-table inventory and publication constraint gate.
- Inspected admin objectives import and class flags route: activation requires five published weekdays and matching week state; no runtime HTTP test yet.
- Narrow CHECK constraints on objectives and items require an approved atomic replacement; no DROP executed.
