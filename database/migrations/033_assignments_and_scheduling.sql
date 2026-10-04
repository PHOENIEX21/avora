-- AVORA V15 assignment conversion, scheduling and topic mastery foundation.
-- Extends the existing users/question/exam/rubric infrastructure; does not create a second exam engine.

CREATE TABLE IF NOT EXISTS term_topic_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_level text NOT NULL CHECK (class_level IN ('JSS1','JSS2','JSS3')),
  subject_name text NOT NULL,
  term integer NOT NULL CHECK (term BETWEEN 1 AND 3),
  week_number integer NOT NULL CHECK (week_number BETWEEN 1 AND 20),
  curriculum_topic_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(class_level,subject_name,term,week_number)
);
CREATE INDEX IF NOT EXISTS idx_term_topic_schedule_lookup ON term_topic_schedule(class_level,subject_name,term,week_number);

CREATE TABLE IF NOT EXISTS student_topic_mastery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  curriculum_topic_id text NOT NULL,
  status text NOT NULL DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED','IN_PROGRESS','MASTERED','STRUGGLING')),
  first_attempted_at timestamptz,
  mastered_at timestamptz,
  attempts_count integer NOT NULL DEFAULT 0 CHECK (attempts_count >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id,curriculum_topic_id)
);
CREATE INDEX IF NOT EXISTS idx_student_topic_mastery_status ON student_topic_mastery(student_id,status,updated_at DESC);

CREATE TABLE IF NOT EXISTS uploaded_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type text NOT NULL CHECK (source_type IN ('TYPED','FILE','IMAGE')),
  raw_content_url text,
  raw_text text,
  label text,
  class_level text NOT NULL CHECK (class_level IN ('JSS1','JSS2','JSS3')),
  subject_name text,
  status text NOT NULL DEFAULT 'UPLOADED' CHECK (status IN ('UPLOADED','EXTRACTING','EXTRACTED','CONVERTED','FAILED')),
  extraction_error text,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (source_type <> 'TYPED' OR raw_text IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_uploaded_assignments_student ON uploaded_assignments(student_id,uploaded_at DESC);

CREATE TABLE IF NOT EXISTS assignment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES uploaded_assignments(id) ON DELETE CASCADE,
  original_text text NOT NULL,
  curriculum_topic_id text,
  classification_confidence text NOT NULL DEFAULT 'UNCLASSIFIED'
    CHECK (classification_confidence IN ('HIGH','MEDIUM','LOW','UNCLASSIFIED')),
  question_type text NOT NULL CHECK (question_type IN ('MULTIPLE_CHOICE','THEORY')),
  options jsonb,
  correct_answer text,
  rubric jsonb,
  max_marks integer CHECK (max_marks IS NULL OR max_marks > 0),
  model_solution text NOT NULL,
  needs_confirmation boolean NOT NULL DEFAULT true,
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (question_type='MULTIPLE_CHOICE' AND options IS NOT NULL AND correct_answer IS NOT NULL)
    OR
    (question_type='THEORY' AND rubric IS NOT NULL AND max_marks IS NOT NULL)
  )
);
CREATE INDEX IF NOT EXISTS idx_assignment_questions_assignment ON assignment_questions(assignment_id,created_at);
CREATE INDEX IF NOT EXISTS idx_assignment_questions_topic ON assignment_questions(curriculum_topic_id,classification_confidence);

CREATE TABLE IF NOT EXISTS assignment_question_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_question_id uuid NOT NULL REFERENCES assignment_questions(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submitted_answer text NOT NULL,
  score numeric(7,4) CHECK (score IS NULL OR (score >= 0 AND score <= 1)),
  rubric_feedback jsonb,
  attempted_at timestamptz NOT NULL DEFAULT now(),
  is_resurfaced_review boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_assignment_attempts_student ON assignment_question_attempts(student_id,attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_assignment_attempts_question ON assignment_question_attempts(assignment_question_id,student_id,attempted_at DESC);
