# AVORA V12.7.0 — Login Security Hardening

This release closes the login brute-force gap found during the V12.6 truth audit.

## Protection model
- Durable PostgreSQL-backed throttling; no in-memory counter that disappears between serverless instances.
- 5 failed attempts per identity+IP bucket inside 15 minutes triggers a 15-minute lock for that pair.
- 20 failed attempts against one identity across IPs inside 15 minutes triggers a 15-minute account-wide backstop against distributed guessing.
- 30 failed attempts per IP inside 15 minutes triggers a 15-minute IP lock against password spraying.
- Email/IP bucket identifiers are SHA-256 hashed before persistence; raw email addresses and IP addresses are not stored in the rate-limit table.
- Login checks throttling before password verification.
- Failed authentication increments the security buckets atomically using PostgreSQL `ON CONFLICT ... DO UPDATE`.
- Successful authentication clears only the proven identity+IP pair. It deliberately does not clear the broader IP bucket.
- HTTP 429 responses include `Retry-After` and `Cache-Control: no-store`.
- Invalid credentials retain a generic response to reduce account enumeration.
- Production refuses to create/verify sessions when `AUTH_SECRET` is missing or shorter than 32 characters.

## Database
New forward-only migration: `database/migrations/026_login_security.sql`.
Do not rename or replace historical migrations 024/025. Apply with the existing migration command:

`npm run db:migrate`

The launch preflight now requires migration 026 to be recorded in `schema_migrations` and verifies the `login_rate_limits` table exists.

## Audit
Run:

`npm run audit:v12.7-security`
