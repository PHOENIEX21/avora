-- Daily assessment publishing and academic AI workspace.
-- Questions cannot reach learners merely because an AI generated them.

CREATE TABLE IF NOT EXISTS daily_assessments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 objective_id uuid NOT NULL REFERENCES academic_daily_objectives(id) ON DELETE CASCADE,
 title text NOT NULL,
 question_target integer NOT NULL DEFAULT 10 CHECK(question_target BETWEEN 1 AND 50),
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ARCHIVED')),
 published_at timestamptz,
 approved_at timestamptz,
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(objective_id)
);

CREATE TABLE IF NOT EXISTS daily_assessment_questions (
 assessment_id uuid NOT NULL REFERENCES daily_assessments(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 position integer NOT NULL CHECK(position BETWEEN 1 AND 50),
 selection_source text NOT NULL CHECK(selection_source IN ('STANDARD_BANK','ADMIN','AI_GAP_FILL','APPROVED_SUBMISSION','VARIANT')),
 relevance_status text NOT NULL DEFAULT 'PENDING' CHECK(relevance_status IN ('PENDING','PASSED','FAILED','ADMIN_OVERRIDE')),
 answer_status text NOT NULL DEFAULT 'PENDING' CHECK(answer_status IN ('PENDING','PASSED','FAILED','ADMIN_OVERRIDE')),
 reviewer_note text,
 added_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(assessment_id,question_id),
 UNIQUE(assessment_id,position)
);

CREATE TABLE IF NOT EXISTS academic_ai_jobs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 requested_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 objective_id uuid REFERENCES academic_daily_objectives(id) ON DELETE CASCADE,
 assessment_id uuid REFERENCES daily_assessments(id) ON DELETE CASCADE,
 job_kind text NOT NULL CHECK(job_kind IN ('FIND_BANK_MATCHES','GAP_ANALYSIS','GENERATE_VARIANTS','GENERATE_QUESTIONS','CHECK_RELEVANCE','VERIFY_ANSWERS','IMPROVE_EXPLANATION')),
 instruction text,
 requested_count integer,
 status text NOT NULL DEFAULT 'QUEUED' CHECK(status IN ('QUEUED','RUNNING','COMPLETED','FAILED','CANCELLED')),
 provider text,
 model text,
 result_summary jsonb,
 created_at timestamptz NOT NULL DEFAULT now(),
 completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS daily_assessments_objective_status_idx ON daily_assessments(objective_id,status);
CREATE INDEX IF NOT EXISTS daily_assessment_questions_assessment_position_idx ON daily_assessment_questions(assessment_id,position);
CREATE INDEX IF NOT EXISTS academic_ai_jobs_objective_created_idx ON academic_ai_jobs(objective_id,created_at DESC);
