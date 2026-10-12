# Weekly Visual Checkpoint

Development branch: `avora-academic-core-v1`; previous commit `accd0c2`. Both previous commit GitHub Actions passed before edits. This is a focused visual continuation, not complete Phase 10 or platform delivery.

## Scope

Compared the actual exported screens 17 (This week) and 18 (Topic objectives) under `docs/source/avora-screens.zip` with their HTML references and the original specification. Improved the existing real weekly component rather than creating another academic model or a demo application.

- Scoped `DawnTokens.module.css` starts a reusable colour/type/control token surface without changing public, admin, parent or legacy navigation.
- Subject edges follow the reference's distinct English, mathematics, science and civic/social colours; known additional subjects have stable gems and unknown optional subjects use a neutral fallback.
- Selecting a subject places its actual topic at the top and shows the real objective text as each card heading. Multiple supplied topics remain explicit rather than being silently merged into a fabricated topic.
- Mastered, practising, needs practice, studying, studied and not-started states remain distinct. Completing textbook study never creates a mastery star.
- Selected study-source buttons visibly reflect persisted state, retain disabled/read-only history behaviour and expose `aria-pressed`. Missing lessons remain honestly unavailable. No mockup checkpoint or exam times were invented.
- Long text wraps; 44px buttons, visible focus, selected-control contrast and reduced-motion behaviour are retained. Existing practice/settings components sharing the stylesheet were regression-tested.

## Visual Evidence

The following are screenshots of the actual client components, with production global CSS but simulated navigation/API responses and explicit TEST_ONLY content. They are not authenticated app screenshots, curriculum, public previews or final owner design sign-off.

[Subject overview, 390px](screenshots/weekly-visual/subjects-390.png)

[Topic objectives, 390px](screenshots/weekly-visual/objectives-390.png)

Reproduce in this cloud environment:

```sh
npm install --prefix /tmp/avora-visual-tools esbuild@0.25.12 --cache /tmp/npm-cache --no-audit --no-fund
node scripts/verify-weekly-visual-browser.mjs
```

The harness uses the cloud's installed Playwright/Chromium and an internal temporary server, always closed afterward. Its fixture data is never inserted into Neon. Generated four-width screenshots are under `/tmp/avora-weekly-visual`; the two linked review artifacts are committed so they remain inspectable on GitHub.

## Verification

- 148 Node tests pass, including three new visual-state/supplied-content regressions. CI includes the new suite.
- Browser flows pass at 360, 390, 412 and 1280px: collapsed/expanded subjects, topic navigation, failed study save/retry, source selection, completion/reload, prior-week read-only controls, exact practice links, empty states, actual shared practice feedback/navigation and study-setting save/reload. No page script errors/horizontal overflow. Visible buttons are at least 44px tall; selected source text contrast is at least 4.5:1.
- Fresh isolated branch-verified integration: 125 official-exam plus 243 workspace assertions (368 total), passed with rollback and fixture absence checks. Current cloud has database/auth bindings present and actual `/api/health` returns HTTP 200, database connected. No production operation or migration occurred.
- Build, independent typecheck, seven curriculum audits and teaching pipeline pass. The teaching pipeline retains 144 source-backed units, 3,232 learner moments and 1,099 authored checks. Lint was corrected and rerun: zero errors, eleven known pre-existing warnings.

## Not Finished

The global app shell/navigation and floating Dawn dock have not been replaced. Georgia/Arial fallbacks remain; self-hosted Fraunces/Jakarta fonts, full theme switching and complete reference matching are pending. Card radius stays compatible with the existing weekly component. No decorative reference glow was added. The full Today, parent/admin, lobby, messaging, uploads, English Daily and other visual/functional phases remain incomplete.

Continue verified commits on the development branch, preserving genuine lessons and all release/guardian/publication restrictions. SendGrid/guardian activation remains owner-deferred. No main merge, production write, tunnel or deployment is authorized.
