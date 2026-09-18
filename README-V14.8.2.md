# AVORA V14.8.2 — Windows Path Reliability Fix

This release fixes Windows file-URL path handling in the NCEE source builder, NCEE source compatibility audit, and answer-marking test.

## Root cause
Using `new URL(...).pathname` on Windows produced paths such as `C:\\C:\\Users\\...`. Node filesystem APIs then failed with `ENOENT`.

## Fix
All affected scripts now convert file URLs with Node's `fileURLToPath()` before passing paths to `path` or filesystem APIs. This is the supported cross-platform approach.

No curriculum, teaching, marking logic, database schema, authentication, family-linking logic, or learner UI behavior was changed.

## Validation
Run:

```powershell
npm install
npm run build:ncee-source
npm run audit:v14.8.1-ncee-complete
npm run audit:v14.8-ncee-source
npm run test:answer-marking
npm run launch:check
npm run build
```
