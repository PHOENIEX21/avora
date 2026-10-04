-- AVORA V9.0: learner intelligence, remediation and trustworthy teaching evidence.
CREATE TABLE IF NOT EXISTS learner_skill_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'STARTING',
  confidence text NOT NULL DEFAULT 'LOW',
  misconception_key text,
  misconception_note text,
  prerequisite_gap text,
  independent_accuracy numeric(5,4),
  independent_evidence integer NOT NULL DEFAULT 0,
  tutor_evidence integer NOT NULL DEFAULT 0,
  last_wrong_at timestamptz,
  last_correct_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id,skill_id)
);
CREATE INDEX IF NOT EXISTS idx_learner_skill_insights_student ON learner_skill_insights(student_id,updated_at DESC);

CREATE TABLE IF NOT EXISTS tutor_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_name text NOT NULL,
  subject_slug text NOT NULL,
  topic_name text NOT NULL,
  unit_title text,
  interaction_kind text NOT NULL,
  learner_text text,
  teacher_text text,
  outcome text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tutor_interactions_student ON tutor_interactions(student_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tutor_interactions_topic ON tutor_interactions(student_id,subject_slug,topic_name,created_at DESC);

CREATE TABLE IF NOT EXISTS remediation_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_name text NOT NULL,
  subject_name text NOT NULL,
  source_exam_session_id uuid REFERENCES exam_sessions(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'ACTIVE',
  weak_topics jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommended_topic text,
  recommended_skill text,
  plan_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_remediation_plans_student ON remediation_plans(student_id,status,created_at DESC);

ALTER TABLE tutor_topic_progress ADD COLUMN IF NOT EXISTS checkpoint_attempts integer NOT NULL DEFAULT 0;
ALTER TABLE tutor_topic_progress ADD COLUMN IF NOT EXISTS checkpoint_successes integer NOT NULL DEFAULT 0;
ALTER TABLE tutor_topic_progress ADD COLUMN IF NOT EXISTS last_unit_title text;
ALTER TABLE tutor_topic_progress ADD COLUMN IF NOT EXISTS last_interaction_at timestamptz;
