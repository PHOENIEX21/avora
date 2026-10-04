# AVORA V14.5.5

Targeted reliability fixes after real local launch checks.

- Hardened `seed:authored-mock-extended` against transient Neon/TLS connection resets with bounded retries and pooled `DATABASE_URL` preference.
- Updated the V14.5 Gemini/email audit version gate so patch releases in the V14.5 line do not fail solely because the package version advanced beyond 14.5.0.
- No authored mock academic content was changed by this patch.
