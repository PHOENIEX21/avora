# AVORA Phase 0 — verified integration audit (2026-10-11)

## Authority
Source specification: user-supplied AVORA restructure instructions and Dawn design package. Existing application is to be extended, not rebuilt. One administrator, students, and a PIN-protected parent area; no teacher or school staff roles in the target product.

## Verified stack
Next.js 16.3.3, React 19, TypeScript, postgres.js, Zod, bcryptjs, jose; GitHub repository PHOENIEX21/avora; Neon project lingering-bonus-74534876.

## Git branches
- main: existing production baseline.
- avora-academic-core-v1: 334 commits ahead of main, zero behind at audit; contains academic-day admin screens, weekly-exam generation/review, class flags, Dawn security tests and verification workflow.
- validation-preview: diverged from main, one ahead and 31 behind; NOT the canonical restructuring branch.

## Neon branches (read-only schema inspection)
- production (br-blue-lab-ayq111cy): legacy users, topics, questions, assignments, learner notes, parent links, study rooms, assessments, etc.
- avora-academic-core-v1-test (br-calm-surf-ayy1008y): academic_daily_objectives, daily_assessments, learner_objective_mastery, weekly_exam_blueprints/versions, academic_ai_jobs and related tables.
- avora-weekly-phase1-validation (br-patient-rice-ayghqro8): weekly_class_flags, weekly_curriculum_objectives, weekly_class_week_state, weekly_exam_*, weekly_student_pins, weekly_parent_pins, weekly_english_daily_plan, weekly_notifications, etc.

## Reusable implementation
- Admin weekly curriculum import/review page exists at app/admin/weekly/page.tsx.
- Weekly class feature flag API exists at app/api/admin/weekly/flags/route.ts, requires ADMIN session, and refuses activation without published objectives covering all five weekdays and a matching released class week.
- GitHub workflow .github/workflows/academic-core-verification.yml runs typecheck, lint, answer marking, Dawn security, weekly baseline, curriculum audits and build.
- package.json contains test:dawn-security and test:weekly-baseline scripts.

## Critical integration risks
1. Academic-core and weekly validation schemas differ. DO NOT assume one branch contains the other branch's migrations or merge their tables without mapping overlapping entities.
2. The latest academic-core code is not merged into main. Verify workflow results and preview runtime before any merge.
3. Existing legacy study-room and parent functionality may conflict with the one-admin target-role contract. Audit permissions and routes before exposing features.
4. Do not publish mockup sample curriculum or AI-generated unapproved questions.
5. Keep weekly pilot class flags disabled until real objectives, content and tests are verified.

## Next execution gates
1. Retrieve failing workflow/job details and fix actual reproducible failures.
2. Map migrations and runtime DB connection to the intended nonproduction branch.
3. Write explicit schema compatibility map and additive migration plan; test on a disposable branch.
4. Audit guardian PIN, consent, auth, class isolation and admin permissions.
5. Test scheduler, scoring, objective provenance and review/publish transitions.
6. Compare Dawn screen implementation with supplied 23-screen mockup; complete missing views.
7. Run CI and end-to-end pilot; seek approval before production merge or destructive operation.

## Decisions reserved for owner
Pronunciation standard; midweek revisit compulsory rule; optional subjects; audio production method; lawyer-reviewed consent wording; notification provider; launch class/subjects; optional future moderators. Do not silently choose.

No production changes were made in this audit.
