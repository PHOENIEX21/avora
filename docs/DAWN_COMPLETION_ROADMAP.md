# AVORA Dawn restructuring — completion roadmap and release gates

Status: work in progress on `avora-academic-core-v1`. This file tracks implementation, not claims of completion. The owner-approved restructuring instructions and Dawn screenshots/HTML remain the functional and visual acceptance criteria.

## Non-negotiable safeguards
- Do not deploy, merge, enable production class flags, or migrate the primary Neon database without explicit owner approval.
- Existing students keep user IDs, passwords, history, attempts, uploads, and scores. No forced re-registration.
- No new teacher, parent or school-admin accounts; exactly one owner-admin. Parent Area is inside the student app, PIN-gated.
- Never infer guardian consent from a legacy account. Verified guardian consent and legally approved wording precede activation. Photo consent is separate.
- Unreleased classes and weeks, unpublished objectives, unreviewed questions and cross-class data remain inaccessible server-side.
- Visual acceptance means comparing rendered 360px/390px mobile screens with the supplied Dawn screenshots and HTML, not merely matching colours.

## Milestones and acceptance gates

| Stage | Deliverable | Current evidence | Completion gate |
| --- | --- | --- | --- |
| 1 | Additive weekly schema, flags and isolated validation DB | Migrations 051–054 on validation branch only | Migration/rollback rehearsed; no primary DB drift |
| 2 | Official NERDC weekly curriculum and objectives | Import/review endpoints and admin draft UI | Verified NERDC mapping, publish checks, past-week reads, class isolation |
| 3 | Existing-student transition and guardian security | `lib/dawnAccess.ts`, `/api/weekly/experience`, guardian status page | Verified guardian contact/consent, secure PIN enrollment and recovery, safe automatic routing and rollback |
| 4 | Screenshot-accurate Dawn student interface | Today, This Week and guardian status shells | Pixel/layout comparison across all 13 Dawn reference screens and responsive devices; accessible functional navigation |
| 5 | English Daily ring | Schema foundations only | Five words, Rule, Oral, three Sentences and Revisit with owner-approved content/audio and progress |
| 6 | Weekly deep lessons | Legacy lesson system exists | One approved topic per subject/week; first-encounter teaching, worked examples, diagrams, objective mastery |
| 7 | Question bank and CBT | Migration 054 and gap audit | Six approved items per objective across three difficulties, 40–50 live items/topic, 30-question individual weekly forms, rotation, reports |
| 8 | Weekly exams and scheduling | Legacy exam components exist | Lagos timezone, release/close overrides, server clock, autosave, retake rules, results and audit |
| 9 | Notes, uploads, mastery stars and moderated groups | Existing legacy features, Dawn shells pending | Private-by-default uploads, moderation, shared-item approval, reliable mastery display |
| 10 | Owner-only operations | Partial admin objectives/flags | Owner identity and 2-step verification, audit log, queues, question set review, week controls |
| 11 | Full verification | CI and isolated DB checks incomplete | Unit/integration/e2e, security, visual regression, academic review, mobile and accessibility pass |
| 12 | Controlled production release | Not started | Explicit owner approval, primary migration plan, class-by-class activation, existing-student checks, rollback drill |

## Immediate critical path
1. Use one server-side Dawn gate for Today, This Week, Guardian Setup and the experience API. Fail closed when weekly tables are absent.
2. Implement verified guardian consent with owner-approved text and contact verification; only then allow PIN enrollment. Never accept a parent PIN merely from a logged-in student session.
3. Implement authenticated Parent Area PIN unlock with rate limiting, short-lived access, shared-device isolation and recovery.
4. Implement a class-flagged automatic transition for existing students with safe legacy fallback, after gates 2–3 pass.
5. Inspect actual Dawn ZIP/screenshots and complete screen-by-screen visual parity, then English Daily and weekly learning.
6. Complete content readiness and exam publishing gates before any class flag activation.

## Definition of done
A stage is complete only after source is committed, automated tests pass, its data is verified on the isolated Neon branch, the relevant screenshot/academic acceptance criteria are reviewed, and owner approval is obtained for release-sensitive operations. A GitHub commit alone is not completion.
