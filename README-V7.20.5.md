# AVORA V7.20.5 — Tutor API Repair

Hotfix built from the uploaded AVORA project.

## Fixed
- Restored the missing `GET /api/tutor` handler.
- Removed the accidental duplicate answer-check POST implementation from the main Tutor endpoint.
- Tutor picker now loads reviewed topics for the learner's selected subject/exam.
- Selected topics return up to four reviewed questions in the exact shape expected by `TutorClient`.
- Added no-store response headers so Tutor data is not served stale.
- Existing `/api/tutor/check` and `/api/tutor/progress` endpoints remain unchanged.

No migration or seed is required.
