-- AVORA V10.4.0: evidence-backed live assessment results and intervention loop.
ALTER TABLE remediation_plans
  ADD COLUMN IF NOT EXISTS source_live_assessment_id uuid REFERENCES live_assessments(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS live_assessment_topic_results (
  assessment_id uuid NOT NULL REFERENCES live_assessments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_name text NOT NULL,
  correct_count integer NOT NULL DEFAULT 0,
  total_count integer NOT NULL DEFAULT 0,
  percent integer NOT NULL DEFAULT 0 CHECK(percent BETWEEN 0 AND 100),
  evidence_status text NOT NULL DEFAULT 'NEEDS_ATTENTION' CHECK(evidence_status IN ('STRONG','DEVELOPING','NEEDS_ATTENTION')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(assessment_id,student_id,topic_name)
);
CREATE INDEX IF NOT EXISTS idx_live_topic_results_student ON live_assessment_topic_results(student_id,created_at DESC);

CREATE TABLE IF NOT EXISTS live_assessment_reports (
  assessment_id uuid NOT NULL REFERENCES live_assessments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  overall_percent integer NOT NULL DEFAULT 0 CHECK(overall_percent BETWEEN 0 AND 100),
  strongest_topic text,
  weakest_topic text,
  recommended_topic text,
  summary text NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(assessment_id,student_id)
);
CREATE INDEX IF NOT EXISTS idx_live_reports_student ON live_assessment_reports(student_id,generated_at DESC);
