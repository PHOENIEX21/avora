# AVORA V13.7.0 — Full Mock Extended-Response Grading

V13.7 extends the V13.6 fixed 12 authored mocks so the complete paper participates in the live exam flow.

## Mathematics
- Paper 1 remains objective/short-response assessment.
- Paper 2 now appears in the same timed session.
- Six authored theory questions are preserved; learner selects exactly four, matching the source papers.
- Each selected theory response is marked against its source worked solution and subpart mark allocation.
- Valid method earns partial credit; equivalent correct methods are accepted.
- Full worked solutions remain hidden until submission.

## English
- The original composition options now appear after Sections A–C.
- Learner selects exactly one.
- Rubric marking is criterion-based, not vague whole-essay judgment.
- AVORA operational scoring uses 15 marks: task structure/organization 5, content/development 5, language accuracy 3, vocabulary 2, while preserving option-specific requirements from the source mock.

## Reliability
- Extended answers autosave separately from CBT answers.
- If rubric grading is unavailable, AVORA does not fabricate a zero or final score; submission returns a retryable error and the saved response remains intact.
- Extended criterion scores feed topic-level weakness analysis and remediation recommendations.
- AI feedback itself never becomes independent mastery evidence.

## Database
Migration `028_extended_mock_rubric_grading.sql` creates the extended-task store and exam-session response/mark fields.

Run:
```powershell
npm ci
npm run db:migrate
npm run audit:v13.7-extended-mocks
npm run launch:check
npm run build
```
