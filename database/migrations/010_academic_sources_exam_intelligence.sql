-- AVORA V8.1: academic provenance, year-by-year exam intelligence and review-quality solutions.
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS provider text;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS class_level text;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS subject_name text;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS exam_name text;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS exam_year integer;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS rights_status text NOT NULL DEFAULT 'REFERENCE_ONLY';
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS attribution_text text;
ALTER TABLE learning_sources ADD COLUMN IF NOT EXISTS verified_at timestamptz;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS solution_steps jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS wrong_answer_reasoning text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS micro_skill text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS rights_status text NOT NULL DEFAULT 'AVORA_OWNED';

CREATE TABLE IF NOT EXISTS academic_source_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_key text UNIQUE NOT NULL,
  source_kind text NOT NULL CHECK(source_kind IN ('CURRICULUM','OPEN_TEXTBOOK','PAST_PAPER_ARCHIVE','OFFICIAL_PAPER','REFERENCE')),
  provider text NOT NULL,
  title text NOT NULL,
  subject_name text,
  class_level text,
  exam_name text,
  year_from integer,
  year_to integer,
  url text,
  rights_status text NOT NULL CHECK(rights_status IN ('CC_BY','LICENSED','PUBLICLY_PERMITTED','REFERENCE_ONLY','AVORA_OWNED')),
  may_adapt boolean NOT NULL DEFAULT false,
  may_reproduce boolean NOT NULL DEFAULT false,
  attribution_required boolean NOT NULL DEFAULT false,
  attribution_text text,
  notes text,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exam_year_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_name text NOT NULL,
  exam_year integer NOT NULL,
  subject_name text NOT NULL,
  paper_structure text,
  source_key text REFERENCES academic_source_registry(source_key) ON DELETE SET NULL,
  availability_status text NOT NULL DEFAULT 'REFERENCE_FOUND' CHECK(availability_status IN ('REFERENCE_FOUND','VERIFIED','LICENSED_FOR_BANK','INGESTED')),
  rights_status text NOT NULL DEFAULT 'REFERENCE_ONLY',
  questions_available boolean NOT NULL DEFAULT false,
  solutions_available boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(exam_name,exam_year,subject_name)
);
CREATE INDEX IF NOT EXISTS idx_exam_year_registry_lookup ON exam_year_registry(exam_name,subject_name,exam_year DESC);
