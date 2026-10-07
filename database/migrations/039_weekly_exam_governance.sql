-- Serious weekly examination governance.
CREATE TABLE IF NOT EXISTS weekly_exam_blueprints (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 class_level text NOT NULL,
 term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 week_number integer NOT NULL CHECK(week_number BETWEEN 1 AND 20),
 title text NOT NULL,
 duration_minutes integer NOT NULL DEFAULT 60 CHECK(duration_minutes BETWEEN 10 AND 240),
 question_count integer NOT NULL CHECK(question_count BETWEEN 5 AND 100),
 instructions text,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','GENERATING','IN_REVIEW','APPROVED','SCHEDULED','LIVE','CLOSED','ARCHIVED')),
 created_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_at timestamptz,
 scheduled_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(class_level,term,week_number,title)
);

CREATE TABLE IF NOT EXISTS weekly_exam_scope (
 blueprint_id uuid NOT NULL REFERENCES weekly_exam_blueprints(id) ON DELETE CASCADE,
 schedule_id uuid NOT NULL REFERENCES term_topic_schedule(id) ON DELETE RESTRICT,
 objective_id uuid REFERENCES academic_daily_objectives(id) ON DELETE RESTRICT,
 subject_name text NOT NULL,
 curriculum_topic_id text NOT NULL,
 target_questions integer NOT NULL CHECK(target_questions BETWEEN 1 AND 50),
 target_difficulty jsonb NOT NULL DEFAULT '{"foundation":0.3,"standard":0.5,"challenge":0.2}'::jsonb,
 skill_requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
 PRIMARY KEY(blueprint_id,schedule_id,objective_id)
);

CREATE TABLE IF NOT EXISTS weekly_exam_versions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 blueprint_id uuid NOT NULL REFERENCES weekly_exam_blueprints(id) ON DELETE CASCADE,
 version_number integer NOT NULL,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','LOCKED','SUPERSEDED')),
 generated_by text NOT NULL DEFAULT 'ADMIN' CHECK(generated_by IN ('ADMIN','AI','MIXED')),
 generation_job_id uuid REFERENCES academic_ai_jobs(id) ON DELETE SET NULL,
 locked_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(blueprint_id,version_number)
);

CREATE TABLE IF NOT EXISTS weekly_exam_version_questions (
 version_id uuid NOT NULL REFERENCES weekly_exam_versions(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 position integer NOT NULL,
 subject_name text NOT NULL,
 curriculum_topic_id text NOT NULL,
 objective_id uuid REFERENCES academic_daily_objectives(id) ON DELETE SET NULL,
 relevance_status text NOT NULL DEFAULT 'PENDING' CHECK(relevance_status IN ('PENDING','PASSED','FAILED','ADMIN_OVERRIDE')),
 answer_status text NOT NULL DEFAULT 'PENDING' CHECK(answer_status IN ('PENDING','PASSED','FAILED','ADMIN_OVERRIDE')),
 difficulty_band text CHECK(difficulty_band IN ('FOUNDATION','STANDARD','CHALLENGE')),
 reviewer_note text,
 PRIMARY KEY(version_id,question_id),
 UNIQUE(version_id,position)
);

CREATE INDEX IF NOT EXISTS weekly_exam_blueprints_class_week_idx ON weekly_exam_blueprints(class_level,term,week_number);
CREATE INDEX IF NOT EXISTS weekly_exam_versions_blueprint_idx ON weekly_exam_versions(blueprint_id,version_number DESC);
