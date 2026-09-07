# AVORA V7.16 — Tutor Voice + Assessment Reliability

This build addresses the runtime problems reported from the mobile student app.

## Fixed
- Exam Centre no longer depends on question_exposures to start a paper; historical attempts provide freshness and exposure tracking is best-effort.
- Full Mock requires 40 usable reviewed questions; Quick 10 requires 10.
- Weakness Test now prioritizes areas with weaker prior evidence.
- Exam answers retry on transient Neon failures and short answers are not written on every keystroke.
- Exam submission preserves the current answer and reports sync failures without throwing the student away from the paper.
- Practice and Tutor reject malformed/very-short published prompts (such as a stray single-letter question).
- Focused topic practice counts five fresh questions in the current learning session and never silently moves to another topic.
- Core answer checking remains shared across Tutor, Practice and Exam.
- Onboarding no longer forces a completed learner back into Diagnostic. New onboarding lands on Home; Diagnostic is an optional Start Here task.
- FOUNDATION was removed from onboarding until a reviewed Foundation content bank exists, preventing an empty-content route.
- More Neon operations use retry logic.

## Tutor upgrade
- Tutor starts with a reviewed curriculum-standard question from the question bank, not a vague canned meta-question.
- Browser voice playback using SpeechSynthesis: Hear Tutor, Pause/Continue, Repeat, Slower and Stop.
- Optional speech-to-text answer input where the browser supports SpeechRecognition/webkitSpeechRecognition.
- Visual whiteboard foundation with topic-aware Algebra, Percentage and general visual teaching boards.
- Explain more simply, show/hide whiteboard, show another example, let me try, explain again, then independent proof.

## Important
This is not yet the final real-human/avatar video tutor. V7.16 adds the voice + whiteboard interaction layer needed for that future synchronized video experience without pretending a prerecorded video asset exists.

No new database migration is required for V7.16. Existing V7.8+ migrations remain compatible.
