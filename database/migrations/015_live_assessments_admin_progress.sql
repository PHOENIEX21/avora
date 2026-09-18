-- AVORA V10.3.0: human-hosted, parent-supervised live assessments and academic operations.
CREATE TABLE IF NOT EXISTS live_assessments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 class_level text NOT NULL,
 subject_name text NOT NULL,
 host_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 scheduled_at timestamptz NOT NULL,
 duration_seconds integer NOT NULL DEFAULT 1800 CHECK(duration_seconds BETWEEN 300 AND 10800),
 question_count integer NOT NULL DEFAULT 20 CHECK(question_count BETWEEN 1 AND 100),
 selection_mode text NOT NULL DEFAULT 'COVERED' CHECK(selection_mode IN ('COVERED','MANUAL')),
 topic_names text[] NOT NULL DEFAULT '{}',
 parent_required boolean NOT NULL DEFAULT true,
 instructions text,
 status text NOT NULL DEFAULT 'SCHEDULED' CHECK(status IN ('DRAFT','SCHEDULED','LOBBY','LIVE','PAUSED','ENDED','CANCELLED')),
 started_at timestamptz,
 ended_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_live_assessments_schedule ON live_assessments(class_level,scheduled_at DESC);

CREATE TABLE IF NOT EXISTS live_assessment_participants (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 assessment_id uuid NOT NULL REFERENCES live_assessments(id) ON DELETE CASCADE,
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 parent_confirmed boolean NOT NULL DEFAULT false,
 parent_name text,
 parent_confirmed_at timestamptz,
 joined_at timestamptz,
 submitted_at timestamptz,
 score numeric(5,4),
 status text NOT NULL DEFAULT 'INVITED' CHECK(status IN ('INVITED','JOINED','IN_PROGRESS','SUBMITTED','ABSENT')),
 UNIQUE(assessment_id,student_id)
);
CREATE INDEX IF NOT EXISTS idx_live_participant_student ON live_assessment_participants(student_id,assessment_id);

CREATE TABLE IF NOT EXISTS live_assessment_questions (
 assessment_id uuid NOT NULL REFERENCES live_assessments(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 order_index integer NOT NULL,
 PRIMARY KEY(assessment_id,question_id),
 UNIQUE(assessment_id,order_index)
);

CREATE TABLE IF NOT EXISTS live_assessment_answers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 assessment_id uuid NOT NULL REFERENCES live_assessments(id) ON DELETE CASCADE,
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 answer jsonb NOT NULL,
 is_correct boolean,
 answered_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(assessment_id,student_id,question_id)
);
CREATE INDEX IF NOT EXISTS idx_live_answers_student ON live_assessment_answers(assessment_id,student_id);
