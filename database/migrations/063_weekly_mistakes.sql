-- Missing remediation state; original questions/answers remain in existing CBT tables.
CREATE TABLE IF NOT EXISTS weekly_mistakes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 objective_id uuid NOT NULL REFERENCES weekly_curriculum_objectives(id) ON DELETE RESTRICT,
 wrong_session_id uuid NOT NULL REFERENCES weekly_cbt_sessions(id) ON DELETE RESTRICT,
 followup_item_id uuid REFERENCES weekly_items(id) ON DELETE RESTRICT,
 first_correct_at timestamptz,
 first_correct_session_id uuid REFERENCES weekly_cbt_sessions(id) ON DELETE RESTRICT,
 confirm_due_on date,
 fixed_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(student_id,item_id),
 CHECK(followup_item_id IS NULL OR followup_item_id<>item_id),
 CHECK(fixed_at IS NULL OR (first_correct_at IS NOT NULL AND confirm_due_on IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS weekly_mistakes_student_followup ON weekly_mistakes(student_id,followup_item_id);
