CREATE TABLE IF NOT EXISTS ncee_mock_sessions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 mock_number integer NOT NULL CHECK(mock_number BETWEEN 1 AND 8), class_level text NOT NULL CHECK(class_level IN ('Primary 5','Primary 6')),
 paper text NOT NULL DEFAULT 'PAPER_I' CHECK(paper IN ('PAPER_I','BREAK','PAPER_II','COMPLETED')),
 question_ids text[] NOT NULL DEFAULT '{}', answers jsonb NOT NULL DEFAULT '{}'::jsonb,
 started_at timestamptz NOT NULL DEFAULT now(), paper_started_at timestamptz NOT NULL DEFAULT now(),
 submitted_at timestamptz, score numeric(5,2), domain_results jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_ncee_mock_student ON ncee_mock_sessions(student_id,started_at DESC);
