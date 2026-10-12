-- Additive onboarding preferences and starting-check state.
-- Does not modify existing diagnostic or assessment records.
-- Apply to isolated validation Neon before any production approval.
CREATE TABLE IF NOT EXISTS weekly_student_study_settings (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 study_period text CHECK (study_period IN ('AFTER_SCHOOL','EVENING','AFTER_DINNER')),
 study_time time,
 timezone text NOT NULL DEFAULT 'Africa/Lagos',
 parent_weekly_summary_enabled boolean NOT NULL DEFAULT false,
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT study_period_and_time_together CHECK (
  (study_period IS NULL AND study_time IS NULL) OR
  (study_period IS NOT NULL AND study_time IS NOT NULL)
 )
);
CREATE TABLE IF NOT EXISTS weekly_student_baseline_state (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 status text NOT NULL DEFAULT 'NOT_STARTED'
  CHECK (status IN ('NOT_STARTED','POSTPONED','IN_PROGRESS','COMPLETED')),
 postponed_until timestamptz,
 first_offered_at timestamptz,
 started_at timestamptz,
 completed_at timestamptz,
 attempt_id uuid,
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT baseline_completion_consistency CHECK (
  status <> 'COMPLETED' OR completed_at IS NOT NULL
 )
);
CREATE INDEX IF NOT EXISTS weekly_baseline_postponed
 ON weekly_student_baseline_state(postponed_until)
 WHERE status='POSTPONED';
