# Weekly practice retention checkpoint

Branch: `avora-academic-core-v1`. Continues the verified weekly workspace; does not replace the academic model or lessons.

## Scheduler correction

Previously, each new correct practice session advanced an item's retention streak even before its scheduled revisit. Repeating five questions immediately could lengthen their intervals from two to seven to twenty-one days without spaced retention evidence.

`finishWeeklyPractice` now locks the existing schedule row and compares its due date with the PostgreSQL calendar date in `Africa/Lagos`. Correct, non-guessed practice before that date is still marked and stored, but leaves the entire schedule unchanged. A due correct answer advances the existing interval policy. Wrong or guessed answers reset the streak and return in one day, even during early practice. Duplicate submissions remain idempotent. No schema migration or new tables are required.

## Verification

- 86 Node regression tests passed, including three new scheduler scenarios.
- 144 real Neon route/database assertions passed on `br-blue-scene-ayydvo7l`. Branch identity was checked before fixture writes. Tests exercised early repeat, due seven/twenty-one-day progression, wrong/guess resets, stored scoring, and distinct objective evidence. All fixtures rolled back; a post-rollback query confirmed no fixture users remained.
- Independent TypeScript check passed.
- ESLint passed with zero errors and 11 existing warnings.
- Answer marking: 12 checks passed, including existing reviewed banks.
- All seven curriculum audit scripts passed; source-backed teaching remains unchanged.

- Production build passed. It skips type validation, so the independent TypeScript result above is required.
- Browser component workflows passed at 360, 390, 412 and 1280 pixels: study controls, answer feedback, reload/resume, completion, and no horizontal overflow or page errors. These use isolated component fixtures, not live learner accounts or a complete guardian onboarding E2E.

## Preview limitation

The app's internal health endpoint returns HTTP 200 with `database: connected`. The cloud onboarding interface does not support user-facing browser previews. Its localhost address refers to the cloud machine, not the owner's device; earlier localhost preview guidance was incorrect. No public tunnel, hosting deployment, guardian bypass, or production changes were made to work around this limitation.

The saved environment draft and current runtime are separate: saved database requirements remain pending in the draft, while the running development server has a working development binding. Do not claim new-task secret restoration or browser preview availability without verifying it.

## Remaining work

This verifies the practice-to-schedule update, not all of Phase 6. The daily due-item runner/cap, retention metrics, carried-over objectives, and mistakes/follow-up workflow still require implementation and verification. Guardian workflow activation remains closed. Continue the original restructuring specification without fabricated learner content.

No production connection, deployment, main merge, destructive migration, or permanent test content.
