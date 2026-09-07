# AVORA V7.19 — Auth Navigation Reliability

This patch fixes a stale root-layout authentication state after sign-in.

## What changed
- Successful login now performs a full navigation to `/signin-intro` after the session cookie is created.
- This forces the server-rendered root layout to read the new httpOnly session cookie immediately, so the public **Sign in / Start learning** header cannot remain visible after authentication.
- The existing AVORA sign-in ident remains intact.
- `next.config.ts` preserves both currently used development LAN origins: `10.2.0.194` and `192.168.14.251`.

## Database
No migration or seed is required for V7.19.
