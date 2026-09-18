# AVORA V9.0.7 — Launch-check regression fix

This patch fixes a stale V9.0.4 quality assertion that caused `npm run launch:check` to fail even though the Tutor checkpoint question was no longer duplicated in the UI.

Changes:
- Keeps the learner-facing checkpoint question rendered only once in the dedicated Your Turn section.
- Restores the intended board guidance line: “The question appears once below so you can focus on it clearly.”
- Makes the V9.0.4 regression test check the actual duplicate-question patterns instead of relying on one exact sentence.
- No database migration.
- No seed changes.
- V9.0.6 slow-network loader behavior remains intact.
