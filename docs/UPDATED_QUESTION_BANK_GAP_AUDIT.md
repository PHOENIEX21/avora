# AVORA updated specification reconciliation — October 2026

Authority: latest uploaded `avora-restructure-agent-instructions(2).md`, particularly Phase 7. This is a gap audit, not a claim of completion.

## Updated question-bank contract
- One topic per subject per week; default 30-question subject exam.
- 40–50 approved LIVE questions per topic, roughly 40 exam-eligible; all others RESERVE, with demand-driven growth up to 1,000 only where justified.
- Every objective has >=6 approved questions, across recall/application/analysis, and the weekly exam must be assembled before publishing.
- Official exam questions must be reviewed by the owner-admin. Practice items require independent double checks and the specified review sampling.
- Termly owner-approved rotation previews 10–15 swaps; prioritize reports and poor statistics. Refresh >=30% when a topic recurs the following year.
- Reports threshold of 3 withdraws item from serving pending review.
- Persist each student's selected exam form; revisit uses that form with reshuffled order; never change historical attempts.

## Verified code gaps
1. `app/api/admin/weekly/objectives/review/route.ts` currently allows PUBLISH without checking six approved questions per objective, difficulty spread, LIVE membership, or exam assembly.
2. `app/api/admin/weekly/flags/route.ts` currently allows class activation based on five published weekdays and week-state matching, without checking subject topic question readiness or assembled exams.
3. `weekly_items` has statuses and difficulty, but no LIVE/RESERVE membership or rotation ledger in earlier migrations.
4. Existing objective import maps objectives to day_index 1–5; the updated contract is one topic per subject per week, not five weekday topics. Reconcile before importing real curriculum.
5. No confirmed server-side live-pool-only exam selection, 30-question blueprint assembly, per-student form snapshot, or rotation preview/apply workflow.
6. No confirmed automated retirement at 3 reports, live-set statistical quality checks, or yearly 30% refresh rule.
7. Legacy teacher permission table exists, but updated specification authorizes only the owner-admin; preserve legacy data and do not expose permissions.

## Safe changes made
- Migration 054 adds topic sets, LIVE/RESERVE/RETIRED memberships, rotation proposals, and append-only change events. It is additive and defaults every new membership to RESERVE. It has been applied only to the isolated Neon validation branch.
- This migration **does not** turn on any feature, promote any question, or bypass item approval.
- Primary database and production remain unchanged.

## Before launch
- Add server-side readiness checks and an atomic publish/activate operation.
- Implement item moderation and owner-only rotation proposal/approval/application with transactional swaps and full audit.
- Implement stored per-student paper assembly and scoring with regression tests.
- Reconcile historical migration ledger on disposable clone.
- Import only sourced, owner-reviewed NERDC objectives and verified questions; no sample content.

No Phase 7 completion is claimed. Continue one phase at a time with owner approval.
