-- Phase 2: preserve unmapped content for teacher review; never serve it.
CREATE TABLE IF NOT EXISTS weekly_unmapped_content_queue(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 class_level text NOT NULL,subject_name text NOT NULL,
 term integer CHECK(term BETWEEN 1 AND 3),week_number integer CHECK(week_number BETWEEN 1 AND 16),
 source_type text NOT NULL CHECK(source_type IN ('CURRICULUM_IMPORT','ITEM','EXAM_ITEM','UPLOAD')),
 source_reference text NOT NULL,raw_content jsonb NOT NULL,
 reason text NOT NULL,status text NOT NULL DEFAULT 'PENDING'
 CHECK(status IN ('PENDING','MAPPED','REJECTED')),
 objective_id uuid REFERENCES weekly_curriculum_objectives(id) ON DELETE SET NULL,
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 reviewed_at timestamptz,created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(status<>'MAPPED' OR (objective_id IS NOT NULL AND reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS weekly_unmapped_review_idx ON weekly_unmapped_content_queue(status,class_level,created_at);
