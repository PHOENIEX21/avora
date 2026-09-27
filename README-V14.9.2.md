# AVORA V14.9.2 — JSS1 Mathematics Deep Teaching + Slide Tutor

This release integrates the supplied JSS1 Mathematics content rebuild and improves the learner presentation without shortening the academic source material.

## Academic integration
- Replaces `lib/jss1MathematicsDeepLessons.ts` with the supplied 24-topic deep evidence lesson set.
- Replaces 64 reviewed JSS1 Mathematics bank questions: 8 each for the eight supplied Batch 1 topics.
- Keeps the assessment bank total at 888 and preserves unique IDs.
- Preserves worked explanations and misconception metadata from the supplied bank.
- Explicitly leaves the JSS1 `Addition and Subtraction` directed-number assessment gap unresolved rather than mapping it to an inaccurate whole-number bank.

## Learner presentation
- Long authored teaching is segmented into meaningful source-order teaching slides; content is not summarised away.
- Teaching copy is larger/bolder and the current slide auto-focuses.
- Previous and Next remain fixed at the bottom of the viewport on desktop and mobile.
- Current slide progress is always visible.
- End-of-topic multiple-choice exercises use a distinct premium gold treatment with fixed answer controls and progress.
- The known directed-number topic shows an explicit `reviewed exercise pending` state and does not award or imply independent mastery.

## Safety / compatibility
- Existing imports and deep-lesson type shape remain compatible.
- Voice teaching remains feature flagged and off by default.
- V14.9.1 exercise telemetry event-type fix is retained.
- No database seed is required for these file-backed lesson/bank changes.
