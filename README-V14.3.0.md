# AVORA V14.3.0 — Zero-Fixed-Cost Infrastructure Hardening

Extends V14.2. Brevo transactional email is now the primary provider; SendGrid is only an optional temporary fallback and is no longer a launch requirement. Registration remains provider-independent: the learner account is committed before any optional verification resend flow, so an email outage does not erase signup.

Adds database-backed AI usage guardrails with configurable per-user daily and global monthly request ceilings (`lib/aiCostGuard.ts`, migration 030). The helper is intentionally fail-closed when integrated into AI routes in a subsequent runtime pass; V14.3 establishes the persistent budget primitive without pretending every historical AI call has already been migrated to it.

Hosting portability principle: AVORA remains standard Next.js + PostgreSQL and should not add Vercel-only runtime dependencies. This keeps migration to a Node/Docker host possible.
