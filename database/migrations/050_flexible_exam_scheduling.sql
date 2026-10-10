-- Weekly scheduling correction: Saturday is the default, not a restriction.
-- Supports class, group and individual make-up exams at any date/time.
-- Keep the original 049 migration immutable; apply this forward-only correction.
DROP TRIGGER IF EXISTS weekly_official_exam_day_guard ON weekly_exam_schedules;
DROP TRIGGER IF EXISTS weekly_revision_week_guard ON weekly_exam_revisits;
DROP INDEX IF EXISTS weekly_one_official_exam_sitting;

ALTER TABLE weekly_exam_schedules
 ADD COLUMN IF NOT EXISTS is_override boolean NOT NULL DEFAULT false;
ALTER TABLE weekly_exam_schedules
 ADD COLUMN IF NOT EXISTS change_reason text;
ALTER TABLE weekly_exam_schedules
 ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Exactly one active class-wide default schedule, with additional group/student overrides.
CREATE UNIQUE INDEX IF NOT EXISTS weekly_one_class_official_schedule
 ON weekly_exam_schedules(exam_id) WHERE schedule_kind='OFFICIAL' AND scope_type='CLASS' AND status<>'CANCELLED' AND NOT is_override;

-- The revision date is flexible; it must follow the close of its referenced official exam.
CREATE OR REPLACE FUNCTION weekly_validate_exam_timing() RETURNS trigger LANGUAGE plpgsql AS $$
 DECLARE official_close timestamptz; base_exam uuid;
 BEGIN
  IF TG_TABLE_NAME='weekly_exam_revisits' THEN
   SELECT es.exam_id, es.closes_at INTO base_exam,official_close
   FROM weekly_exam_schedules es
   WHERE es.id=NEW.schedule_id AND es.schedule_kind='OFFICIAL' AND es.status<>'CANCELLED';
   IF official_close IS NULL OR base_exam IS DISTINCT FROM NEW.exam_id THEN
    RAISE EXCEPTION 'Revision must reference a matching official exam schedule';
   END IF;
   IF NEW.opens_at < official_close THEN
    RAISE EXCEPTION 'Revision must open after the official exam window closes';
   END IF;
   IF NEW.revision_date IS NOT NULL AND
      NEW.revision_date<>(NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date THEN
    RAISE EXCEPTION 'Revision date must match the scheduled opening date';
   END IF;
   NEW.revision_date:=(NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date;
  END IF;
  RETURN NEW;
 END $$;
CREATE TRIGGER weekly_revision_week_guard BEFORE INSERT OR UPDATE ON weekly_exam_revisits
 FOR EACH ROW EXECUTE FUNCTION weekly_validate_exam_timing();

-- Scheduling events are retained for audit and notification fan-out.
CREATE TABLE IF NOT EXISTS weekly_exam_schedule_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 schedule_id uuid NOT NULL REFERENCES weekly_exam_schedules(id) ON DELETE CASCADE,
 event_type text NOT NULL CHECK(event_type IN ('CREATED','RESCHEDULED','CANCELLED')),
 old_starts_at timestamptz,
 new_starts_at timestamptz,
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS weekly_exam_schedule_events_idx ON weekly_exam_schedule_events(schedule_id,created_at DESC);
