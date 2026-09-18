# AVORA V9.0.1 — Pre-launch Home + Sign-in Ident Polish

This patch is intentionally narrow. It does not change the database, curriculum, exam engine, mastery model, Tutor logic or existing V9 migrations.

## Fixed
- Restored the AVORA sign-in ident route after successful login.
- `/signin-intro` now renders the existing AVORA animation instead of redirecting immediately.
- Login now enters `/signin-intro` before `/home`.
- Home now reads like a signed-in command centre: `Your learning plan, <name>.`
- Public landing-page calls-to-action are session-aware, so a signed-in learner is no longer shown a contradictory `Sign in` hero button.
- Increased mobile safe-area/bottom spacing so the fixed five-item dock does not obscure Home/Learn/Tutor/Exam/Progress content near the bottom of the page.

## Database
No migration. No seed.
