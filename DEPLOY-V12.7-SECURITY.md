# AVORA V12.7.0 deployment checklist

After replacing the project with this build:

1. Restore/install dependencies:
   `npm ci`
2. Confirm `.env.local` contains a production-grade `AUTH_SECRET` of at least 32 characters and the existing required environment variables.
3. Apply the forward-only database migration:
   `npm run db:migrate`
   This applies `026_login_security.sql` if it has not already been recorded in `schema_migrations`.
4. Run the focused security gate:
   `npm run audit:v12.7-security`
5. Run database/environment preflight against Neon:
   `npm run preflight`
6. Run full code checks:
   `npm run typecheck`
   `npm run lint`
   `npm run build`
7. Deploy only after all commands above pass.

Do not manually rename 024/025 or create the login table in Neon by hand. Let the migration runner apply 026 and record it transactionally.
