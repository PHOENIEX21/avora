# AVORA V7.20.8.1 — Production Build TypeScript Hotfix

Fixes postgres.js TypeScript bulk-insert inference errors discovered during `next build` in:

- `app/api/exam/finish/route.ts`
- `app/api/exam/start/route.ts`

The old `${sql(rows, ...)}` dynamic bulk helper was replaced with explicit parameterized inserts inside a transaction. Exam attempt writes remain atomic, and exposure tracking remains non-blocking.

No database migration or seed is required for this hotfix.
