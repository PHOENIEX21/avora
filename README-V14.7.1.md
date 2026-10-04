# AVORA V14.7.1 — Student-Safe Teaching + Family Flow Audit

This patch removes a remaining learner-facing leakage path found after V14.7.0 review.

- All markdown/reference-table rows are excluded from spoken/live teaching moments.
- Internal Core Formula & Method Reference units are excluded from learner Tutor plans.
- Source-backed `explain`, `example`, and `check` fields are now passed through the learner sanitizer.
- Source-backed learner `why` and outcomes are learner-facing rather than author instructions.
- V14.7 audit strengthened so the previous table-row behavior cannot pass.
- Added a dedicated student-safe + parent/child family-flow source audit.
- Fixed the V14.6 audit version gate so later 14.x releases retain that audit.

No database migration is introduced by this patch. Runtime parent/child flows still require real database/live-device validation before production-ready claims.
