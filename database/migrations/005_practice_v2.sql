-- V5 is intentionally defensive: repeat critical V3/V4 columns so a database whose
-- migration history drifted can repair itself without deleting learner data.
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS preferred_subject text DEFAULT 'Mathematics';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS learning_goal text;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS daily_goal_minutes integer NOT NULL DEFAULT 20;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS confidence_level integer CHECK (confidence_level BETWEEN 1 AND 5);
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_started_at timestamptz;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_completed_at timestamptz;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_score numeric(5,4);
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'PRACTICE';
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS hint_count integer NOT NULL DEFAULT 0;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS attempt_number integer NOT NULL DEFAULT 1;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS hint_text text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS interaction_steps jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS prerequisite_note text;
CREATE INDEX IF NOT EXISTS idx_attempts_student_mode ON attempts(student_id, mode, created_at DESC);
