# AVORA V14.9.0 — September 2025 NERDC JSS1/JSS2 Deep Teaching Integration

V14.9 makes the user-supplied September 2025 NERDC New Revised Basic Education Curriculum tables the runtime authority for the current JSS1/JSS2 cohort.

## Current-cohort official inventory

- JSS1 Mathematics: 23 official topics
- JSS1 English Studies: 17 official topics
- JSS2 Mathematics: 16 official topics
- JSS2 English Studies: 19 official topics
- Total: 75 official NERDC topics

Broad NERDC topics may resolve to several AVORA teaching units so every performance objective can be taught explicitly without renaming or fragmenting the official topic visible to the learner.

## Text-first teaching

The written lesson/board is the academic source of truth. Current JSS1/JSS2 teaching is learner-controlled and text-first. The existing speech-synthesis/voice teaching implementation is preserved for later development behind `NEXT_PUBLIC_VOICE_TEACHING_ENABLED`; the example environment keeps it `false` by default.

## Topic exercise flow

After the teaching sequence, current-cohort topics enter a 15-question multiple-choice exercise with answer explanations and an 80% mastery/reteach gate. Correct answers remain server-side until the learner submits an answer.

Six JSS2 English topics that had no compatible reviewed legacy questions now have 90 purpose-written AVORA NERDC questions (15 each):

- Debate
- Oral Summary
- Sentence Types (function): Declarative, Interrogative, Imperative (command) and Exclamatory
- Structural Sentence Types (simple, compound and complex)
- Skit-making
- Writing dialogues

These authored banks take priority over generic concept-check fallback generation.

## Reconciled academic truth surfaces

The learner Curriculum page, Admin Academic Preview, Tutor runtime, objective registry and integration manifest now use the exact current NERDC topic IDs/pages for JSS1/JSS2. The older 111-subtopic registry and 888-question bank remain reusable evidence/assets where mapped, but they no longer define the current curriculum scope.

## Verification added/updated

- `audit:v14.9-nerdc-official`
- `audit:v14.9-authored-english-bank`
- rebuilt current-cohort JSS1/JSS2 subject audits
- reconciled curriculum-reality audit
- launch check now includes the V14.9 authored bank and curriculum audit

The original `AVORA_TEST_TEACHING_PIPELINE_FIXED.zip` remains an untouched restore point.
