# AVORA V7.18 — Complete Academic Tutor + Fresh Question Depth

V7.18 strengthens the academic core without replacing the existing auth, exam, practice, PWA or database architecture.

## What changed

- Tutor now loads multiple distinct reviewed questions per topic instead of reusing the same question for both the opening probe and guided practice.
- A correct opening answer changes teaching pace but no longer skips the required topic map.
- Topic teaching progress is persisted in `tutor_topic_progress` so a learner can return to a topic without losing the covered-section position.
- Teaching coverage and mastery are explicitly separated. Guided/covered work is not presented as independent mastery.
- Exam recovery routes continue topic by topic; each topic must complete teaching coverage before the learner is pointed to independent proof and then the next weak topic.
- Voice Tutor reads the current academic section and its key terms. Pause, continue, repeat, slower and stop remain available where browser speech synthesis is supported.
- Mathematics/English Tutor uses the existing visual whiteboard layer and complete topic maps.
- BECE bank depth is expanded with 96 additional reviewed AVORA-original questions spanning the 16 current Mathematics and English curriculum areas. These add reverse problems, applications, comparison, inference and multi-step reasoning rather than only number swaps.
- New questions carry `curriculum_objective`, `variant_family`, `content_origin` and `quality_status` metadata using the existing V7.8 question-engine columns.

## Required local commands

Preserve `.env.local`, then run:

```powershell
npm install
node --env-file=.env.local scripts/migrate.mjs
node --env-file=.env.local scripts/seed.mjs
npm run dev
```

Migration 009 is idempotent and only creates the Tutor progress table.

## Academic rule

AVORA distinguishes three states:

1. **Exposed/taught** — the learner has received the explanation.
2. **Covered** — the learner has moved through the required topic section and its check/guided work.
3. **Mastered** — fresh independent evidence satisfies the mastery rule.

A correct probe can speed instruction, but cannot silently remove required class/exam coverage.
