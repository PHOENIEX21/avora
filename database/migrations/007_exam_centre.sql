CREATE TABLE IF NOT EXISTS exam_sessions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,exam_name text NOT NULL,subject_name text NOT NULL,question_ids uuid[] NOT NULL,answers jsonb NOT NULL DEFAULT '{}'::jsonb,started_at timestamptz NOT NULL DEFAULT now(),duration_seconds integer NOT NULL DEFAULT 2700,submitted_at timestamptz,score numeric(5,4),status text NOT NULL DEFAULT 'ACTIVE');
CREATE INDEX IF NOT EXISTS idx_exam_sessions_student ON exam_sessions(student_id,started_at DESC);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS exam_topic text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS exam_weight integer NOT NULL DEFAULT 1;
