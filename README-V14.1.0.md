# AVORA V14.1.0 — Installable PWA + Offline Synchronization

V14.1 extends V14.0 without replacing AVORA's curriculum, assessment, family/trial, admin, mock, Tutor or mastery systems.

## What changed

- AVORA is installable through the existing web-app manifest when the browser supports installation.
- Service-worker updates are versioned and wait for an explicit learner action rather than force-reloading an active lesson.
- The service worker caches only static shell assets and an offline fallback. It deliberately does **not** cache authenticated HTML or `/api/*` responses.
- Successfully loaded Tutor curriculum payloads are stored in IndexedDB for deliberate lesson fallback when the Tutor network request cannot be completed.
- Tutor progress and non-grading interaction evidence can queue locally and synchronize after connectivity returns.
- Grading, AI diagnosis, answer reveal, live Tutor chat and other operations that require a server response remain online-only. AVORA never invents a result while offline.
- Offline queue synchronization stops on 401/403 so queued work cannot silently attach to a different or expired account session.
- An install/update/offline/sync status surface is available globally without blocking the learner's main interface.

## Privacy boundary

Authenticated pages are network-only. This is deliberate: caching a signed-in HTML page in a shared service-worker cache could expose one learner's account to another user of the same device. Curriculum lesson payloads use IndexedDB instead and contain the lesson content needed for Tutor fallback.

## Release gate

```powershell
npm ci
npm run audit:v14.1-pwa-offline
npm run launch:check
npm run typecheck
npm run lint
npm run build
```

A source audit is not a substitute for testing installation and offline behavior on real Android/iOS/desktop browsers.
