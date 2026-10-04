-- AVORA V10.9.0: two-class Common Entrance preparation identity and evidence metadata.
-- Primary 5 = foundation toward NCEE; Primary 6 = exam-year NCEE preparation.
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS prep_track text;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS prep_started_at timestamptz;
UPDATE student_profiles
SET prep_track='NCEE', prep_started_at=COALESCE(prep_started_at,now())
WHERE class_level IN ('Primary 5','Primary 6') AND COALESCE(prep_track,'')<> 'NCEE';

-- NCEE practice questions may use all six tested domains while retaining their learner class.
CREATE INDEX IF NOT EXISTS idx_questions_ncee_class_domain
 ON questions(class_level,exam_name,exam_topic,status)
 WHERE exam_name='NCEE';
