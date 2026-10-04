# AVORA V14.5.2 — Compiler Fix Pass

This release preserves the V14.5 Gemini + Brevo launch hardening and fixes the compiler/build defects surfaced by the local V14.5.1 validation.

Fixes:
- ExamClient `use client` directive restored to the first statement.
- Email delivery result now has a stable typed shape for dev verification/reset URLs.
- AI cost-guard claims now use a discriminated union so successful claims always expose an event ID.
- Parent-created learner transaction result explicitly preserves the learner ID type at the call site.
- Practice question query results are converted to plain arrays before filtering.
- Curriculum coverage type explicitly permits `UNASSESSED` reconciliation evidence.
- Source curriculum structured-step generation now uses the unit source steps (`x.steps`).

Required local acceptance gate:
```powershell
npm install
npm run typecheck
npm run lint
npm run build
```

Do not deploy unless those commands complete without errors.
