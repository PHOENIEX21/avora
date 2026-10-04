# AVORA V8.0 — Teacher Engine Foundation

This build is the first architecture step away from the scripted whiteboard Tutor.

## What changed

- Login now goes directly to `/home`; `/signin-intro` is a legacy server redirect to `/home`.
- `/welcome` remains a server redirect to `/home`.
- Home is forced dynamic and its primary action now opens learning rather than an exam-first path.
- Learn now lets a learner choose Mathematics or English directly, then choose any available topic and open Tutor immediately.
- Tutor supports subject-aware loading through `/api/tutor?subject=...`.
- New `/api/tutor/chat` endpoint:
  - uses a real AI Teacher when `AI_API_KEY` is configured;
  - uses the curriculum-grounded local teacher fallback when it is not;
  - receives current topic, unit, board state and recent conversation.
- Replaced the old timed whiteboard slides with a lesson event controller. Board events are generated from the complete topic unit: purpose, prerequisites, terms, core explanation, worked example, common mistakes and section reflection.
- Pause cancels the speech and the lesson advance timer. Nothing advances until Continue.
- Replay repeats the same teaching event; slower speed and voice on/off remain available.
- Asking AVORA pauses the lesson and sends the exact lesson/board context to the Teacher Engine.
- Correct-answer feedback stays visible until the learner explicitly continues.
- Removed the previous unit/question text collision that could show unrelated prompts on the same section check.
- Full Mock selection now preserves curriculum topic blocks: up to 5 reviewed questions from one topic before moving to the next topic. Blocks are ordered by curriculum topic order and roughly easy-to-hard within each block. Full mock remains 40 questions when the bank supports it.

## Important

No database migration is required for V8.0.
No seed is required specifically for V8.0.
The quality/depth of every topic still depends on the authored curriculum maps and the reviewed question bank. The new Teacher Engine is now ready for legally permitted textbook grounding as that content is ingested.

## AI cost

`AI_API_KEY` can remain blank. AVORA still runs using the grounded local tutor fallback. When a key is later added, natural learner interruptions use the AI Teacher endpoint. `AI_MODEL` defaults to `gpt-5.6-luna` and can be changed in environment variables.
