# AVORA V7.20.3 — Practice, Exam & Performance Reliability

This build is based on V7.20.2 and keeps the synchronized whiteboard/voice tutor and auth/service-worker reliability fixes.

## Fixes
- Practice counter now represents the current 5-question session only; historical attempts no longer produce impossible displays such as 17 of 5.
- Practice becomes a defined 5-question set and presents a finish/continue action when the set is complete.
- Practice, auth and onboarding now safely handle empty/invalid API responses instead of crashing on JSON parsing.
- Practice uses reviewed question-bank content only.
- Exam final question now shows **Submit assessment** instead of a disabled Next button.
- Flag for review now has a meaningful review flow: flags are visible in the navigator, counted, and submission warns about flagged/unanswered questions with a jump to the first flagged question.
- Exam question changes persist the current answer before navigation.
- Exam start exposure tracking is batched into one DB write instead of one write per question.
- Exam finish attempt creation is batched instead of up to 40 sequential writes.
- Shared layout no longer performs a database lookup solely to render the signed-in name; new sessions carry the display name in the signed session token, with an email-prefix fallback for existing sessions.
- Database connection timeout/retry behavior fails faster on a genuinely unavailable network instead of appearing to hang for a long time.
- Tutor topic lesson loading avoids an unnecessary full topic-list query when a topic has already been selected.

## No database changes
No migration or seed is required.
