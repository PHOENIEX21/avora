-- Baseline attempts are separate from the legacy diagnostic and weekly exams.
-- This stores an individually assigned question order and server-side timing.
CREATE TABLE IF NOT EXISTS weekly_baseline_attempts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 class_level text NOT NULL CHECK(class_level IN ('JSS1','JSS2','JSS3')),
 status text NOT NULL DEFAULT 'IN_PROGRESS' CHECK(status IN ('IN_PROGRESS','COMPLETED','EXPIRED')),
 started_at timestamptz NOT NULL DEFAULT now(),
 submitted_at timestamptz,
 duration_seconds integer NOT NULL DEFAULT 900 CHECK(duration_seconds=900),
 question_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
 answer_data jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT baseline_question_ids_array CHECK(jsonb_typeof(question_ids)='array'),
 CONSTRAINT baseline_answers_object CHECK(jsonb_typeof(answer_data)='object')
);
CREATE UNIQUE INDEX IF NOT EXISTS weekly_baseline_one_open_attempt
 ON weekly_baseline_attempts(student_id) WHERE status='IN_PROGRESS';
CREATE INDEX IF NOT EXISTS weekly_baseline_student_recent
 ON weekly_baseline_attempts(student_id,started_at DESC);
