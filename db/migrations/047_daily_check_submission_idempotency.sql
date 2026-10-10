-- Ensure each learner's published Daily Check contributes mastery evidence only once.
CREATE TABLE IF NOT EXISTS daily_assessment_submissions (
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id uuid NOT NULL REFERENCES daily_assessments(id) ON DELETE CASCADE,
  correct_count integer NOT NULL DEFAULT 0,
  total_count integer NOT NULL DEFAULT 0,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, assessment_id)
);
