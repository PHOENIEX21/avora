-- AVORA V13.7: full authored-mock Paper 2 / Composition responses and rubric marks.
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS extended_answers jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS extended_marks jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS extended_score numeric;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS extended_selected_keys text[] NOT NULL DEFAULT ARRAY[]::text[];

CREATE TABLE IF NOT EXISTS authored_mock_extended_tasks (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 paper_key text NOT NULL REFERENCES authored_mock_papers(paper_key) ON DELETE CASCADE,
 task_key text NOT NULL UNIQUE,
 task_number integer NOT NULL,
 task_type text NOT NULL CHECK(task_type IN ('MATH_THEORY','ENGLISH_COMPOSITION')),
 prompt text NOT NULL,
 expected_solution text,
 rubric jsonb NOT NULL,
 max_marks integer NOT NULL CHECK(max_marks > 0),
 required_count integer NOT NULL DEFAULT 1 CHECK(required_count > 0),
 review_version text NOT NULL DEFAULT 'V13.7.0',
 status text NOT NULL DEFAULT 'PUBLISHED',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mock_extended_paper ON authored_mock_extended_tasks(paper_key,task_number,status);
