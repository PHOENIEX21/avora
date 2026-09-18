# AVORA teaching-pipeline fix — 2026-09-15

## End goal
For source-backed JSS lessons, AVORA now teaches the authored curriculum content in sequence instead of surrounding it with generic tutor filler. Only authored `checks[]` are learner questions.

## Structural fixes
- `lib/lessonStepEngine.ts`: wording such as `What is...`, `Why is...`, `Solve:` and `Find:` no longer turns ordinary teaching prose into a learner `ASK` step. `ASK` is created only from authored checks.
- `lib/lessonStepEngine.ts`: merely mentioning a diagram/number line/whiteboard no longer suppresses academic narration as `DRAW`. `DRAW` is reserved for actual visual-creation instructions such as `Draw...`, `Sketch...`, `Plot...`, or `Construct...`.
- `lib/lessonPresentation.ts`: English structural labels are handled; inline essay labels are stripped without deleting the model paragraph; editorial `[Annotation: ...]` / `[Closing body: ...]` notes are removed from learner speech.
- `components/TutorClient.tsx`: source-backed units use the source teaching moments as the authoritative live lesson. Generic duplicate explanations/examples/misconceptions are not appended around them.
- `scripts/audit-teaching-pipeline-regression.mjs`: permanent all-unit regression audit added. It executes every source-backed JSS unit through the real step engine and presentation functions, checks all six JSS class/subject combinations, preserves authored-check parity, and guards NCEE teaching-ready source against internal-note leakage.
- `package.json`: `audit:teaching-pipeline` added and included in `launch:check`.

## Source inventory verified in this package
`sentCurriculumRuntime.ts` contains 151 source-backed units across JSS1/JSS2/JSS3 Mathematics and English Language. NCEE uses its separate authored source runtime and `ncee-source-content-v14.8.json`; the new audit guards its teaching-ready source as well.

## Validation note
The regression script is wired into `launch:check`. In this sandbox, dependency installation did not finish before the execution timeout, so the full TypeScript/build suite could not be honestly reported as passed here. Run `npm install` (or `npm ci`) in the project, then `npm run audit:teaching-pipeline`, `npm run typecheck`, and finally `npm run launch:check` before deployment.
