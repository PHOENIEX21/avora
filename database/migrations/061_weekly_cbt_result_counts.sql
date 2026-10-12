-- Persist assessment result counts on the existing CBT session atomically.
ALTER TABLE weekly_cbt_sessions ADD COLUMN IF NOT EXISTS correct_count integer;
ALTER TABLE weekly_cbt_sessions ADD COLUMN IF NOT EXISTS total_count integer;
DO $constraint$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='weekly_cbt_sessions'::regclass
  AND conname='weekly_cbt_result_counts_valid') THEN
  ALTER TABLE weekly_cbt_sessions ADD CONSTRAINT weekly_cbt_result_counts_valid
  CHECK((correct_count IS NULL AND total_count IS NULL) OR
   (correct_count IS NOT NULL AND total_count IS NOT NULL AND submitted_at IS NOT NULL
    AND correct_count>=0 AND total_count>0 AND correct_count<=total_count
    AND total_count=cardinality(question_ids)));
 END IF;
END $constraint$;
