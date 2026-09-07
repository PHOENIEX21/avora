CREATE TABLE IF NOT EXISTS tutor_topic_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_name text NOT NULL,
  subject_slug text NOT NULL,
  topic_name text NOT NULL,
  current_unit integer NOT NULL DEFAULT 0,
  covered_units jsonb NOT NULL DEFAULT '[]'::jsonb,
  coverage_complete boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, exam_name, subject_slug, topic_name)
);
CREATE INDEX IF NOT EXISTS idx_tutor_progress_student ON tutor_topic_progress(student_id, updated_at DESC);
