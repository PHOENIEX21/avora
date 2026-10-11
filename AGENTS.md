# AVORA — AGENT HANDOFF AND CONTINUATION CONTRACT

**Last updated:** 2026-10-11  
**Canonical development branch:** `avora-academic-core-v1`  
**Status:** ACTIVE — NOT COMPLETE; NOT APPROVED FOR PRODUCTION MERGE

## 1. Non-negotiable goal
Implement the entire user-provided AVORA restructure ZIP, preserving the full academic and functional requirements and matching its 23-screen design reference. The original ZIP (uploaded in the user's ChatGPT conversation as `files(7)(1).zip`) contains `avora-restructure-agent-instructions.md` and `avora-design-reference.zip`. **This GitHub handoff is not a replacement for that original specification.** Before implementing a feature, obtain/read the full original instruction document and relevant reference screen. If the ZIP is not available to the next agent, request it; do not guess missing requirements or claim full specification coverage.

Target roles: ONE admin owner, registered students, parent area secured through verified guardian/PIN flow. No teachers, schools, or other staff in the target product. Extend the existing application rather than rebuild. Never publish design sample data as real learner content.

## 2. Authoritative project locations
- Repository: `PHOENIEX21/avora` (GitHub).
- Git branch `main`: production baseline. Do not merge/deploy without user approval.
- Git branch `avora-academic-core-v1`: canonical restructuring development branch; 334 commits ahead of main at initial 2026-10-11 audit.
- Neon project: `lingering-bonus-74534876` (one Neon project with isolated database branches, NOT two permanent production databases).
- Neon production: `br-blue-lab-ayq111cy` — NEVER modify as part of development testing.
- Neon academic-core test: `br-calm-surf-ayy1008y`.
- Neon weekly Phase 1 validation: `br-patient-rice-ayghqro8`.
- Neon **new isolated integration test**: `br-blue-scene-ayydvo7l`, named `avora-weekly-academic-integration-20261011`, forked from academic-core test.
- Intended final deployment: ONE production AVORA app backed by ONE production Neon database, after verified additive migration and explicit approval.

## 3. Implement the ZIP roadmap in sequence
Phase 0 audit; Phase 1 data model; 1c registration and parent; 1d baseline and study time; 2 verified curriculum; 2b hidden all-class objectives until release; 3 weekly learning; 3b live exams, notifications, midweek revisit; 3c week switching; 4 daily tasks; 4g English Daily content; 5 uploads; 6 scheduler; 6b mistakes/revision; 7 question bank; 8 monitored group chat; 8b DMs; 9 photos; 10 visual redesign using 23 screens; 10b admin; 11 analytics; 12 comprehensive QA.

Core learner experience: Monday objectives; daily English Daily (five words, grammar, oral, sentence construction with CBT); uploaded-work revision; encouragement; weekend subject exams; objective-based results and spaced remediation. Weekly exams are serious admin-reviewed assessments; never inject irrelevant or unapproved AI questions.

## 4. Work actually performed in the current continuation
1. Inspected GitHub branches and Neon tables (read-only).
2. Identified `avora-academic-core-v1` as the advanced implementation branch, with admin weekly curriculum screens, weekly exam flows, academic daily routes and automated verification.
3. Committed `docs/AVORA_PHASE0_INTEGRATION_AUDIT_2026-10-11.md` at `07b0a2ea23cdcd57ca2858a97cce3cfc3966cb81`.
4. Confirmed GitHub Actions run `38180382314` succeeded: npm ci, TypeScript, lint, answer marking, Dawn guardian/PIN security, starting-check policy, curriculum audit and production build.
5. Confirmed weekly schema mismatch: academic-core test branch lacks `weekly_curriculum_objectives`, `weekly_class_flags`, `weekly_class_week_state`, `weekly_student_pins`, despite code referencing these tables.
6. Committed `docs/AVORA_WEEKLY_ACADEMIC_SCHEMA_COMPATIBILITY.md` at `8ae6b43349af698813b76b7dc974f25afed8b842`.
7. Created Neon isolated integration test branch `br-blue-scene-ayydvo7l` from academic-core test. Verified it contains the five `weekly_exam_*` academic-core tables but not the broader weekly-learning schema.
8. Checked `schema_migrations` uses columns `filename`, `applied_at`, not `name`. Existing ledger reaches `032_ai_gateway_email_launch.sql`. Weekly and academic-core additions are not captured by that legacy ledger.
9. **No production migration, no GitHub main merge, no live deployment, no destructive SQL.**
10. **Do not mistake passing CI or written audits for completion of the full ZIP.**

## 5. Known overlap requiring deliberate design
- `academic_daily_objectives` vs `weekly_curriculum_objectives`: different identities and provenance.
- `daily_assessments` vs `weekly_items` and `weekly_english_daily_plan`: different publication units.
- `learner_objective_mastery` vs `weekly_student_item_schedule`: objective aggregate vs item-level spaced practice.
- `weekly_exam_blueprints` and `weekly_exam_versions` vs `weekly_exams` and `weekly_exam_items`: competing exam lifecycle designs.
- Legacy parent links vs weekly guardian PIN/consent: preserve verified identity, consent, security.
- Legacy study room and weekly teacher permissions vs one-admin target: audit access control before release.

## 6. EXACT next tasks for next agent
A. Read original ZIP instruction and reference mockups in full. Compare each requirement to actual source code and track evidence, not impressions.
B. Inventory SQL migration files in GitHub and migration history on both Neon development branches; find the exact additive DDL that produced `weekly_*` tables.
C. Build a schema compatibility plan with explicit column/foreign-key mappings and no destructive operations.
D. Apply/test compatible additive migrations ONLY on isolated integration branch `br-blue-scene-ayydvo7l`; never copy production data indiscriminately.
E. Run runtime route checks against integration branch: admin objectives import/review, class flags, class/week state, learner baseline, guardian/PIN, daily assessment and weekly exams.
F. Add regression tests for class isolation, no unauthorized publish, marking/scoring, scheduled release, parent consent and duplicate submissions.
G. Work through every ZIP phase; compare actual mobile UI against each of 23 design references. Commit small verified batches and update this file and tracker after EVERY batch.
H. Do not merge to main or deploy to production without explicit user approval.

## 7. Owner decisions to obtain ONLY when needed
Pronunciation standard, mandatory midweek revisit policy, compulsory vs optional subjects, oral audio provider, legally reviewed child/photo consent wording, SMS/email provider, launch class/subjects, moderator policy. Do not stall unrelated engineering work waiting for these.

## 8. Reporting protocol
After each batch, record: date, Git branch/commit, files changed, migrations and Neon branch, tests actually run and results, screenshots/preview evidence if applicable, known risks, next concrete action, and whether user input is required. Keep `docs/AVORA_IMPLEMENTATION_TRACKER.md` current. A task is DONE only with implementation and test evidence. Distinguish PLANNED / IN PROGRESS / BLOCKED / VERIFIED.

## 9. Safety
Never expose database credentials in documentation. No destructive migration, no accidental Neon production mutation, no automatic publication of AI content, no unapproved deployment. Preserve existing students' progress and parent relationships. Remove temporary branches only after the user confirms they're no longer needed.
