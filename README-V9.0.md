# AVORA V9.0 — Integrated Learning Intelligence

V9.0 joins Tutor, Exam, mastery, remediation and evidence into one learning loop.

## Launch-critical changes
- Tutor pause cancels the active timer and browser speech; automatic progression cannot continue while paused.
- Every Tutor checkpoint stops progression until the learner answers and AVORA responds.
- Rich worked-example checkpoints send the exact question on the board to AVORA.
- Tutor progress is keyed by exam + subject + topic, so switching Mathematics/English does not corrupt recovery state.
- Independent Exam answers now update mastery; previously Exam stored attempts but did not feed mastery.
- Wrong independent answers create learner-skill insight signals and evidence-aware misconception notes.
- Completed exams create a persistent remediation plan that Home and Progress can use as the learner's next route.
- Progress distinguishes teaching coverage from independent mastery and exposes a parent/teacher-readable evidence view.
- V9 adds `012_learning_intelligence.sql` for learner insights, Tutor interactions and remediation plans.

## Academic posture
Nigeria/NERDC remains the current target curriculum. Siyavula Mathematics and the MBSSE JSS handbooks are source/reference layers with their original licensing constraints preserved. AVORA teaching text and standard-equivalent practice remain original unless content is explicitly licensed for reproduction.

## Upgrade
Preserve `.env.local`, then run:

```powershell
npm install
node --env-file=.env.local scripts/migrate.mjs
npm run audit:teaching
npm run audit:v9
npm run preflight
npm run typecheck
npm run build
```

No new content seed is required by V9.0. Migration `012_learning_intelligence.sql` is required.

## Launch smoke test
1. Sign in and confirm `/home` renders and Home appears in the mobile dock.
2. Open Learn → Mathematics → Algebra → Simultaneous Equations.
3. Start Tutor. Pause mid-event and verify speech + board progression remain frozen for at least 10 seconds.
4. Reach a Your Turn checkpoint. Verify Next is disabled until an answer is sent and AVORA responds.
5. Ask “I still don’t understand” and confirm AVORA reduces the task and changes the explanation/example.
6. Submit Practice and verify Progress records independent evidence.
7. Submit a Mock/Topic Test with at least one weak topic. Verify the result shows a recovery reason.
8. Return Home: Today’s focus should use the active remediation topic.
9. Open Progress: verify teaching coverage, independent evidence, misconceptions (when present), recent exams and parent/teacher explanation.
10. Repeat the same flow for English Language.
