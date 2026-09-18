# AVORA V13.9.0 — Synchronized Tutor Voice Runtime

This release extends V13.8.0 without replacing its curriculum, mocks, assessment bank, family/trial rules, admin, or exact re-guidance system.

## Tutor delivery upgrades
- Chooses the best available English browser voice, preferring `en-NG`, then high-quality English alternatives.
- Learners can select an installed teacher voice; the preference persists on that browser.
- Narration is segmented into teacher-sized phrases/sentences instead of one large speech request.
- Board lines progressively reveal as narration advances rather than appearing all at once.
- Word-boundary events drive visible narration progress where the browser supports them.
- Pause/resume uses the browser speech engine's real pause/resume path so a learner can interrupt without deliberately restarting the explanation.
- Replay, speed, voice-off, previous/next, checkpoints and exact misconception re-guidance remain available.
- If speech synthesis is unavailable, AVORA falls back to paced board teaching rather than blocking the lesson.
- Reduced-motion and mobile layouts are supported.

## Important production truth
This is a significantly stronger browser-native speech runtime, but browser voices differ by device/OS. V13.9 does not claim a single identical neural voice on every device and does not introduce a paid TTS provider. A future server/cloud TTS provider can be added behind the same step runtime if AVORA requires uniform studio-quality voice across devices.

## Verification
Run:

```powershell
npm ci
npm run audit:v13.9-voice-runtime
npm run launch:check
npm run build
```
