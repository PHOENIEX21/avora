ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_group text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS curriculum_order integer NOT NULL DEFAULT 0;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS current_skill_id uuid REFERENCES skills(id) ON DELETE SET NULL;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS current_topic_id uuid REFERENCES topics(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_questions_exam_group ON questions(exam_name, question_group, status);
CREATE INDEX IF NOT EXISTS idx_questions_skill_order ON questions(skill_id, curriculum_order, difficulty);
