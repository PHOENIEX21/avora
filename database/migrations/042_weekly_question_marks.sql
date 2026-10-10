CREATE TABLE IF NOT EXISTS weekly_exam_question_marks (
 session_id uuid NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
 question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 objective_id uuid REFERENCES academic_daily_objectives(id) ON DELETE SET NULL,
 subject_name text NOT NULL,
 curriculum_topic_id text NOT NULL,
 mark_fraction numeric NOT NULL CHECK(mark_fraction>=0 AND mark_fraction<=1),
 marking_source text NOT NULL CHECK(marking_source IN ('OBJECTIVE_AUTO','AI_DRAFT','ADMIN')),
 feedback text,
 marked_by uuid REFERENCES users(id) ON DELETE SET NULL,
 marked_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(session_id,question_id)
);
CREATE INDEX IF NOT EXISTS weekly_exam_marks_objective_idx ON weekly_exam_question_marks(objective_id,session_id);
CREATE INDEX IF NOT EXISTS weekly_exam_marks_topic_idx ON weekly_exam_question_marks(curriculum_topic_id,session_id);