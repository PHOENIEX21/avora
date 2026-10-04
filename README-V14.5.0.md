# AVORA V14.5.0 — Gemini Trial Tutor + Reliable Signup Email

V14.5 keeps Vercel as the active test host.

## AI gateway
- `AI_PROVIDER=gemini` is the default.
- `GEMINI_MODEL=gemini-2.5-flash` is the default trial Tutor model.
- Existing OpenAI support remains an optional fallback through `OPENAI_API_KEY`/`OPENAI_MODEL` (legacy `AI_API_KEY`/`AI_MODEL` are still accepted).
- Tutor chat, Practice explanation, mock short-answer marking and extended mock grading now call the AVORA AI gateway rather than provider URLs directly.
- Gemini free-tier usage is recorded as zero estimated provider token cost; OpenAI fallback retains estimated token cost tracking.
- Account-identifying fields are stripped from prompts before provider delivery where they appear as labelled text. AVORA routes should continue to send only academic context.

## Signup email
- Learner and parent signup now create an email-verification token and attempt transactional delivery immediately.
- Brevo remains primary; SendGrid remains optional fallback.
- Account creation is committed before delivery. If delivery fails, the account survives and `/api/auth/resend-verification` can retry.
- Email verification is deliberately not made a hard login blocker in this release, preventing an email-provider outage from locking learners out during launch testing.

## Required launch variables
`AI_PROVIDER=gemini`
`GEMINI_API_KEY=...`
`GEMINI_MODEL=gemini-2.5-flash`
`BREVO_API_KEY=...`
`EMAIL_FROM=...`
`EMAIL_FROM_NAME=AVORA`

Run migrations 031 and 032 before the V14.5 launch preflight.
