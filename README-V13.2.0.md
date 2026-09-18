# AVORA V13.2.0 — Family Flow, Live Trial Countdown & Examination Bank Rebuild

## 14-day trial
- Trial begins when a learner identity is created.
- The remaining days are shown globally to signed-in learners.
- Countdown recomputes live in the browser and decreases automatically as time passes.
- Parent family trials also show a live global countdown.
- Existing learners without a trial record receive one through the established entitlement fallback.

## Family structure
One Parent/Guardian account is the family owner.
It can manage up to three learner profiles.

Parent-first:
1. Parent registers/signs in.
2. Parent opens `/parent/family`.
3. If child already has AVORA, enter the child's one-time Parent connection code.
4. If child is new, create a learner login directly from Family Setup.
5. Each learner signs in separately and keeps independent class/progress/evidence.

Child-first:
1. Learner creates a normal student account and signs in independently.
2. Learner opens Parent connection.
3. Learner gives the one-time code to the parent/guardian.
4. Parent signs in, opens Manage family, and enters the code.

Sibling:
Repeat Add learner for each sibling until 3/3 seats are used.

Duplicate protection:
- duplicate email identity rejected
- duplicate parent/child active link rejected
- one learner cannot occupy two active family subscription seats
- fourth learner blocked server-side

## JSS1/JSS2 assessment bank
The former 888 curriculum/meta questions have been replaced.
The bank now contains:
- 888 direct examination-practice MCQs
- 111 JSS1/JSS2 revised-topic compatibility IDs
- exactly 8 questions per compatibility topic
- 4 unique options per question
- exactly one keyed answer
- 888 unique prompts
- no AVORA/curriculum-awareness prompts
- balanced key positions: 222 A / 222 B / 222 C / 222 D
- review version V13.2.0

`npm run db:migrate` runs the class-assessment seed and retires superseded current-cohort AVORA questions before installing V13.2.0.

## Required release gate
`npm run audit:v13.2-family-trial-bank`

## Verified static audits
- V13.2 Family + Trial + Exam Bank: 24/24
- V13 Master Curriculum: 20/20
- V12.8 Source Truth: 24/24
- Deep Teaching Standard: 12/12
- Assessment Parity/Compatibility: 20/20
- V12.7 Security: 14/14
- Visual teaching: 39/39
- Changed TypeScript/TSX syntax transpilation: PASS

## Remaining environment check
This archive does not include `node_modules`. Run:
`npm ci`
`npm run db:migrate`
`npm run launch:check`
`npm run build`
in the deployment/local environment before claiming production build success.
