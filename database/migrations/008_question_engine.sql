ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS assessment_type text NOT NULL DEFAULT 'FULL_MOCK';
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS topic_focus text;
CREATE TABLE IF NOT EXISTS question_exposures (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE, exam_session_id uuid REFERENCES exam_sessions(id) ON DELETE SET NULL,
 seen_at timestamptz NOT NULL DEFAULT now(), answered_correctly boolean,
 UNIQUE(student_id,question_id,exam_session_id)
);
CREATE INDEX IF NOT EXISTS idx_question_exposures_student_seen ON question_exposures(student_id,seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_question_exposures_question ON question_exposures(question_id);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS content_origin text NOT NULL DEFAULT 'AVORA_ORIGINAL';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS curriculum_objective text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS variant_family text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS quality_status text NOT NULL DEFAULT 'REVIEWED';
