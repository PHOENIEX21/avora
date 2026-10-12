-- Extend the existing weekly CBT model; no old rows or tables are removed.
ALTER TABLE weekly_cbt_sessions ADD COLUMN IF NOT EXISTS objective_id uuid
 REFERENCES weekly_curriculum_objectives(id) ON DELETE RESTRICT;
ALTER TABLE weekly_cbt_sessions ADD COLUMN IF NOT EXISTS item_snapshot jsonb;
DO $constraint$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_constraint WHERE conrelid='weekly_cbt_sessions'::regclass
  AND conname='weekly_cbt_objective_practice_snapshot') THEN
  ALTER TABLE weekly_cbt_sessions ADD CONSTRAINT weekly_cbt_objective_practice_snapshot
  CHECK(objective_id IS NULL OR (source='DAILY_LESSON' AND mode='PRACTICE'
   AND item_snapshot IS NOT NULL AND jsonb_typeof(item_snapshot)='array'
   AND jsonb_array_length(item_snapshot) BETWEEN 1 AND 5
   AND cardinality(question_ids)=jsonb_array_length(item_snapshot)));
 END IF;
END $constraint$;
CREATE UNIQUE INDEX IF NOT EXISTS weekly_cbt_one_open_objective_practice
 ON weekly_cbt_sessions(student_id,objective_id) WHERE submitted_at IS NULL AND objective_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS weekly_cbt_student_objective
 ON weekly_cbt_sessions(student_id,objective_id,submitted_at);
CREATE TABLE IF NOT EXISTS weekly_cbt_answers (
 session_id uuid NOT NULL REFERENCES weekly_cbt_sessions(id) ON DELETE RESTRICT,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 answer text NOT NULL,
 confidence text CHECK(confidence IN ('GUESS','FAIRLY_SURE','SURE')),
 is_correct boolean NOT NULL,
 answered_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(session_id,item_id)
);
