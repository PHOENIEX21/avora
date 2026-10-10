CREATE TABLE IF NOT EXISTS learner_objective_mastery (
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 objective_id uuid NOT NULL REFERENCES academic_daily_objectives(id) ON DELETE CASCADE,
 evidence_count integer NOT NULL DEFAULT 0,
 earned_fraction numeric NOT NULL DEFAULT 0,
 mastery_score numeric NOT NULL DEFAULT 0 CHECK(mastery_score>=0 AND mastery_score<=1),
 status text NOT NULL DEFAULT 'STARTING',
 last_weekly_session_id uuid REFERENCES exam_sessions(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(student_id,objective_id)
);
CREATE INDEX IF NOT EXISTS learner_objective_mastery_status_idx ON learner_objective_mastery(student_id,status,updated_at DESC);