# AVORA V14.0.0 — Tutor Device Resilience

V14.0.0 extends V13.9.0 without replacing curriculum, assessment, mock, family, admin or trial architecture.

## Added
- Topic/subject-scoped local Tutor session autosave.
- Exact section + board-step recovery after reload/navigation/device-browser interruption.
- Restored teaching sessions open paused so narration never surprises the learner or skips content.
- Browser visibility protection: active teaching pauses when the learner leaves the page.
- Screen Wake Lock support where the browser/device allows it, with safe fallback.
- Online/offline runtime state and learner-facing status.
- Loaded lesson content and local device speech can continue while offline.
- Network-dependent marking, diagnosis, re-guidance and Tutor Q&A explicitly wait for reconnection rather than fabricating results.
- Learner answer/checkpoint drafts are retained locally during temporary network loss.
- Responsive resilience/recovery controls for narrow phones.

## Important boundary
This is resilience for a lesson that has already loaded. It is not a claim that the entire AVORA application is a fully installable offline-first PWA. Initial authenticated curriculum/API loading still requires application/server access.

## Release gate
```powershell
npm ci
npm run audit:v14-device-resilience
npm run launch:check
npm run typecheck
npm run lint
npm run build
```
