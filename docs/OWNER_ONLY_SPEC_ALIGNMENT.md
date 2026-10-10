# Owner-only specification alignment — controlled implementation

Authority: `avora-updated-instructions.md` (470 lines) and `avora-design-reference.zip` supplied October 10, 2026. This specification supersedes teacher/school workflows.

## Decisions implemented in foundation
- Exactly one owner-admin controls curriculum review, publication, class week, exam scheduling, question approval, community moderation and admin audit.
- Student accounts are independent; school name is informational only, never an authorization boundary.
- Parents use a PIN-protected area inside the student's app; no new parent account creation.
- Shared devices use separate student PINs, never a shared student data session.
- Content remains behind per-class flags and publication + week-release gates.
- Five Dawn Ring tasks are independent; no sample design content becomes live content.

## Legacy compatibility
The validation database contains one ADMIN, six STUDENT and one legacy PARENT role. Do not delete or reassign these users. The old teacher permission table is left intact but must not be consulted by new routes. Existing parent-account routes are legacy and must be separately retired behind flags after owner approval.

## Phase 1c foundations
Migration 053 adds consent records, separate hashed PIN storage, question reports and owner audit log. It does **not** activate independent registration or parent access. Never store plaintext PINs; future handlers must use a slow password hashing algorithm, rate limits, five failed attempts followed by 15-minute lock, and short-lived parent-area authorization. Photo uploads must remain blocked until explicit photo consent.

## Unresolved launch blockers
1. Owner-approved parent consent text/version, reviewed by Nigerian legal counsel.
2. Student registration verification method and provider (email or phone code).
3. Explicit identity binding for the sole owner-admin (role alone is insufficient if more admins are ever created).
4. Existing login and parent routes need a complete privacy regression before switching to the new model.
5. Historical migration ledger reconciliation is still required before any primary DB change.
6. Confirm pilot class and subjects before importing curriculum; no objectives may be fabricated.

## Validation
Migration 053 applied transactionally to the isolated Neon validation branch. Primary Neon and production deployment remain unchanged. No parent PIN or consent was invented or seeded. All class flags remain disabled.
