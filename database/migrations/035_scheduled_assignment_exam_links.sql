-- AVORA scheduled CBT/weekend assessment sessions.
-- The existing questions/exam_sessions engine remains the objective-question engine.
-- Assignment-origin theory stays linked here rather than being forced into questions.

ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS assignment_question_ids uuid[] NOT NULL DEFAULT ARRAY[]::uuid[];
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS schedule_kind text;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS curriculum_topic_id text;

CREATE INDEX IF NOT EXISTS idx_exam_sessions_schedule_kind
  ON exam_sessions(student_id,schedule_kind,started_at DESC);
