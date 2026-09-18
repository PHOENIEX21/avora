-- AVORA V13.6: exact authored mock-paper identity without creating a second question engine.
ALTER TABLE questions ADD COLUMN IF NOT EXISTS mock_set integer;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS mock_paper_key text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS mock_question_number integer;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS mock_source_file text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS mock_answer_guidance text;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS mock_paper_key text;
CREATE INDEX IF NOT EXISTS idx_questions_mock_paper ON questions(mock_paper_key,mock_question_number,status,quality_status);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_mock_paper ON exam_sessions(student_id,mock_paper_key,started_at DESC);

CREATE TABLE IF NOT EXISTS authored_mock_papers (
 paper_key text PRIMARY KEY,
 class_level text NOT NULL,
 subject_name text NOT NULL,
 set_number integer NOT NULL CHECK(set_number IN (1,2)),
 title text NOT NULL,
 source_file text NOT NULL,
 raw_markdown text NOT NULL,
 review_version text NOT NULL DEFAULT 'V13.6.0',
 status text NOT NULL DEFAULT 'PUBLISHED',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(class_level,subject_name,set_number)
);
