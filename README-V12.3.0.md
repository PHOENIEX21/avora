# AVORA V12.3.0 — Launch Completeness Pass

This release is a cumulative hardening pass over V12.2.0.

Key fixes:
- Primary 5 and Primary 6 can register directly and are routed server-side to NCEE; JSS1–JSS3 are routed to BECE.
- Secure forgot-password/reset-password flow with hashed, single-use 30-minute tokens and migration `025_password_reset.sql`.
- Admin dashboard visibly exposes Academic Preview for both NCEE and BECE.
- Tutor board reserves physical space for its progress timeline and wraps long teaching text so content cannot collide with the timeline on narrow phones.
- Human Support auto-scrolls to the newest message and keeps the conversation stream scrollable without pushing the composer away.
- Internal client navigation was converted to Next.js router navigation; ESLint now reports zero warnings/errors in the audited source.
- Preflight now requires the password-reset table and migration 025.

Apply migration 025 once, then run `npm run launch:check`, `npm run preflight`, and `npm run build` in the real Windows project before Vercel deployment.
