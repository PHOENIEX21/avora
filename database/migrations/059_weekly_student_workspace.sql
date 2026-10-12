-- Additive learner workspace. Existing academic objectives and results stay intact.
CREATE TABLE IF NOT EXISTS weekly_objective_study (
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 objective_id uuid NOT NULL REFERENCES weekly_curriculum_objectives(id) ON DELETE RESTRICT,
 study_source text NOT NULL CHECK (study_source IN ('TEXTBOOK','LESSON')),
 started_at timestamptz NOT NULL DEFAULT now(),
 studied_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(student_id,objective_id)
);
