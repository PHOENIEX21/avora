-- Additive baseline configuration/snapshots on the existing weekly model.
ALTER TABLE weekly_class_flags ADD COLUMN IF NOT EXISTS baseline_question_ids uuid[] NOT NULL DEFAULT '{}'::uuid[];
ALTER TABLE weekly_class_flags ADD COLUMN IF NOT EXISTS baseline_term integer;
ALTER TABLE weekly_class_flags ADD COLUMN IF NOT EXISTS baseline_reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE weekly_class_flags ADD COLUMN IF NOT EXISTS baseline_reviewed_at timestamptz;
ALTER TABLE weekly_baseline_attempts ADD COLUMN IF NOT EXISTS item_snapshot jsonb;
ALTER TABLE weekly_baseline_attempts ADD COLUMN IF NOT EXISTS result_data jsonb;
DO $constraints$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='weekly_class_flags'::regclass AND conname='weekly_baseline_config_valid') THEN
  ALTER TABLE weekly_class_flags ADD CONSTRAINT weekly_baseline_config_valid
   CHECK((baseline_term IS NULL OR baseline_term BETWEEN 1 AND 3) AND cardinality(baseline_question_ids) IN (0,20));
 END IF;
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='weekly_baseline_attempts'::regclass AND conname='weekly_baseline_snapshot_valid') THEN
  ALTER TABLE weekly_baseline_attempts ADD CONSTRAINT weekly_baseline_snapshot_valid
   CHECK(item_snapshot IS NULL OR (jsonb_typeof(item_snapshot)='array' AND jsonb_array_length(item_snapshot)=20));
 END IF;
END $constraints$;
