# AVORA V10.3.0 — Human Accountability & Live Assessment Foundation

Adds a professional academic-operations layer around the existing V10.2 deep-teaching system.

## Admin
- `/admin` academic operations overview
- `/admin/students` searchable student evidence table
- `/admin/students/[id]` learner profile with attempts, mastery/weakness evidence, Tutor coverage and supervised assessment history
- `/admin/live-assessments` live host centre
- `/admin/live-assessments/new` session creator
- `/admin/live-assessments/[id]` host room with attendance, parent confirmation, progress, scores and lifecycle controls

## Live assessment
- Class + subject scheduling
- Smart covered-topic mode or manual topic selection
- Explicit learner selection
- Parent/guardian presence confirmation
- Host-controlled SCHEDULED → LOBBY → LIVE → PAUSED/RESUMED → ENDED lifecycle
- Questions stay locked until LIVE
- Per-answer persistence and final submission
- Historical score retained per learner/session
- Responsive learner session UI at `/live-assessment`

## Database
Migration `015_live_assessments_admin_progress.sql` adds live assessments, participants, selected questions and answers without modifying the existing assessment bank.

## Important next hardening
This is the functional foundation. Before public launch, add stronger open-response grading/rubrics, real-time push transport (instead of refresh), parent accounts/PIN ownership, session notifications, audit logs, host reassignment, accommodations and support messaging.
