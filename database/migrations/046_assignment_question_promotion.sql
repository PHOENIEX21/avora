ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS trusted_question_id uuid REFERENCES questions(id) ON DELETE SET NULL;
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS solution_reviewed_at timestamptz;
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS solution_reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS assignment_questions_trusted_idx ON assignment_questions(trusted_question_id) WHERE trusted_question_id IS NOT NULL;