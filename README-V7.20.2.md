# AVORA V7.20.2 — Auth + Tutor Reliability Hotfix

This hotfix preserves V7.20.1 and corrects runtime issues found during phone testing.

- Service worker no longer intercepts API, auth, or navigation requests.
- Development mode unregisters old AVORA service workers and clears stale AVORA caches.
- Old broad `avora-shell-v1` caches are removed when the new production worker activates.
- Tutor API responses are parsed defensively; empty/non-JSON responses now produce a controlled retry message rather than a JSON parser crash.
- Tutor API responses explicitly use no-store/no-cache headers.
- Logout uses a full navigation so the server root layout rereads the session and cannot preserve stale signed-in/out navigation.
- Root layout is dynamic.
- No database migration or seed is required.
