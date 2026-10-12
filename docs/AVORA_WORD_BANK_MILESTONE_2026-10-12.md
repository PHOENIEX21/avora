# English Word Bank Milestone

Branch: `avora-academic-core-v1`. Based on `51f0361dc9ea7c3fb6c4ed70eb6602e96b8fb1a3`. This is the owner-authored word-bank foundation within original Phase 4/4g, not completion of English Daily or the platform.

## Implemented

- `/admin/weekly/words`: server-guarded owner page with class/status filters, literal word search, 50-row pagination, CSV upload/paste, draft correction and source review. Linked from the existing weekly owner console.
- `GET/POST /api/admin/weekly/words` and `PATCH /api/admin/weekly/words/[id]` reject guests and non-admin roles before reading learner/content data or writing anything.
- Source reference, word, part of speech, plain meaning and one to three example sentences are mandatory. Related form and pronunciation hint are optional. Existing deep lessons are unchanged; this workflow does not generate teaching content.
- UTF-8 request bodies are bounded by bytes, CSV imports by 250 rows. The existing strict quoted/multiline CSV parser is reused; curriculum field requirements are preserved. Word imports reject unknown columns and publication/reviewer fields.
- Imports are one transaction, always DRAFT. Per-class advisory locking coordinates import and draft edits; case/trim duplicate checks use PostgreSQL normalization. Duplicates reject the entire batch, including existing approved/published sources, without overwriting content.
- Every change checks the expected revision after locking. Only DRAFT can be edited or submitted; only IN_REVIEW can be approved or returned to draft. Approval requires an explicit source-check confirmation and a note, and records the actual owner and database timestamp. Missing source/content cannot be approved. Old provenance is not guessed.
- APPROVED is content review, not learner publication. No Publish, deletion or replacement action exists. Existing APPROVED/PUBLISHED/RETIRED words are preserved. A failed/lost import response asks the owner to reload before retrying; it does not falsely promise that a lost commit acknowledgement means nothing was saved.

## Schema and Data

Read-only runtime identity confirmed `br-blue-scene-ayydvo7l` before writes. Its vocabulary table initially had zero words. Migration `066_weekly_word_bank_review.sql` adds provenance/review/revision/update metadata and an owner-list index to the existing table, and is recorded only on that isolated branch. No competing content table or academic model was created.

Source/importer/reviewer timestamps and notes remain null on historical content unless explicitly supplied/reviewed. Default revision/update values are migration bookkeeping, not evidence of historical approval. The first multi-statement development-tag attempt failed and rolled back; the verified same-driver guarded transaction then applied the complete additive SQL and ledger entry. No partial ledger claim was made.

No real word bank was fabricated, imported or published. Fixture users/words and fixture publication states exist only inside the integration transaction and roll back with absence checks. No lesson, student history, class activation, production database, main merge or deployment was modified.

## Verification

- Ten new executable regression tests cover strict source parsing and preserved curriculum imports, byte/body limits, content validation, role/API/page isolation, filters, revisions, required owner confirmation and unsupported publication.
- Full Node suite passes: 171 tests, zero failures/skips. Independent typecheck, production build, lint, all seven curriculum audits and source-backed teaching-pipeline audit pass. Eleven pre-existing lint warnings remain; no new warnings. Teaching audit covers 144 units, 3232 learner moments and 1099 authored checks.
- `node --experimental-strip-types scripts/verify-weekly-word-bank-neon.mjs`: 76 real SQL/route assertions with rollback and fixture absence checks. Includes an injected second-row failure, replay/duplicate rejection, cross-class separation, stale reviews, source recovery, explicit approval and published-source preservation. This uses a simulated owner session against real SQL, not live owner login or multi-client load verification.
- Existing workspace integration passes 255 real SQL/route assertions, all rolled back with fixture absence checked. Combined with the word-bank run: 331 fresh isolated SQL/route assertions. Earlier baseline/official-exam integration evidence is historical, not rerun here; their Node regression tests run in the full suite.
- `node scripts/verify-weekly-words-browser.mjs`: actual owner component workflows pass at 360/390/412/1280 pixels: file upload, failed import and retry, edit/examples, send/reject/approve, confirmation gating, reload, class/status filters, load retry, no horizontal overflow, 44px targets and no browser errors. Browser tests exposed ambiguous wrapped control labels; stable accessible names were added and all widths rerun successfully.
- Actual app HTTP health is 200 with database connected; root is 200. Guest owner API returns 403. Chromium guest navigation to the owner word-bank page reaches login and renders no word-bank heading. This does not bypass authentication/guardian verification.
- Production dependency audit reports zero vulnerabilities. Build skips type validation internally, so its independent typecheck is required separately.

Browser prerequisites, outside tracked dependencies: `npm install --prefix /tmp/avora-visual-tools esbuild@0.25.12 --cache /tmp/npm-cache --no-audit --no-fund`. The cloud runtime provides Playwright and Chromium. Review images are under `docs/screenshots/weekly-words/`; they are TEST_ONLY component evidence, not published learner data or an accessible authenticated app preview.

## CSV Contract

Select the class separately. Required exact headers:

```csv
word,partOfSpeech,meaning,example1,sourceReference
```

Optional columns: `example2`, `example3`, `relatedForm`, `pronunciationHint`. Quote commas, line breaks and embedded quotes using ordinary CSV quoting. A third example requires a second. Approval is a human content/source check, not an automated claim that a citation proves correctness.

## Remaining Work

Continue source-backed English rule/oral/sentence authoring and review, approved audio and existing weekly question linkage, then the daily-plan assembler and learner exercise/retention/progress flow. Class-year no-repeat planning is not solved by uniqueness in the class word library. No learner word quota, completed English segment or word mastery is inferred from an owner approval.

The existing release routes currently count five PUBLISHED daily-plan rows but do not deeply validate all referenced words/rules/oral/audio/sentence sets/exercise coverage. `sentence_task_set_id` has no implemented backing authoring model. Do not declare those counts sufficient or activate classes. The broader release-check repair belongs with the complete source-backed English plan contracts, not a guessed JSON schema or fabricated examples.

Guardian policy remains closed and SendGrid activation remains owner-deferred. Oral pronunciation/audio choices and approved child/photo consent are rollout reminders, not a reason to interrupt this independent milestone. Full uploads/calendar/exam-remediation/parent/community/privacy/design/analytics/QA phases remain incomplete.
