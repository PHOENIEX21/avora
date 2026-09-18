-- AVORA V10.13.0: identity-bound trial question allowance.
CREATE TABLE IF NOT EXISTS trial_question_exposures (
  id bigserial PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, question_key)
);
CREATE INDEX IF NOT EXISTS idx_trial_question_exposures_student ON trial_question_exposures(student_id,created_at);
