# AVORA V6 — Curriculum Path + Evidence Groups

V6 changes normal learning from random practice to a focused curriculum path.

- Exam choice filters the curriculum (BECE / NCEE starter sets).
- Normal practice stays on one skill/question group.
- AVORA collects at least 5 pieces of evidence before moving a learner on.
- A skill needs at least 80% focused accuracy before automatic progression.
- Diagnostic remains intentionally mixed.
- `/learn` shows the learner exactly where they are in the path.
- Practice displays Exam → Subject → Topic → Current Skill and evidence progress.
- Wrong answers no longer expose the full worked answer immediately.
- Migration 006 adds question groups and current curriculum position.
- The Next.js development indicator is disabled so the black dev `N` is not mistaken for AVORA UI.

## Upgrade from V5
Keep your existing `.env.local`, then run:

```powershell
npm install
node --env-file=.env.local scripts/migrate.mjs
node --env-file=.env.local scripts/seed.mjs
npm run dev
```

Expected migration: `006_curriculum_groups.sql`.


## V7.2 runtime compatibility fix
- Normalizes legacy/new JSON option shapes before rendering.
- Practice and Exam clients guard against non-array option data.
- Exam API safely falls back to short-answer rendering if an MCQ has no valid option array.
