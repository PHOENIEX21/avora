ALTER TABLE attempts ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'PRACTICE';
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS hint_count integer NOT NULL DEFAULT 0;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS attempt_number integer NOT NULL DEFAULT 1;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_started_at timestamptz;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_completed_at timestamptz;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS diagnostic_score numeric(5,4);
CREATE INDEX IF NOT EXISTS idx_attempts_student_mode ON attempts(student_id, mode, created_at DESC);
