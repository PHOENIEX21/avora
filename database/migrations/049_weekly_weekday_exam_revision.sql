-- Phase 1b: Monday-Friday objectives, Saturday official exam, selectable next-week revision.
-- Additive migration; no changes to existing learner records or chat.
ALTER TABLE weekly_curriculum_objectives
 ADD COLUMN IF NOT EXISTS day_index integer CHECK(day_index BETWEEN 1 AND 5);
-- Existing draft objectives remain unassigned until curriculum review assigns Monday-Friday.
CREATE INDEX IF NOT EXISTS weekly_objectives_day_idx
 ON weekly_curriculum_objectives(class_level,term,week_number,day_index,subject_name)
 WHERE approval_status='APPROVED';

ALTER TABLE weekly_exam_schedules
 ADD COLUMN IF NOT EXISTS schedule_kind text NOT NULL DEFAULT 'OFFICIAL'
 CHECK(schedule_kind IN ('OFFICIAL','REVISION'));
-- Date is calculated in the configured local academic timezone, not server UTC.
ALTER TABLE weekly_exam_schedules
 ADD COLUMN IF NOT EXISTS academic_timezone text NOT NULL DEFAULT 'Africa/Lagos';

ALTER TABLE weekly_exam_revisits
 ADD COLUMN IF NOT EXISTS revision_date date;
ALTER TABLE weekly_exam_revisits
 ADD COLUMN IF NOT EXISTS academic_timezone text NOT NULL DEFAULT 'Africa/Lagos';
ALTER TABLE weekly_exam_revisits
 ADD COLUMN IF NOT EXISTS selected_by uuid REFERENCES users(id) ON DELETE SET NULL;

-- Every exam can have one official Saturday sitting; revisions are separate and do not replace it.
CREATE UNIQUE INDEX IF NOT EXISTS weekly_one_official_exam_sitting
 ON weekly_exam_schedules(exam_id) WHERE schedule_kind='OFFICIAL' AND status<>'CANCELLED';

-- An approved objective must be allocated to a weekday. Legacy drafts remain untouched.
ALTER TABLE weekly_curriculum_objectives
 ADD CONSTRAINT weekly_approved_objective_requires_weekday
 CHECK(approval_status<>'APPROVED' OR day_index BETWEEN 1 AND 5);

-- Validate the official exam weekday and next-week revision day using the exam's
-- academic timezone. Revision must be within Monday-Sunday immediately after the exam Saturday.
CREATE OR REPLACE FUNCTION weekly_validate_exam_timing() RETURNS trigger
 LANGUAGE plpgsql AS $$
 DECLARE official_date date; exam_day date; base_exam uuid;
 BEGIN
  IF TG_TABLE_NAME='weekly_exam_schedules' THEN
   IF NEW.schedule_kind='OFFICIAL' AND EXTRACT(ISODOW FROM (NEW.starts_at AT TIME ZONE NEW.academic_timezone))<>6 THEN
    RAISE EXCEPTION 'Official weekly exams must be scheduled on Saturday in the academic timezone';
   END IF;
   RETURN NEW;
  END IF;
  IF TG_TABLE_NAME='weekly_exam_revisits' THEN
   SELECT es.exam_id, (es.starts_at AT TIME ZONE es.academic_timezone)::date
    INTO base_exam, official_date FROM weekly_exam_schedules es
    WHERE es.id=NEW.schedule_id AND es.schedule_kind='OFFICIAL' AND es.status<>'CANCELLED';
   IF official_date IS NULL OR base_exam<>NEW.exam_id THEN
    RAISE EXCEPTION 'Revision must reference the matching official Saturday exam schedule';
   END IF;
   exam_day:=COALESCE(NEW.revision_date,(NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date);
   IF exam_day < official_date+2 OR exam_day > official_date+8 THEN
    RAISE EXCEPTION 'Exam revision must occur Monday through Sunday of the following week';
   END IF;
   IF (NEW.opens_at AT TIME ZONE NEW.academic_timezone)::date<>exam_day THEN
    RAISE EXCEPTION 'Revision date must match its scheduled opening date';
   END IF;
   NEW.revision_date:=exam_day;
   RETURN NEW;
  END IF;
  RETURN NEW;
 END $$;
DROP TRIGGER IF EXISTS weekly_official_exam_day_guard ON weekly_exam_schedules;
CREATE TRIGGER weekly_official_exam_day_guard BEFORE INSERT OR UPDATE ON weekly_exam_schedules
 FOR EACH ROW EXECUTE FUNCTION weekly_validate_exam_timing();
DROP TRIGGER IF EXISTS weekly_revision_week_guard ON weekly_exam_revisits;
CREATE TRIGGER weekly_revision_week_guard BEFORE INSERT OR UPDATE ON weekly_exam_revisits
 FOR EACH ROW EXECUTE FUNCTION weekly_validate_exam_timing();
