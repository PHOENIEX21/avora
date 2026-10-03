-- Permanent learner notes and durable image metadata.
CREATE TABLE IF NOT EXISTS learner_notes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title text NOT NULL,
 body text NOT NULL DEFAULT '',
 class_level text NOT NULL CHECK(class_level IN ('JSS1','JSS2','JSS3')),
 subject_name text NOT NULL,
 curriculum_topic_id text,
 source_kind text NOT NULL DEFAULT 'PERSONAL_NOTE' CHECK(source_kind IN ('PERSONAL_NOTE','CLASS_NOTE')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_learner_notes_student ON learner_notes(student_id,updated_at DESC);
CREATE TABLE IF NOT EXISTS learner_note_images (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 note_id uuid NOT NULL REFERENCES learner_notes(id) ON DELETE CASCADE,
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 storage_key text NOT NULL UNIQUE,
 original_name text NOT NULL,
 mime_type text NOT NULL CHECK(mime_type IN ('image/jpeg','image/png','image/webp')),
 byte_size integer NOT NULL CHECK(byte_size>0 AND byte_size<=8388608),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_learner_note_images_note ON learner_note_images(note_id,created_at);
