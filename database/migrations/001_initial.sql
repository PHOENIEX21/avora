CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('STUDENT','PARENT','TEACHER','ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE question_type AS ENUM ('MULTIPLE_CHOICE','SHORT_ANSWER','ORDER_STEPS','FILL_GAP','ERROR_SPOT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE question_status AS ENUM ('DRAFT','REVIEW','PUBLISHED','RETIRED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE source_type AS ENUM ('AVORA_ORIGINAL','LICENSED','OPEN_RESOURCE','OFFICIAL','REFERENCE_ONLY');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_level text NOT NULL DEFAULT 'JSS3',
  target_exam text DEFAULT 'BECE',
  diagnostic_completed boolean NOT NULL DEFAULT false,
  current_streak integer NOT NULL DEFAULT 0,
  xp integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  stage text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(subject_id, slug)
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  description text,
  mastery_threshold numeric(4,3) NOT NULL DEFAULT 0.80,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(topic_id, slug)
);

CREATE TABLE IF NOT EXISTS learning_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text,
  source_type source_type NOT NULL,
  license_notes text,
  permitted_to_reproduce boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  source_id uuid REFERENCES learning_sources(id) ON DELETE SET NULL,
  source_type source_type NOT NULL DEFAULT 'AVORA_ORIGINAL',
  exam_name text,
  exam_year integer,
  prompt text NOT NULL,
  question_type question_type NOT NULL,
  options jsonb,
  correct_answer jsonb NOT NULL,
  explanation text NOT NULL,
  misconception_tags text[] NOT NULL DEFAULT '{}',
  difficulty integer NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  status question_status NOT NULL DEFAULT 'DRAFT',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer jsonb NOT NULL,
  is_correct boolean NOT NULL,
  response_ms integer,
  diagnosis text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mastery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  score numeric(5,4) NOT NULL DEFAULT 0,
  evidence_count integer NOT NULL DEFAULT 0,
  last_practiced_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_questions_skill ON questions(skill_id, status);
CREATE INDEX IF NOT EXISTS idx_attempts_student_created ON attempts(student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mastery_student ON mastery(student_id);
