# AVORA V14.2.0 — Real-user Validation + Privacy-safe Telemetry

V14.2 extends V14.1 without replacing the curriculum, mocks, Tutor, family/trial or offline architecture.

## Added
- privacy-minimized `product_validation_events` store
- authenticated `/api/telemetry` with event-name and metadata-key allowlists
- bounded offline telemetry queue that flushes on reconnect
- global signed-in route/journey telemetry
- Tutor start, restore, cached lesson, offline/reconnect, exact re-teach and completion signals
- Exam/Mock → Tutor handoff signals
- PWA install/update signals
- Admin `/admin/validation` operational dashboard
- real-device validation protocol

## Privacy boundary
This feature intentionally does not collect raw answers, Tutor chat text, narration, compositions, names, emails, IP addresses, browser user-agent strings or device fingerprints. It is for product-flow validation, not surveillance.

## Release gate
```powershell
npm ci
npm run db:migrate
npm run audit:v14.2-validation-telemetry
npm run launch:check
npm run typecheck
npm run lint
npm run build
```

Automated audits prove source invariants only. Representative learner/parent/teacher device testing is still required before claiming real-world production validation.
