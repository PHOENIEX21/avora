# AVORA V13.8.0 — Tutor Runtime + Exact Re-guidance

V13.8 extends V13.7 without replacing the master curriculum, authored mocks, trial/family rules, or assessment bank.

## What changed

- Source-backed Tutor steps now have deterministic content-based IDs rather than fragile positional IDs.
- Tutor sends an allow-listed map of the current lesson steps to the teacher API.
- Misconception/help responses can point back to an exact valid teaching step.
- The client can reopen that exact step for targeted re-teaching.
- Assistance is classified as HINT, RETEACH, or ANSWER. Substantial help explicitly requires fresh independent evidence.
- The live board shows the active step ID and board-action semantics.
- Existing browser speech playback remains synchronized at the teaching-step level: a source step is placed on the board, spoken, paused, then AVORA advances. Learner-response steps stop the lesson until the learner answers.
- Voice failure degrades to timed visual teaching rather than blocking the lesson.

## Release checks

Run locally:

```powershell
npm ci
npm run audit:v13.8-tutor-runtime
npm run launch:check
npm run build
```

A source audit does not replace a dependency-backed Next.js build or real-device/student testing.
