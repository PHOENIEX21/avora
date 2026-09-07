# AVORA V7.6 — Purposeful Learning Journey

This release connects assessment, topic choice, tutoring, independent practice and mastery into one understandable student journey.

## Main changes
- Exam results are actionable: every assessed topic can be opened directly in Tutor; weakest topic is clearly recommended, not forced.
- Tutor now loads real reviewed questions from Neon for the student's exam/subject/topic.
- Tutor controls have separate jobs: Explain simply, Show visually, Show an example, Let me try.
- Guided tutor answer checking works through `/api/tutor/check` without falsely adding mastery evidence.
- After guided success, student is sent to topic-specific independent Practice to prove the skill.
- Practice can accept a `topic` query and selects a skill from that topic.
- Progress is now driven by Neon mastery/evidence instead of hard-coded demo numbers.
- Home explains the role of Exam, Tutor, Practice and Progress.
- Mobile-first layouts added for topic selection, tutor actions, exam-result topic actions and live mastery.

No new database migration is required.
