# AVORA V10.6.0 — Parent Trust & Evidence Layer

This checkpoint adds authenticated parent/guardian accounts and a professional evidence dashboard around the existing learner, Tutor and Live Assessment systems.

## Built
- Dedicated parent registration using AVORA email verification.
- Role-aware parent sign-in and navigation.
- One-time, 24-hour child-link codes generated from the learner account.
- Parent ↔ learner links that preserve account separation and restrict parent views to linked children.
- Parent dashboard with child summaries, upcoming live assessments and recent supervised evidence.
- Detailed child evidence view: mastery, weak skills, Tutor coverage, supervised results and eight-week independent-answer trend.
- Parent live-assessment page with authenticated presence confirmation.
- Linked learners now require their authenticated linked parent/guardian to confirm supervision before Live Assessment questions unlock. Learners without a linked parent retain the existing named-guardian fallback.
- Responsive, separated UI for parent overview, child evidence, assessment supervision and linking.

## Database
Migration `018_parent_accounts_dashboard.sql` adds `parent_profiles`, `parent_student_links`, `parent_link_codes`, and authenticated supervision fields on `live_assessment_participants`.

## Verification
Run `npm run audit:parent` after extracting. Migration 018 must be applied before using parent features.
