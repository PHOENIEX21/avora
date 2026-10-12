-- Add provenance without inventing review history for existing words.
ALTER TABLE weekly_vocabulary_words
 ADD COLUMN IF NOT EXISTS source_reference text,
 ADD COLUMN IF NOT EXISTS imported_by uuid REFERENCES users(id) ON DELETE SET NULL,
 ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
 ADD COLUMN IF NOT EXISTS review_note text,
 ADD COLUMN IF NOT EXISTS revision integer NOT NULL DEFAULT 1,
 ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
CREATE INDEX IF NOT EXISTS weekly_vocabulary_class_status_idx
 ON weekly_vocabulary_words(class_level,status,created_at,id);
