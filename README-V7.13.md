# AVORA V7.13 — Reliable Sign-in Ident Fix

This patch fixes the AVORA brand ident not appearing after a successful sign-in.

## What changed
- Successful login now navigates to a dedicated `/signin-intro` route.
- The AVORA ~5 second visual ident is therefore no longer dependent on the login form staying mounted.
- The intro automatically fades into `/welcome` and includes Skip.
- The sonic mark is attempted during the original sign-in gesture and again on the intro route when browser audio policy allows it.
- Reduced-motion users receive a short version.
- Added `data-scroll-behavior="smooth"` to the root `<html>` element to resolve the Next.js route-transition warning.

## Database
No migration is required.

## Run
Preserve `.env.local`, replace the project files, then run:

npm install
npm run dev

Sign out first, then perform a fresh login to test the ident.
