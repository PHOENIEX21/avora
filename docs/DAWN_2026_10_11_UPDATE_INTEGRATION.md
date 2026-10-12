# AVORA update integration register — 11 October 2026

## Source authority
Owner-provided `files(7).zip` contains `avora-restructure-agent-instructions.md` (584 lines) and `avora-design-reference.zip` (22 HTML screens, README and canvas metadata). Treat the written specification as functional authority and the matching mockups as visual authority. Demo names, topics, messages and scores are not curriculum data.

## Additions compared with the previous working roadmap
- Phase 1d: approximately 20-question, 15-minute, no-visible-score baseline, postponable for up to 3 days; daily study time and weekly parent summary.
- Phase 3b: three exam timing modes, class and student overrides, admin-led lobby/ready check, announcements, server-clock start, notification reminders and follow-up revisit.
- Phase 3c: Monday class-week switching, calendar breaks, idempotent readiness gates, carried-over objectives, week history.
- Phase 6b: personal mistakes notebook and immediate follow-up.
- Phase 8: WhatsApp-like class subject group with filtered live text and moderated attachments.
- Phase 8b: admin-student threads and broadcast; student-to-student DMs default OFF with master, class, student and parent controls.
- Phase 9: consent-gated photos, audience permissions and admin student card.
- Phase 10b: expanded owner-only console including messaging settings, student cards and live session control.
- Reference screens added/explicit: Chat, DM, GettingStarted, GroupHome, LiveControl, Lobby, MessagingSettings, Mistakes, StudentCard.

## Integration rules
1. Preserve current accounts, historical learning records, uploads and legacy experience; class feature flags remain OFF until validated.
2. One owner-admin; no teacher, school-admin or parent login accounts. Parent Area uses a separately verified guardian PIN.
3. Keep guardian identity proof separate from contact OTP verification. No student session can certify its own guardian identity.
4. Do not import mockup sample content as real NERDC lessons, questions or answer keys.
5. Apply schema changes to isolated validation Neon first; never run the migration suite blindly on primary.
6. Each phase requires automated permission and regression checks plus screenshot-level UI comparison.
7. No production rollout or enabling DMs/photos without explicit owner approval.

## Conflicts needing owner decisions
- Phase 8 says 'No private messages' while Phase 8b explicitly permits gated student DMs; Section 5 says 'the group has no private messaging'. Safe interpretation pending approval: **no student DMs at launch**, but build optional gated architecture without activating it.
- Guardian contact is described as optional for reminders, but verified guardian identity is a separate mandatory enrollment safeguard. Contact verification alone cannot establish guardianship.
- The prior plan said all student group text was held for admin approval initially; the update asks for immediately visible automatically filtered text. Keep live group chat OFF until safety controls and moderation capacity are approved.
- The original app diagnostic was around 40 questions; the new registration baseline specifies approximately 20 questions, 15 minutes, and no score displayed. Keep legacy diagnostics intact; add the new baseline as a distinct assessment.

## Open decisions from the updated source
Pronunciation standard; whether midweek revisit is compulsory; compulsory vs optional subjects; approved oral speaker; lawyer-approved data/photo/message consent wording; notification provider; pilot launch scope; any future student moderators.

## Revised delivery order
A. Audit existing branch and validation schema against all 584 lines; update traceability matrix.
B. Guardian identity/consent/PIN and secure existing-student transition; baseline and study settings.
C. Official curriculum/objectives and week-switching readiness.
D. Screenshot-accurate Dawn, This Week, English Daily, CBT, mistakes and Parent Area.
E. Live exam scheduling, lobby, scoring, revisit and notification delivery.
F. Owner admin review queues, controls, safety and reporting.
G. Moderated group, admin DMs, optional disabled student DMs, photos.
H. Pilot QA: full week, permissions, offline/low-data, rollback and controlled release.

## Definition of done
The owner-provided Section 5 criteria are mandatory; additionally, do not declare completion until new Phase 1d, 3b, 3c, 6b and 8b requirements pass integration and safety tests. Track each acceptance criterion separately; no 'done' claim based solely on a committed file or a green build.
