# AVORA V13.5.0 — Admin Operations Repair

This release repairs and verifies the owner/admin flow on top of V13.4.

## Fixed
- ADMIN mobile navigation no longer falls through to learner Home/Learn/Tutor/Exam links.
- ADMIN desktop navigation now has direct Dashboard, Academic, Students, Live, Support and Families routes.
- Non-admin access to admin pages redirects parents to Parent Dashboard and learners to Learner Home.
- Academic Preview was still reading obsolete pre-V13 deep-lesson fields. It now renders the live V13 source-backed TutorUnit structure used by the learner Tutor.
- Added responsive Academic Preview controls, topic grid, source-unit inspector and admin row shrink guards.

## Admin surface verified
- Dashboard KPIs
- Academic Preview: Primary 5/6 NCEE + JSS1/2/3 master curriculum
- Students & Progress
- Live Assessment scheduling/hosting/results
- Human Support
- Family Access / seats
- Admin family seat release protection
- Desktop + mobile admin navigation
- Server-side page and API authorization

## Audit
`npm run audit:v13.5-admin-operations` → 20/20 PASS.

All prior V13.4, V13.3, V13.2, V13.1, master curriculum, source-truth, security and visual audits remain passing.
