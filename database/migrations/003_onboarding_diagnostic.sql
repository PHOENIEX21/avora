ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS preferred_subject text DEFAULT 'Mathematics';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS learning_goal text;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS daily_goal_minutes integer NOT NULL DEFAULT 20;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS confidence_level integer CHECK (confidence_level BETWEEN 1 AND 5);
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
