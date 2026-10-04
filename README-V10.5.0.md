# AVORA V10.5.0 — Human Assistance

Adds a first-class human support layer inside AVORA.

## Learner experience
- New `/support` area for signed-in learners.
- Start support conversations for learning, account, live-assessment, parent/school or general help.
- Support request snapshots class, recent Tutor topic/unit and active remediation context.
- Direct in-app chat with 5-second near-live refresh.
- Conversation history remains attached to the learner account.
- Clear case states: open, waiting on support, waiting on student, resolved, closed.

## Admin experience
- New `/admin/support` operational inbox.
- Search/filter queue, urgency, ownership and who replied last.
- Dedicated conversation workspace with learner class, current topic, weak mastery evidence and recent supervised assessment evidence.
- Admin can assign a case to themselves, change priority and move the case through support states.
- Case-event audit trail records assignment, status and priority changes.

## Database
Migration `017_human_support.sql` creates:
- `support_threads`
- `support_messages`
- `support_thread_events`

## Verification
Run `npm run audit:support`, then full `npm run launch:check` and `npm run build` locally after migration.
