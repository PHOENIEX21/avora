-- Additive attempt integrity; legacy results are not resynchronized automatically.
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS weekly_paper_snapshot jsonb;
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS weekly_outcome_sync_state text NOT NULL DEFAULT 'LEGACY';
ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS weekly_outcome_synced_at timestamptz;
DO $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conname='weekly_exam_snapshot_array' AND conrelid='exam_sessions'::regclass) THEN
  ALTER TABLE exam_sessions ADD CONSTRAINT weekly_exam_snapshot_array CHECK(weekly_paper_snapshot IS NULL OR jsonb_typeof(weekly_paper_snapshot)='array');
 END IF;
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conname='weekly_exam_outcome_sync_state' AND conrelid='exam_sessions'::regclass) THEN
  ALTER TABLE exam_sessions ADD CONSTRAINT weekly_exam_outcome_sync_state CHECK(weekly_outcome_sync_state IN ('LEGACY','PENDING','SYNCED'));
 END IF;
END $$;
CREATE INDEX IF NOT EXISTS weekly_exam_pending_outcomes ON exam_sessions(weekly_exam_blueprint_id) WHERE weekly_outcome_sync_state='PENDING' AND status='COMPLETED';
