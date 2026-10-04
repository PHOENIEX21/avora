-- AVORA assignment review memory: preserve converted school work for later revision.
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS last_resurfaced_at timestamptz;
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS resurfaced_count integer NOT NULL DEFAULT 0;
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS next_review_at timestamptz;
ALTER TABLE assignment_questions ADD COLUMN IF NOT EXISTS active_for_review boolean NOT NULL DEFAULT true;
CREATE INDEX IF NOT EXISTS idx_assignment_questions_review_due ON assignment_questions(active_for_review,next_review_at,classification_confidence);
