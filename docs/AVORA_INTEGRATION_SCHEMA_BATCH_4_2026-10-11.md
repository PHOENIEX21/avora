# AVORA weekly examination schema — batch 4 (2026-10-11)

**Environment:** isolated Neon integration branch `br-blue-scene-ayydvo7l`, project `lingering-bonus-74534876`. No production deployment/migration.

## Applied and verified
Using additive, individually executed SQL from the structure of `database/migrations/048_weekly_restructure_phase1.sql`:
- `weekly_exams` — 9 columns; subject/week blueprint and review status.
- `weekly_exam_items` — 2 columns; join between exam and approved-question bank (approval still needs server enforcement).
- `weekly_exam_schedules` — 11 columns; scoped release window, duration, late-entry rule and close-after-start check.
- `weekly_exam_attempts` — 8 columns; student exam/revisit attempts and uniqueness constraint.
- `weekly_attempt_answers` — 6 columns; saved per-question responses with objective link.

A subsequent `information_schema.columns` query verified all five tables and column counts.

## Interface reconstruction visibility
The GitHub development branch has `docs/DAWN_UI_REFERENCE_MAP.md`, `docs/DAWN_COMPLETION_ROADMAP.md`, `lib/dawnDesignTokens.ts` and the partial `app/dawn/page.tsx` implementation. The source design archive contains 23 named screens. The Dawn page currently has 'preparing' states and is not a complete screenshot-matched implementation. The specification calls for the full learner/parent/admin interface reconstruction, using the supplied mockups as visual references and real authenticated data.

## Still pending
- Remaining 048–058 schema, publication status reconciliation, data-backed exam API integration and tests.
- Screen-by-screen responsive implementation and visual comparison against supplied design references.
- Preserve one-admin/parent-inside-student constraints; no fake scores or curricula.
- Do not claim a migration file fully applied or register it in `schema_migrations` when only selected statements ran.
