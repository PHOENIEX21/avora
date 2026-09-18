# AVORA V9.8.1 — Launch Candidate Audit

This release is the first launch-gate build after the JSS1–JSS3 Mathematics and English deep curriculum work.

## Critical fixes made during launch verification

- Wired the 118 deep NERDC curriculum lesson records into the **live Tutor**, not only the audit/coverage layer.
- Tutor topic lists now come from the learner's actual **JSS1/JSS2/JSS3 official curriculum inventory**.
- Tutor chat uses the same deep class/topic lesson as the visible teaching session.
- Learn now lists the official curriculum for the learner's class instead of the older JSS3 question-bank topic map.
- Corrected package/release version drift and added the missing JSS3 English audit to `launch:check`.
- Aligned current launch onboarding to **JSS1–JSS3 toward BECE**; removed contradictory Common Entrance/NCEE selection from the learner flow.
- Added migration `013_launch_curriculum_alignment.sql` to normalize legacy JSS profiles to BECE without deleting learner data.
- Protected JSS1/JSS2 learners from being given the older JSS3/BECE independent assessment bank as if it were class-valid evidence.
- Strengthened production preflight to require email verification configuration and the latest migration.
- Made user/profile registration atomic and escaped user names inserted into verification-email HTML.

## Academic state

Deep teaching records exist for all 118 official inventory entries:

- Mathematics: JSS1 24, JSS2 15, JSS3 15
- English: JSS1 23, JSS2 24, JSS3 17

The live Tutor now consumes those records.

## Assessment integrity

The reviewed independent assessment/question bank is strongest for JSS3/BECE. V9.8.1 therefore does **not** pretend that JSS1/JSS2 have equivalent independent assessment coverage. JSS1/JSS2 Learn + Tutor remain available; Practice/BECE Exam display an integrity notice rather than scoring the learner with the wrong class bank.

This is intentional and should remain until class-specific reviewed question banks are built.

## Before public deployment

Keep the real `.env.local`; do not copy one from the ZIP. Then run:

```bash
npm install
npm run db:migrate
npm run launch:check
npm run preflight
npm run build
```

For a public production launch, configure at minimum:

- `DATABASE_URL`
- `AUTH_SECRET` (32+ characters)
- `APP_URL` as the final HTTPS URL
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`

`AI_API_KEY` is optional because Tutor has a grounded local fallback, but AI-backed conversational adaptation requires it.

## Launch rule

Do not launch if `db:migrate`, `launch:check`, `preflight`, or `build` fails. Resolve the failing gate first.
