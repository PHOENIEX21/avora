-- Release windows and immutable learner linkage for weekly exams.
ALTER TABLE weekly_exam_blueprints ADD COLUMN IF NOT EXISTS release_at timestamptz;
ALTER TABLE weekly_exam_blueprints ADD COLUMN IF NOT EXISTS closes_at timestamptz;
ALTER TABLE weekly_exam_blueprints ADD COLUMN IF NOT EXISTS results_release_at timestamptz;

ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS weekly_exam_blueprint_id uuid REFERENCES weekly_exam_blueprints(id) ON DELETE SET NULL;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS weekly_exam_version_id uuid REFERENCES weekly_exam_versions(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS exam_sessions_student_weekly_version_unique
 ON exam_sessions(student_id,weekly_exam_version_id)
 WHERE weekly_exam_version_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS weekly_exam_release_idx ON weekly_exam_blueprints(class_level,status,release_at,closes_at);
