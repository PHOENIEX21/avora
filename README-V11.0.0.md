# AVORA V11.0.0 — Personal Launch Readiness

This release is intended for the owner's private launch/test cycle, not public release.

## Launch-readiness corrections
- Trial self-service assessment allowance is now exactly **150 unique questions per learner**.
- One complete NCEE mock is available during trial; live/admin-supervised assessments remain outside that self-service quota.
- The expanded NCEE editorial bank now has a persistent database seed path: **960 published NCEE preparation questions** (480 Primary 5 + 480 Primary 6; 80 per tested domain per class).
- `db:migrate` now applies pending migrations and then idempotently seeds both the 888-question revised JSS1/JSS2 bank and the 960-question NCEE bank.
- `.env.example` now documents `DIRECT_URL` and Paystack configuration more clearly.
- V11 structural launch-readiness audit added to the launch gate.

## Verified source-bank minimum
- JSS1/JSS2 revised assessment bank: **888** MC/assessment questions.
- Revised performance tasks: **111**.
- Primary 5/6 NCEE editorial bank: **960** questions.
- Verified minimum across those two active question banks: **1,848 questions**, plus **111 performance tasks**.
- JSS3/legacy/current-cycle material is additional and should be counted from the seeded database rather than added to this minimum without reconciliation.

## Personal testing rule
Do not treat green structural audits as proof of a public-production release. For the private test launch, run the exact migration/seed/preflight/launch-check/build sequence in the handoff instructions. Test Paystack with TEST keys first and keep the site private/unannounced until the full parent → learner → payment → learning → assessment flows are personally verified.
