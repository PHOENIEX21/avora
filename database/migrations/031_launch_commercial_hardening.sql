ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS input_tokens integer NOT NULL DEFAULT 0;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS output_tokens integer NOT NULL DEFAULT 0;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS estimated_cost_usd numeric(12,6) NOT NULL DEFAULT 0;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'CLAIMED';
CREATE TABLE IF NOT EXISTS free_learning_usage(
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 usage_date date NOT NULL DEFAULT CURRENT_DATE,
 practice_questions integer NOT NULL DEFAULT 0,
 authored_lesson_opens integer NOT NULL DEFAULT 0,
 PRIMARY KEY(student_id,usage_date)
);
