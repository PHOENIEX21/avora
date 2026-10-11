-- AVORA isolated weekly schema readiness check.
-- Read-only. Run against the selected Neon branch; do not infer readiness from table count.
WITH required_tables(name) AS (
 VALUES ('weekly_class_flags'),('weekly_curriculum_objectives'),('weekly_items'),
 ('weekly_class_week_state'),('weekly_parent_consents'),('weekly_parent_pins'),
 ('weekly_student_baseline_state'),('weekly_baseline_attempts'),
 ('weekly_english_daily_plan'),('weekly_topic_question_sets'),
 ('weekly_moderation_actions'),('weekly_question_reports')
),
missing_tables AS (
 SELECT name FROM required_tables WHERE to_regclass('public.' || name) IS NULL
),
status_constraints AS (
 SELECT c.conrelid::regclass::text AS table_name,c.conname,pg_get_constraintdef(c.oid) AS definition
 FROM pg_constraint c WHERE c.contype='c'
 AND c.conrelid IN (to_regclass('public.weekly_curriculum_objectives'),to_regclass('public.weekly_items'))
 AND c.conname IN ('weekly_curriculum_objectives_approval_status_check','weekly_items_status_check')
)
SELECT
 NOT EXISTS(SELECT 1 FROM missing_tables) AS required_tables_present,
 COALESCE((SELECT definition LIKE '%PUBLISHED%' AND definition LIKE '%IN_REVIEW%'
 FROM status_constraints WHERE conname='weekly_curriculum_objectives_approval_status_check'),false)
 AS objectives_publish_status_ready,
 COALESCE((SELECT definition LIKE '%PUBLISHED%'
 FROM status_constraints WHERE conname='weekly_items_status_check'),false)
 AS item_publish_status_ready,
 COALESCE((SELECT jsonb_agg(name ORDER BY name) FROM missing_tables),'[]'::jsonb) AS missing_tables,
 (SELECT jsonb_agg(jsonb_build_object('table',table_name,'constraint',conname,'definition',definition))
 FROM status_constraints) AS status_constraints;
