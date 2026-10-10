-- AVORA weekly learning phase 1. Additive only. Existing academic and chat tables remain unchanged.
-- Rollback: disable weekly_class_flags.enabled; optional DROP of only these new empty tables after backup.
CREATE TABLE IF NOT EXISTS weekly_class_flags (
 class_level text PRIMARY KEY,
 enabled boolean NOT NULL DEFAULT false,
 pilot_term integer CHECK (pilot_term BETWEEN 1 AND 3),
 pilot_week integer CHECK (pilot_week BETWEEN 1 AND 16),
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_curriculum_objectives (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 class_level text NOT NULL,
 subject_name text NOT NULL,
 term integer NOT NULL CHECK (term BETWEEN 1 AND 3),
 week_number integer NOT NULL CHECK (week_number BETWEEN 1 AND 16),
 curriculum_topic_id text,
 topic_title text NOT NULL,
 objective_text text NOT NULL,
 source_reference text NOT NULL,
 approval_status text NOT NULL DEFAULT 'DRAFT' CHECK (approval_status IN ('DRAFT','REVIEWED','APPROVED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(class_level,subject_name,term,week_number,objective_text)
);
CREATE TABLE IF NOT EXISTS weekly_items (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 objective_id uuid REFERENCES weekly_curriculum_objectives(id) ON DELETE RESTRICT,
 prompt text NOT NULL,
 item_type text NOT NULL CHECK (item_type IN ('MCQ','FILL_IN','SHORT_ANSWER','SENTENCE_CONSTRUCTION')),
 options jsonb,
 answer_key jsonb,
 explanation text,
 difficulty text NOT NULL CHECK (difficulty IN ('RECALL','APPLICATION','ANALYSIS')),
 source text NOT NULL CHECK (source IN ('CURRICULUM_BANK','STUDENT_UPLOAD','TEACHER')),
 source_ref text,
 status text NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','IN_REVIEW','APPROVED','RETIRED')),
 reviewer_id uuid REFERENCES users(id) ON DELETE SET NULL,
 reviewed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT weekly_item_approval_gate CHECK(status <> 'APPROVED' OR (objective_id IS NOT NULL AND answer_key IS NOT NULL AND reviewer_id IS NOT NULL AND reviewed_at IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS weekly_item_stats (
 item_id uuid PRIMARY KEY REFERENCES weekly_items(id) ON DELETE CASCADE,
 times_served integer NOT NULL DEFAULT 0 CHECK(times_served >= 0),
 times_correct integer NOT NULL DEFAULT 0 CHECK(times_correct >= 0),
 flagged boolean NOT NULL DEFAULT false,
 CHECK(times_correct <= times_served)
);
CREATE TABLE IF NOT EXISTS weekly_student_item_schedule (
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE CASCADE,
 due_date date NOT NULL,
 interval_days integer NOT NULL DEFAULT 2 CHECK(interval_days >= 1),
 streak integer NOT NULL DEFAULT 0 CHECK(streak >= 0),
 last_result boolean,
 last_served_at timestamptz,
 PRIMARY KEY(student_id,item_id)
);
CREATE INDEX IF NOT EXISTS weekly_revisit_due_idx ON weekly_student_item_schedule(student_id,due_date);
CREATE TABLE IF NOT EXISTS weekly_upload_links (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 assignment_id uuid NOT NULL UNIQUE REFERENCES uploaded_assignments(id) ON DELETE CASCADE,
 week_number integer CHECK(week_number BETWEEN 1 AND 16),
 objective_id uuid REFERENCES weekly_curriculum_objectives(id) ON DELETE SET NULL,
 extraction_status text NOT NULL DEFAULT 'PENDING' CHECK(extraction_status IN ('PENDING','EXTRACTING','IN_REVIEW','APPROVED','FAILED')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_exams (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 class_level text NOT NULL,
 subject_name text NOT NULL,
 term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 week_number integer NOT NULL CHECK(week_number BETWEEN 1 AND 16),
 blueprint jsonb NOT NULL DEFAULT '{"current":50,"previous":25,"uploads":25}'::jsonb,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','REVIEWED','SCHEDULED','CLOSED','CANCELLED')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_exam_items (
 exam_id uuid NOT NULL REFERENCES weekly_exams(id) ON DELETE CASCADE,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 PRIMARY KEY(exam_id,item_id)
);
CREATE TABLE IF NOT EXISTS weekly_exam_schedules (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 exam_id uuid NOT NULL REFERENCES weekly_exams(id) ON DELETE CASCADE,
 scope_type text NOT NULL CHECK(scope_type IN ('CLASS','GROUP','STUDENTS')),
 scope_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
 starts_at timestamptz NOT NULL,
 duration_seconds integer NOT NULL CHECK(duration_seconds BETWEEN 60 AND 21600),
 closes_at timestamptz NOT NULL,
 late_entry_rule text NOT NULL DEFAULT 'UNTIL_CLOSE' CHECK(late_entry_rule IN ('NO_LATE_ENTRY','UNTIL_CLOSE')),
 status text NOT NULL DEFAULT 'SCHEDULED' CHECK(status IN ('SCHEDULED','LIVE','CLOSED','CANCELLED')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(closes_at > starts_at)
);
CREATE TABLE IF NOT EXISTS weekly_exam_attempts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 exam_id uuid NOT NULL REFERENCES weekly_exams(id) ON DELETE CASCADE,
 schedule_id uuid REFERENCES weekly_exam_schedules(id) ON DELETE SET NULL,
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 attempt_type text NOT NULL CHECK(attempt_type IN ('OFFICIAL','REVISIT')),
 started_at timestamptz NOT NULL DEFAULT now(),
 submitted_at timestamptz,
 score numeric,
 UNIQUE(exam_id,student_id,attempt_type)
);
CREATE TABLE IF NOT EXISTS weekly_attempt_answers (
 attempt_id uuid NOT NULL REFERENCES weekly_exam_attempts(id) ON DELETE CASCADE,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 objective_id uuid NOT NULL REFERENCES weekly_curriculum_objectives(id) ON DELETE RESTRICT,
 answer jsonb,
 is_correct boolean,
 saved_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(attempt_id,item_id)
);
CREATE TABLE IF NOT EXISTS weekly_exam_revisits (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 exam_id uuid NOT NULL REFERENCES weekly_exams(id) ON DELETE CASCADE,
 schedule_id uuid REFERENCES weekly_exam_schedules(id) ON DELETE SET NULL,
 opens_at timestamptz NOT NULL,
 scope_type text NOT NULL CHECK(scope_type IN ('CLASS','GROUP','STUDENTS')),
 scope_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
 status text NOT NULL DEFAULT 'SCHEDULED' CHECK(status IN ('SCHEDULED','OPEN','CLOSED','CANCELLED'))
);
CREATE TABLE IF NOT EXISTS weekly_notifications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 recipient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 notification_type text NOT NULL,
 channel text NOT NULL CHECK(channel IN ('IN_APP','PUSH','EMAIL','SMS')),
 title text NOT NULL,
 body text NOT NULL,
 entity_ref text,
 sent_at timestamptz,
 delivered_at timestamptz,
 opened_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_student_photos (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 storage_path text,
 status text NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','APPROVED','REJECTED')),
 consent_flag boolean NOT NULL DEFAULT false,
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_at timestamptz,
 CHECK(status <> 'APPROVED' OR (consent_flag AND storage_path IS NOT NULL AND approved_by IS NOT NULL))
);
-- Existing study_rooms/posts/reports are intentionally reused for moderated educational chat.
