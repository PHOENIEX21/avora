-- AVORA isolated integration branch only: br-blue-scene-ayydvo7l
-- Run in Neon SQL Editor ONLY after selecting the isolated branch, never production.
-- Preflight verified 2026-10-12: zero objectives and zero items.
-- This replaces two obsolete status checks; does not delete rows or tables.
BEGIN;
ALTER TABLE public.weekly_curriculum_objectives
 DROP CONSTRAINT weekly_curriculum_objectives_approval_status_check;
ALTER TABLE public.weekly_curriculum_objectives
 ADD CONSTRAINT weekly_curriculum_objectives_approval_status_check
 CHECK (approval_status IN ('DRAFT','IN_REVIEW','REVIEWED','APPROVED','PUBLISHED','RETIRED'));
ALTER TABLE public.weekly_items
 DROP CONSTRAINT weekly_items_status_check;
ALTER TABLE public.weekly_items
 ADD CONSTRAINT weekly_items_status_check
 CHECK (status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED'));
COMMIT;
-- Verify:
SELECT conrelid::regclass::text AS table_name,conname,pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conname IN ('weekly_curriculum_objectives_approval_status_check','weekly_items_status_check')
ORDER BY table_name;
