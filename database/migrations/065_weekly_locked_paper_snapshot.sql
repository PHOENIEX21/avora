-- Owner-sealed paper content; no automatic conversion or publication of older versions.
ALTER TABLE weekly_exam_versions ADD COLUMN IF NOT EXISTS paper_snapshot jsonb;
DO $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conname='weekly_locked_paper_array' AND conrelid='weekly_exam_versions'::regclass) THEN
  ALTER TABLE weekly_exam_versions ADD CONSTRAINT weekly_locked_paper_array CHECK(paper_snapshot IS NULL OR
   (jsonb_typeof(paper_snapshot)='array' AND jsonb_array_length(paper_snapshot) BETWEEN 5 AND 100));
 END IF;
END $$;
