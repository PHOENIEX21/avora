# AVORA V8.2 — Real Teacher + Textbook Route

This build responds to live mobile testing rather than adding cosmetic polish.

## Fixed
- Pause now uses a synchronous ref/token guard, cancels pending timers and speech, and pauses board animation CSS.
- Mobile dock is explicitly five columns and signed-in pages reserve enough bottom space so Home/content is not hidden behind the dock.
- A teaching checkpoint no longer auto-advances. The lesson waits for the learner to type working/reasoning and AVORA responds before continuing.

## Teaching depth
- Definitions remain explicit.
- Worked examples are now broken into purpose/method/steps/check rather than merely displayed.
- A second-example transfer event is included before independent work.
- Local (no paid AI key) Tutor answers were strengthened substantially, including direct speech-sound minimal-pair teaching such as ship/sheep.
- AI mode is instructed to teach to classroom depth: prerequisite -> definition -> reason -> worked example -> learner turn.

## Textbook grounding
- Added the exact JSS1, JSS2 and JSS3 Mathematics chapter/section scope from Siyavula Nigeria's NERDC open textbook catalogue.
- Tutor shows the relevant textbook chapter route and attribution for Mathematics.
- This is an adaptation/teaching layer; it does not claim external embedded media are licensed.

No new database migration is required for V8.2.
