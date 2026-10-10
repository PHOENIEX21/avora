-- AVORA Academic Core v1
-- Adds the daily curriculum, learner task, notification and moderated study-room
-- foundations without altering the existing lesson/question/assignment banks.

CREATE TABLE IF NOT EXISTS academic_daily_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id uuid NOT NULL REFERENCES term_topic_schedule(id) ON DELETE CASCADE,
  day_index integer NOT NULL CHECK (day_index BETWEEN 1 AND 7),
  title text NOT NULL,
  objective_text text NOT NULL,
  lesson_anchor text,
  question_target integer NOT NULL DEFAULT 10 CHECK (question_target BETWEEN 1 AND 50),
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','REVIEWED','LIVE','ARCHIVED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(schedule_id,day_index,sort_order)
);
CREATE INDEX IF NOT EXISTS academic_daily_objectives_schedule_idx ON academic_daily_objectives(schedule_id,day_index,sort_order);

CREATE TABLE IF NOT EXISTS learner_daily_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  objective_id uuid NOT NULL REFERENCES academic_daily_objectives(id) ON DELETE CASCADE,
  task_kind text NOT NULL CHECK (task_kind IN ('STUDY','DAILY_CHECK','REVISION','SCHOOL_WORK','WEEKLY_EXAM')),
  available_at timestamptz NOT NULL,
  due_at timestamptz,
  status text NOT NULL DEFAULT 'TODO' CHECK (status IN ('TODO','IN_PROGRESS','COMPLETED','MISSED','EXCUSED')),
  started_at timestamptz,
  completed_at timestamptz,
  result_ref text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id,objective_id,task_kind)
);
CREATE INDEX IF NOT EXISTS learner_daily_tasks_student_time_idx ON learner_daily_tasks(student_id,available_at DESC);

CREATE TABLE IF NOT EXISTS student_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('DAILY_READY','ASSIGNMENT_APPROVED','EXAM_REMINDER','MISSED_WORK','COMMUNITY_REPLY','ADMIN_ANNOUNCEMENT','WEEKLY_REPORT')),
  title text NOT NULL,
  body text NOT NULL,
  href text,
  entity_key text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS student_notifications_student_created_idx ON student_notifications(student_id,created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS student_notifications_entity_once_idx ON student_notifications(student_id,kind,entity_key) WHERE entity_key IS NOT NULL;

CREATE TABLE IF NOT EXISTS study_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_level text NOT NULL,
  subject_name text NOT NULL,
  curriculum_topic_id text,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','READ_ONLY','ARCHIVED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(class_level,subject_name,curriculum_topic_id)
);

CREATE TABLE IF NOT EXISTS study_room_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_post_id uuid REFERENCES study_room_posts(id) ON DELETE CASCADE,
  post_type text NOT NULL DEFAULT 'QUESTION' CHECK (post_type IN ('QUESTION','ANSWER','WORKING','ANNOUNCEMENT')),
  body text NOT NULL,
  attachment_url text,
  solved_at timestamptz,
  status text NOT NULL DEFAULT 'VISIBLE' CHECK (status IN ('VISIBLE','PENDING_REVIEW','HIDDEN','REMOVED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS study_room_posts_room_created_idx ON study_room_posts(room_id,created_at DESC);
CREATE INDEX IF NOT EXISTS study_room_posts_parent_idx ON study_room_posts(parent_post_id,created_at);

CREATE TABLE IF NOT EXISTS study_room_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES study_room_posts(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','REVIEWED','DISMISSED','ACTIONED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  UNIQUE(post_id,reporter_id)
);

ALTER TABLE uploaded_assignments ADD COLUMN IF NOT EXISTS submitted_for text NOT NULL DEFAULT 'SCHOOL_WORK';
ALTER TABLE uploaded_assignments ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE uploaded_assignments ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE uploaded_assignments ADD COLUMN IF NOT EXISTS solution_ready_at timestamptz;
CREATE INDEX IF NOT EXISTS uploaded_assignments_student_time_idx ON uploaded_assignments(student_id,uploaded_at DESC);
