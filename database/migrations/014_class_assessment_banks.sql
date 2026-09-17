-- AVORA V9.9.0: class-specific independent assessment evidence for JSS1-JSS3.
ALTER TABLE questions ADD COLUMN IF NOT EXISTS class_level text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS curriculum_topic_id text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS assessment_kind text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS review_version text;

-- Existing reviewed BECE material belongs to JSS3 unless already classified.
UPDATE questions SET class_level='JSS3' WHERE class_level IS NULL AND exam_name='BECE';

CREATE INDEX IF NOT EXISTS idx_questions_class_subject_status ON questions(class_level,status,quality_status);
CREATE INDEX IF NOT EXISTS idx_questions_curriculum_topic ON questions(curriculum_topic_id,status,quality_status);
CREATE INDEX IF NOT EXISTS idx_questions_class_topic ON questions(class_level,curriculum_topic_id,difficulty);

CREATE TABLE IF NOT EXISTS curriculum_performance_tasks (
 id text PRIMARY KEY,
 curriculum_topic_id text NOT NULL,
 class_level text NOT NULL,
 subject_name text NOT NULL,
 topic_name text NOT NULL,
 prompt text NOT NULL,
 rubric jsonb NOT NULL DEFAULT '[]'::jsonb,
 prerequisites jsonb NOT NULL DEFAULT '[]'::jsonb,
 source_authority text NOT NULL DEFAULT 'NERDC',
 source_url text,
 source_page integer,
 status text NOT NULL DEFAULT 'ACTIVE',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_performance_tasks_class_subject ON curriculum_performance_tasks(class_level,subject_name,status);
