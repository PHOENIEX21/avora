# AVORA V7.4 — Premium Learning Home

This patch redesigns the authenticated `/welcome` experience while preserving the existing V7.2 exam/tutor/runtime fixes.

## What changed
- Premium, restrained personalized welcome layout.
- Clear exam + subject context at the top.
- `Continue with AVORA` now returns the learner to `/tutor` instead of the old generic Practice flow.
- `View exam map` gives an immediate route back to the Exam Centre.
- Today's focus is shown compactly with topic, skill, state and evidence.
- Next move is structured separately from learning evidence.
- Compact evidence metrics replace the oversized/fussy presentation.
- Weak-skill priorities are presented as an editorial list rather than a wall of cards.
- Mobile layout is tightened and all important actions remain visible.
- No database migration is required.

## Install
Keep your existing `.env.local`, replace the current project files with this package, then restart the dev server:

```powershell
npm run dev
```

If the server is already running, stop it with Ctrl+C first.

## Build verification note
This exported package intentionally contains no `node_modules`. The build environment used to create the ZIP therefore could not run `next build` without reinstalling dependencies. No migration or database schema changes were made.
