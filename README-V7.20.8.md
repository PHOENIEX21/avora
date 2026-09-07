# AVORA V7.20.8 — Pre-host production & human design pass

Built on V7.20.7.

## What changed
- Human/editorial education visual system: warm paper, ink navy, restrained brass gold, reduced gradients/glass/orbit decoration, tighter radii and flatter materials.
- Headings use an editorial serif stack; interface text uses the native system sans stack. No external font dependency.
- Mobile navigation reduced to five clear destinations. Practice and Progress live under More so a 360px phone is not cramped by six tiny tabs.
- Signed-in mobile footer is hidden to avoid fighting the fixed learning navigation.
- Added route-level error and not-found experiences so a failure does not dump a raw framework screen on learners.
- Added `npm run preflight` for environment, database, table and question-bank readiness checks.
- Removed the public-site claim that a short video is currently part of Tutor; the page now describes the implemented live board teaching experience.

## Before hosting
1. Keep `.env.local` private.
2. `npm install`
3. `node --env-file=.env.local scripts/migrate.mjs`
4. `node --env-file=.env.local scripts/seed.mjs`
5. `npm run preflight`
6. `npm run build`
7. Only deploy after preflight and build both pass.

For production, set `APP_URL` to the final HTTPS deployment URL and configure SendGrid variables before inviting real learners.
