# Weekly Home Entry Checkpoint

Branch `avora-academic-core-v1`, continuing verified visual commit `8b6b552`. Both previous push/PR Actions succeeded before edits. Original weekly visibility and guardian restrictions remain authoritative.

## Fixed

The legacy `/home` directly loaded its academic plan and official weekly cards without checking the new weekly access gate. It now checks the existing gate before those queries. Ready students enter the existing `/weekly` workspace. Guardian onboarding/verification pending, missing released-week state and gate unavailability cannot expose academic plans or official cards through the legacy home. Existing lessons/general learner evidence remain available under existing entitlement rules; no legal consent or access activation is invented.

Unreleased legacy classes retain their established learning experience. Their official cards now require an owner-approved blueprint and locked, sealed version; the class/student query remains bound to the authenticated profile. Admin, parent and other non-student roles are routed before learner-data queries.

Today uses Africa/Lagos date and weekday, not the execution host's clock interpretation. UTC Monday 23:30 is correctly Tuesday in Lagos. A weekend does not silently serve Friday's daily plan. No objective, question, lesson, score or schedule was created/modified.

## Verification

- 153 Node regressions, including five new home-entry tests: guest/role boundaries, ready redirect, guardian/missing-week/unavailable suppression, legacy preservation/sealed cards, Lagos midnight and weekend behaviour.
- New tests execute the actual transpiled server page with simulated session/gate/SQL dependencies. They do not establish approved guardian activation or live authenticated end-to-end behaviour.
- Actual guest browser navigation from `/home` reaches login. Internal app health returns HTTP 200 with database connected after starting the restored environment's development process.
- Production build, independent TypeScript and lint pass; eleven pre-existing lint warnings remain. No migration, production operation, main merge or deployment occurred.
- CI includes the home-entry suite; verify the final pushed SHA's push and PR run results before further work.

## Next

This is a secure bridge to the working weekly workspace, not the complete Today screen. The full Today task set/ring, global navigation, self-hosted fonts and remaining reference screens still need implementation. Retain the committed visual review screenshots; never substitute sample content or invented schedules for released real data. Continue the original platform phases and keep SendGrid/guardian activation owner-deferred.
