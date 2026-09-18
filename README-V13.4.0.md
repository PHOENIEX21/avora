# AVORA V13.4.0 — Responsive Release Hardening

This release addresses the deployed mobile horizontal-space/right-side overflow risk across the shared shell and major learner/parent surfaces.

## Changed
- Removed forced 300px minimum widths from mobile teaching SVG/bar visuals.
- Added viewport containment to html/body and shared shell.
- Added `min-width:0` shrink guards to nested grid/flex content.
- Added responsive containment for Home, Learn, Tutor, Exam, Practice, Progress, Trial strip and Family pages.
- Added dedicated 380px handling for narrow phones.
- Preserved controlled horizontal scrolling only inside the teaching visual stage when a diagram genuinely needs it.
- Added `audit:v13.4-responsive-release`.

## Verified by static release audits
- V13.4 responsive release: 16/16
- V13.3 family/class/trial: 22/22
- V13.2 family/trial/exam bank: 24/24
- V13.1 teaching/assessment: 15/15
- V13 master curriculum: 20/20
- V12.8 source truth: 24/24
- V12.7 security: 14/14
- V12.5 visual teaching: 39/39

## Environment boundary
A dependency-backed Next.js build/browser viewport test was not completed in the assistant environment because `npm ci` could not complete. Run the commands below locally before production promotion:

npm ci
npm run audit:v13.4-responsive-release
npm run launch:check
npm run typecheck
npm run lint
npm run build
