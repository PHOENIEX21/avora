# AVORA V14.6.0 — Flow & Runtime Rebuild

This release fixes the runtime/UI faults found during live Vercel testing without replacing the V13 master curriculum or assessment banks.

## Fixed

- Gemini Tutor HTTP 400: Gemini receives a compatible nullable JSON schema instead of an `anyOf` union that the generateContent structured-output subset rejects. Safe provider error details are logged server-side without exposing API keys or learner prompts.
- React hydration mismatch around the trial countdown: server and client now start from the same serialized timestamp.
- Header/trial scroll bleed: authenticated header and trial bar are opaque and their mobile offsets are aligned.
- Mobile Practice readability: prompt sizing, answer textarea containment and bottom spacing improved.
- Practice attempt reliability: primary attempt + mastery evidence are saved together with stronger transient retries; secondary learner-insight analytics cannot turn an already-recorded answer into a visible failed submission.
- Parent registration now creates the parent session immediately and continues directly to `/parent/family`.
- Parent family setup clearly supports both valid paths: connect an existing learner by secure code, or create a brand-new learner account and add it to the family.
- Learners can initiate parent connection by entering a parent/guardian email. AVORA emails the secure code; the parent still has to sign in/create a Parent account and accept the connection.
- Parent mobile navigation now points only to real destinations: Overview, Children and Plan.

## Family connection contract

### Parent starts
1. Parent creates Parent account.
2. AVORA takes the parent directly to Children / Family setup.
3. Parent chooses either:
   - My child already has AVORA → enter learner secure code.
   - My child is new → create learner account; it is added to the family automatically.
4. Learner signs in separately for Tutor, Practice and Exams.

### Learner starts
1. Learner opens Parent connection.
2. Learner either enters the parent email or shows the one-time code.
3. Parent creates/signs in to their own Parent account.
4. Parent accepts by entering the code in Children / Family setup.

No learner is silently duplicated, and a learner is not linked to a parent merely because an email address was entered.

## Academic verification rerun

The current V13 master-curriculum and source-truth audits were rerun after this rebuild:
- V13 master curriculum: 20/20; 96 runtime topics; missing master teaching 0; orphan source targets 0.
- Deep Teaching Standard: 12/12.
- Assessment parity: 20/20; 888 JSS1/JSS2 independent questions + 111 performance tasks.
- V12.8 source truth: 24/24; 151 units, 2019 ordered steps, 513 checks, 18 courses, 20 source files.
- V14.6 flow/runtime source audit: 16/16.

A much older `audit-curriculum-reality.mjs` still reports three legacy-registry assumptions that were superseded by the V13 master-curriculum architecture. It is not part of the current launch chain and should not be treated as the V13 runtime authority.

## Before deploying

Preserve your existing `.env.local`; it is intentionally not bundled as a secret-bearing deployment file.

Run:

```powershell
npm install
npm run typecheck
npm run lint
npm run build
npm run audit:v14.6-flow-runtime
npm run launch:check
```

No new database migration is required for V14.6.0.

After deployment, verify these live flows:
1. Tutor asks Gemini a direct question and `/api/tutor/chat` returns `mode: "ai-gemini"`.
2. Learner Practice answer records successfully.
3. Parent registration lands on `/parent/family`.
4. Parent creates a new child learner.
5. Existing learner generates/invites parent and parent links with the code.
6. Scroll the Practice/Tutor pages on a narrow phone and confirm lesson text never shows through the header/trial bar.
