# Existing-student automatic transition contract

**Owner decision:** All already-registered students must receive the restructured AVORA experience automatically once their class is safely launched. They must not need to register again, lose their login, or lose previous learning records.

## Migration and rollout
1. Keep the existing `users.id` and `student_profiles.user_id` unchanged; use those IDs for all new weekly tables. No destructive copy, new duplicate accounts, or credential reset.
2. Resolve the student's current class from `student_profiles` on the server. Never trust a class supplied in a browser URL or form. Preserve original profile fields, uploads, attempts, scores and old lessons.
3. Launch by **class-level feature flag** after verified curriculum, approved question bank, assembled exams and regression tests. On next login/page load, every eligible existing student in that class automatically sees the new experience. New students in the same class use exactly the same routing. No per-student opt-in or manual transfer.
4. If a class flag is disabled or readiness fails, route to the legacy experience without deleting data. Do not silently enable a flag because the database schema exists.
5. Parent consent and parent/student PIN onboarding are **not** automatically assumed for existing accounts. Show an age-appropriate parent handoff to obtain fresh consent and set separate PINs before enabling child-data features that require it. Keep accounts recoverable and do not strand students; establish verified guardian recovery flow before enforcing new PINs.
6. Legacy PARENT role records remain unchanged until an audited account transition is approved. Never give parent accounts the owner-admin role.
7. All student-owned rows remain scoped to authenticated `user_id`. Test two existing students sharing one device: switching profile must invalidate the prior student's session and any cached private state.
8. Track conversion status idempotently by user ID, not email or display name; retries must not create duplicates. A progress migration should be additive and use explicit consent timestamps, never fabricated consent.
9. Preserve completed lessons, assessment history and uploaded assignments in their original tables; if showing them in the new UI, use a read-only historical adapter until a tested migration exists.
10. Pilot with a validation database and synthetic accounts before enabling any real class; verify old and new accounts, logout, class isolation, rollback and guardian onboarding.

## Outstanding release blockers
- Phase 2 content import and question readiness not completed.
- Phase 1c registration/consent/PIN/session isolation not completed.
- Class flag route still checks five weekdays rather than subject-topic readiness and exam assembly.
- Production migration ledger requires reconciliation.
- Parent consent wording and verification require owner/legal approval.

**No production class flag may be enabled by this document.**
