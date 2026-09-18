# AVORA V9.9.0 — JSS1/JSS2 Assessment Parity Checkpoint

This checkpoint closes the known JSS1/JSS2 independent-bank routing gap without claiming public-launch readiness.

## Built
- 688 AVORA-original JSS1/JSS2 independent questions.
- Exactly 8 questions for every one of the 86 JSS1/JSS2 Mathematics + English curriculum topics currently registered in AVORA.
- 86 curriculum-linked performance/mastery tasks.
- Every topic bank spans concept, application/example recognition, misconception detection, curriculum objective, independent transfer and mastery-evidence decisions.
- JSS1/JSS2 Practice and Exam routes now use learner class + subject + class topic instead of BECE/JSS3 questions.
- JSS1/JSS2 full mocks, Quick 10, Topic Test, Weakness Test and Diagnostics can use their own banks.
- JSS3 remains BECE-aligned; past-year BECE practice stays JSS3-only.
- Migration 014 adds question class/topic metadata and the performance-task registry.
- `npm run db:migrate` applies migration 014 and idempotently seeds the class assessment bank.
- Preflight verifies >=40 reviewed questions per JSS1/JSS2 subject and >=5 per official topic.

## Assessment parity audit
16/16 PASS.

## Critical curriculum-version launch guard
NERDC now exposes a **New Revised Basic Education Curriculum** published in September 2025, and the official implementation notice says rollout begins at the start of each three-year education cycle, including JSS1. AVORA's deep JSS1/JSS2 teaching map was built primarily from the earlier published JSS1-JSS3 curriculum documents. Therefore this checkpoint deliberately sets `launchAllowed: false` in `data/curriculum-version-status.json`.

Before public launch, JSS1 and JSS2 Mathematics and English must be reconciled objective-by-objective against the new revised NERDC class-specific curriculum. The launch guard must only be removed after that reconciliation is evidenced in code and audits.

Do not use this checkpoint as the public launch build.
