# AVORA V9.0.2 — Secure Login Fallback

This pre-launch patch fixes a security/reliability issue where the browser could fall back to a native GET form submission before React hydration, placing email/password values in the URL.

Changes:
- Login/register forms now declare `method="post"` and an API action, so native fallback can never put passwords in the query string.
- `/api/auth/login` now accepts both JSON (normal AVORA client flow) and form POST data (progressive-enhancement fallback).
- Successful native form login redirects to `/signin-intro`, preserving the AVORA sign-in animation.
- Failed native form login redirects back with a non-sensitive error code only; credentials are never echoed into the URL.
- Existing JavaScript login flow and sign-in animation remain intact.

No database migration or seed is required.
