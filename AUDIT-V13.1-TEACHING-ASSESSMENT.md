# AVORA V13.1 — Teaching + Assessment Verification

## What changed
1. Added `lib/lessonStepEngine.ts`: source lessons now compile to structured board/voice actions (`WRITE`, `DRAW`, `HIGHLIGHT`, `ASK`, `PAUSE`) with narration, ordering, pause timing and learner-response flags.
2. Every source-backed Tutor unit receives `structuredSteps`; Tutor consumes them as synchronized live-lesson events.
3. Added `lib/questionQuality.ts`: a live exam-standard gate checks explicit task commands, rejects curriculum/meta questions, validates MCQ construction, and selects a grading strategy.
4. Practice, Exam and Tutor checking now withhold questions that fail the clarity gate.
5. Grading strategies distinguish MCQ, exact numeric, exact text, structured response and rubric/LLM judgement.
6. Existing wrong-answer diagnosis still preserves correct work, locates the first meaningful gap, gives one next prompt, and prevents premature full-answer dumping.

## Critical finding
The old 888-question JSS1/JSS2 generated compatibility bank is NOT acceptable as an exam-standard learner bank. The V13.1 audit detects 888/888 as curriculum/meta-style questions (for example, asking which statement represents curriculum understanding rather than asking the learner to perform the actual Mathematics/English skill).

V13.1 therefore blocks those items from live Practice/Exam delivery instead of pretending they are good questions. They remain only as compatibility/archive data until replaced by an editorially rebuilt master-topic bank.

## Audit
`npm run audit:v13.1-teaching-assessment`
Expected: 15/15 PASS.

## Release truth
Teaching structure and the assessment safety gate are implemented. A replacement JSS1/JSS2 exam-standard question bank is still required before those classes can be considered assessment-complete. Real-student/teacher pilot testing also cannot be honestly claimed until humans actually perform it.
