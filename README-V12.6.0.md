# AVORA V12.6.0 — Source-Truth Teaching Rebuild

This release corrects a major trust gap discovered during a full audit: the curriculum Markdown supplied for AVORA existed in the project, but it was not itself driving the live Tutor teaching sequence. V12.6 compiles those supplied sources into runtime teaching units and checkpoints.

## Source-backed runtime coverage

- 14 supplied curriculum documents compiled into live Tutor data.
- 94 ordered source lesson units.
- 1,600 ordered source teaching steps.
- 389 learner-first source practice/checkpoint questions.
- 14 JSS3 mock reference solutions held separately from the pre-attempt teaching stream.
- 12 complete term-course entries covering the supplied terms:
  - JSS1 Mathematics Terms 1–3
  - JSS2 Mathematics Terms 1–3
  - JSS3 Mathematics Terms 1–3
  - JSS1 English Language Terms 1–3
- Foundational Units of Measurement integrated into JSS1 Mathematics source coverage.
- Multiplying Two Brackets moved into the algebra/factorisation dependency point instead of being treated as a detached note.

## Two ways supplied material is reachable

1. Matching official curriculum topics receive their relevant supplied source units before independent mastery.
2. Each supplied term is also available as a `SOURCE COURSE` topic so every supplied section remains reachable even when the current revised NERDC topic names differ from the user's source scheme. This is especially important for source material such as JSS2 `Use of ICT in Mathematics`, which does not have a one-to-one current official topic in the runtime inventory.

## Answer-first exercise contract corrected

- Source practice becomes Tutor checkpoints rather than displayed notes.
- The learner must submit an attempt before checkpoint progression unlocks.
- Pre-attempt `Show me a model answer` was removed.
- After an attempt, AVORA must preserve correct work, identify the first meaningful gap, and distinguish partly-correct/correct-so-far work from wrong work.
- A full worked solution is available only after a diagnostic hint/teaching step.
- JSS3 mock objective/theory solutions are stored as private reference solutions and are not emitted in the pre-attempt source steps.

## Mathematical correction made during audit

The supplied JSS1 second-term `2x+3=11` misconception example contained a misleading divide-first line. Runtime/source copy now explicitly teaches that dividing both sides by 2 must divide **every term**:

`x + 3/2 = 11/2`

That legal route still gives `x=4`; the faulty `x+3=5.5` route is identified as illegal because the `+3` term was not divided.

## Visual/board teaching retained

V12.5 structured visual rendering remains connected for equations, coordinate plane, number lines, fractions, place value, binary, geometry, polygons, solids, constructions, bearings, angles, data representations and ratio models.

## New truth audit

Run:

`npm run audit:v12.6-source-truth`

The audit checks source-document compilation, source-step/checkpoint counts, representative high-risk content, source-course reachability, official-topic augmentation, answer-first locks, partial-answer behavior, hidden mock solutions, and the corrected algebra misconception.

The launch gate now includes both the V12.5 visual audit and V12.6 source-truth audit.

## Truthfulness boundary

This release proves that the curriculum material supplied in the project is now connected to runtime teaching and learner checkpoints. It does **not** claim that no human academic review can ever find another wording, curriculum, or pedagogy issue. Academic review remains an ongoing quality-control layer; AVORA should never convert an audit count into a claim of infallibility.
