# AVORA V9.0.3 — Tutor Clarity + Aligned Practice Fix

This pre-launch patch is built directly on V9.0.2.

## What changed

### Tutor questions now stay aligned with the exact section being taught
- Reviewed-bank questions are scored against the current Tutor unit's title, terminology, explanation and outcomes.
- A question with no meaningful match is not shown just because it belongs to the same broad topic.
- Example verified in the patch test: `Area of a square of side 6 cm?` scores 0 against `Lines, angles and angle relationships`, so it will not be used after the angle lesson.
- If no aligned reviewed question is available, AVORA does not force an unrelated question. The teaching checkpoint remains the learner interaction for that section and the lesson continues.

### Teaching checkpoints are clearer
- The learner sees the exact question by itself, not the full narration text.
- Each checkpoint now includes **What AVORA wants you to do**.
- Added **Explain what this question wants**.
- Added **Show me a model answer**.
- Removed the duplicate generic checkpoint that repeated the same `unit.check` wording twice.

### Guided practice gives explicit feedback
- AVORA states **Correct ✓** or **Not yet**.
- The learner's submitted answer stays visible in the feedback.
- If wrong, the learner can ask AVORA to explain the question before trying again.
- After a wrong attempt, **Show AVORA's answer and teach me why** reveals the stored correct answer and explanation.
- Revealed answers are explicitly marked as learning help, not independent mastery.

### Past-year selector fixed
- The selected year is forced to visible navy text on a white field on mobile/desktop.
- Loading state is explicit instead of looking like an empty input.
- Student-facing copy no longer leads with licensing/rights language; source transparency remains recorded.

## Tests completed in the assistant environment
- TypeScript: PASS
- Teaching-depth audit: PASS — 38 topic plans / 145 units / 381 definitions
- V9 integration audit: PASS — 24/24
- V9 behaviour tests: PASS
- V9.0.3 Tutor clarity tests: PASS — 10/10
- Mismatch simulation: PASS — unrelated square-area question rejected for angle teaching
- ESLint: 0 errors, 14 pre-existing warnings

A full Next.js Linux build could not run in the assistant container because the available dependency set contains no Linux SWC binary and the container cannot reach npm to download it. The Windows production build remains the final gate, exactly as with V9.0.2.

## No database changes
No migration and no seed are required.

## After replacing the project
Keep `.env.local`, then run:

```powershell
npm install
npm run launch:check
npm run preflight
npm run build
npm run dev -- --hostname 0.0.0.0
```

## Manual test to repeat
1. Open Geometry & Mensuration and reach **Lines, angles and angle relationships**.
2. At the checkpoint, confirm the question appears once and the learner sees what AVORA expects.
3. Try **Explain what this question wants** and **Show me a model answer**.
4. Continue. AVORA must not follow the angle section with `Area of a square of side 6 cm?`.
5. On a matching guided question, answer wrongly and verify **Not yet**, your submitted answer, the hint, and **Show AVORA's answer and teach me why**.
6. Open Exam → Past-year practice and verify years are visibly readable in the dropdown.
