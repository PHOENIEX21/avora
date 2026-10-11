# Guardian verification transaction boundary

Implementation: `lib/guardianChallengeStore.ts`.

A contact verification code is **not** proof that the person is the student's legal guardian. A verified delivery channel, an independently approved guardian identity workflow, and consent records must be established separately before onboarding is enabled.

Confirmation requires a student identifier and challenge identifier. The database transaction locks the matching row, checks expiry, prior consumption and failed-attempt count, compares the keyed digest, and either consumes the challenge or increments failed attempts. No raw code is persisted.

Before exposing an API, implement: independently authenticated guardian session, challenge issuance with delivery success handling, per-student and per-contact issuance cooldowns, request throttling, anti-enumeration responses, and a contact-verification audit trail. Do not accept student-session possession as guardian identity proof.

The migration is applied only to the isolated Neon validation branch. Do not deploy to production or enable the Dawn guardian workflow until legal wording, delivery provider, recovery, security review and integration tests are approved.
