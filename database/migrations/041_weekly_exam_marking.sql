ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS objective_score numeric;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS marking_status text NOT NULL DEFAULT 'NOT_REQUIRED'
 CHECK(marking_status IN ('NOT_REQUIRED','PENDING','COMPLETED','FAILED'));
CREATE INDEX IF NOT EXISTS weekly_exam_result_idx ON exam_sessions(student_id,weekly_exam_blueprint_id,status,submitted_at);