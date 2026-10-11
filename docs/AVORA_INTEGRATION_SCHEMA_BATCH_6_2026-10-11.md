# AVORA weekly schema integration — batch 6 (2026-10-11)

Target: Neon project `lingering-bonus-74534876`, isolated branch `br-blue-scene-ayydvo7l`. Production untouched.

## Successfully executed
Six individual additive `CREATE TABLE IF NOT EXISTS` statements, following the dependencies in `database/migrations/051_weekly_phase1_foundations.sql`:
- `weekly_content_batches` (11 columns): draft/review/publish status for content batches.
- `weekly_vocabulary_words` (11 columns): word, meaning, part of speech, examples and review status.
- `weekly_english_rules` (12 columns): rule teaching and common mistakes.
- `weekly_audio_assets` (7 columns): duration, storage path and reviewer status.
- `weekly_oral_lessons` (8 columns): oral topic, examples and review status.
- `weekly_english_daily_plan` (12 columns): class/term/week/day, five word IDs, rule and oral links, draft/review state.

Verified all six tables and column counts with `information_schema.columns`.

## Important
- The five-word constraint only checks UUID array length; application logic must also verify that every referenced word is approved, matches class, and is accessible for that date.
- No content records were authored or published in this batch.
- The migration file as a whole has NOT been applied and must not be marked complete in `schema_migrations`.
- Continue remaining schema and compatibility work, then API tests, curriculum and learner workflow. Dawn interface reconstruction remains at its planned later phase.
