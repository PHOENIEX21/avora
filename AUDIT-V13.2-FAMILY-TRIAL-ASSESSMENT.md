# AVORA V13.2.0 — Family, Trial and JSS1/JSS2 Assessment Verification

## 14-day trial
- Learner trial is created at registration.
- Countdown is rendered globally for signed-in learners and recalculates in the browser.
- Family trial countdown is also shown to parents.
- Access expires from the persisted server timestamp; refreshing or changing devices does not restart the trial.

## Family structure
- Parent-first: create/sign in to Parent account → Manage family → create a new learner OR enter an existing learner's one-time code.
- Child-first: learner creates/signs in to own account → Parent connection → generate code → parent signs in → Manage family → enters code.
- Siblings: repeat either path until 3 learner identities are linked.
- Every learner has a separate login/profile/history.
- Fourth learner is rejected server-side.
- Duplicate email identity is rejected.
- Duplicate parent-child linking is rejected.
- A learner already occupying another active family subscription cannot be silently attached.

## JSS1/JSS2 assessment bank
- Questions: 888
- Unique prompts: 888
- Four unique choices + one exact keyed answer: verified by release audit.
- Curriculum/meta prompts: removed from the V13.2 published bank.
- Answer-key positions: exactly 222 each in A/B/C/D.
- Static exam-standard failures in the additional ambiguity/meta/key scan: 0.

### Important curriculum compatibility boundary
The physical assessment bank retains 111 fine-grained JSS1/JSS2 assessment-skill IDs from the reviewed bank schema so existing database/seed infrastructure can be migrated safely. Learner-facing curriculum authority remains the 96-topic V13 Master Curriculum. `lib/masterTopicAliases.ts` is the compatibility bridge used by Practice/Exam/Tutor lookup. These 111 assessment skill IDs are not a second learner-facing curriculum authority.

## Release audit
`scripts/audit-v13.2-family-trial-bank.mjs` — 24/24 PASS.
