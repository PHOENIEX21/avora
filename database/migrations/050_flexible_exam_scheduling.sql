-- Forward-only scheduling compatibility update. Preserve all existing tables, triggers and indexes.
-- Class-wide official exam schedule remains in weekly_exam_schedules.
-- Group/student exceptions are stored separately to avoid disturbing the original unique constraint.
CREATE TABLE IF NOT EXISTS weekly_exam_overrides (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 exam_id uuid NOT NULL REFERENCES weekly_exams(id) ON DELETE CASCADE,
 base_schedule_id uuid NOT NULL REFERENCES weekly_exam_schedules(id) ON DELETE CASCADE,
 scope_type text NOT NULL CHECK(scope_type IN ('GROUP','STUDENTS')),
 scope_ids jsonb NOT NULL,
 starts_at timestamptz NOT NULL,
 duration_seconds integer NOT NULL CHECK(duration_seconds BETWEEN 60 AND 21600),
 closes_at timestamptz NOT NULL,
 late_entry_rule text NOT NULL DEFAULT 'UNTIL_CLOSE' CHECK(late_entry_rule IN ('NO_LATE_ENTRY','UNTIL_CLOSE')),
 status text NOT NULL DEFAULT 'SCHEDULED' CHECK(status IN ('SCHEDULED','LIVE','CLOSED','CANCELLED')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(closes_at>starts_at),
 CHECK(jsonb_typeof(scope_ids)='array' AND jsonb_array_length(scope_ids)>0)
);
CREATE INDEX IF NOT EXISTS weekly_exam_overrides_exam_idx ON weekly_exam_overrides(exam_id,status);

CREATE TABLE IF NOT EXISTS weekly_exam_schedule_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 schedule_id uuid REFERENCES weekly_exam_schedules(id) ON DELETE CASCADE,
 override_id uuid REFERENCES weekly_exam_overrides(id) ON DELETE CASCADE,
 event_type text NOT NULL CHECK(event_type IN ('CREATED','RESCHEDULED','CANCELLED')),
 old_starts_at timestamptz,
 new_starts_at timestamptz,
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK ((schedule_id IS NOT NULL) <> (override_id IS NOT NULL))
);
-- Existing 049 triggers reference this function. Replacing its body keeps the trigger
-- installed but allows teacher-selected exam/revision dates.
CREATE OR REPLACE FUNCTION weekly_validate_exam_timing() RETURNS trigger LANGUAGE plpgsql AS $$
 DECLARE official_close timestamptz; base_exam uuid;
 BEGIN
  IF TG_TABLE_NAME='weekly_exam_revisits' THEN
   SELECT es.exam_id,es.closes_at INTO base_exam,official_close
   FROM weekly_exam_schedules es WHERE es.id=NEW.schedule_id
   AND es.schedule_kind='OFFICIAL' AND es.status<>'CANCELLED';
   IF official_close IS NULL OR base_exam IS DISTINCT FROM NEW.exam_id THEN
    RAISE EXCEPTION 'Revision must reference the corresponding official exam';
   END IF;
   IF NEW.opens_at<official_close THEN
    RAISE EXCEPTION 'Revision must begin after the official exam closes';
   END IF;
   IF NEW.revision_date IS NOT NULL AND
      NEW.revision_date<>(NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date THEN
    RAISE EXCEPTION 'Revision date must match the scheduled local date';
   END IF;
   NEW.revision_date:=(NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date;
  END IF;
  RETURN NEW;
 END $$;
