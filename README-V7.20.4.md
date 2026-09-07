# AVORA V7.20.4 — Home Route Fix

This build separates the authenticated learning dashboard from the legacy `/welcome` route.

## Changes
- Added `/home` as the signed-in student dashboard.
- `/welcome` now redirects to `/home` for backward compatibility.
- Updated signed-in header/logo Home links to `/home`.
- Updated mobile Home navigation to `/home`.
- Updated sign-in intro completion to `/home`.
- Updated login/register/onboarding/diagnostic/email-verification redirects to `/home`.
- Updated Tutor breadcrumb Home link to `/home`.
- Preserves V7.20.3 Practice, Exam, Tutor, auth and performance fixes.

No migration or seed required.
