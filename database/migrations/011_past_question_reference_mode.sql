-- AVORA V8.3: reference-safe past-question practice and source provenance.
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS past_year integer;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS source_key text;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS reference_exam_year integer;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS reference_source_key text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS reference_note text;

ALTER TABLE exam_year_registry ADD COLUMN IF NOT EXISTS jurisdiction text NOT NULL DEFAULT 'Nigeria';
ALTER TABLE exam_year_registry ADD COLUMN IF NOT EXISTS paper_kind text;
ALTER TABLE exam_year_registry ADD COLUMN IF NOT EXISTS source_label text;
ALTER TABLE exam_year_registry ADD COLUMN IF NOT EXISTS source_url text;
ALTER TABLE exam_year_registry ADD COLUMN IF NOT EXISTS direct_reproduction_allowed boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_exam_year_registry_mode
  ON exam_year_registry(exam_name, subject_name, exam_year DESC, availability_status);
