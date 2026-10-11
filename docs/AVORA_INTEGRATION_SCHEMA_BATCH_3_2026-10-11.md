# AVORA weekly schema integration — batch 3 (2026-10-11)

**Neon project:** `lingering-bonus-74534876`  
**Test branch only:** `br-blue-scene-ayydvo7l`  
**Production untouched.**

## Applied SQL and verified
- Added `weekly_objective_extended_status_check` allowing DRAFT, IN_REVIEW, REVIEWED, APPROVED, PUBLISHED, RETIRED. **The original narrower constraint remains in force**, so PUBLISHED/IN_REVIEW are still blocked. No existing constraint was removed.
- Created `weekly_items` (14 columns), preserving source provenance, reviewer, answer and status checks.
- Created `weekly_item_stats` (4 columns), including served/correct integrity checks.
- Created `weekly_student_item_schedule` (7 columns), with per-student due dates and revision streak.
- Created `weekly_revisit_due_idx` for student/due-date lookups.
- Created `weekly_upload_links` (6 columns), linking uploads to curriculum objectives and extraction status.

Verified all four tables by querying `information_schema.columns`. No application runtime tests or publication checks were performed.

## Remaining
- Approval-status constraint reconciliation needs an explicitly reviewed migration; don't mark publishing complete.
- Other tables in migrations 048–058 remain to be created; keep migration ledger truthful (no full migration registered).
- No Vercel deployment or GitHub main merge.
