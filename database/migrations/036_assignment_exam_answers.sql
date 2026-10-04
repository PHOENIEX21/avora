-- Scheduled assessment answers for assignment-origin questions.
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS assignment_answers jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS assignment_marks jsonb NOT NULL DEFAULT '{}'::jsonb;
