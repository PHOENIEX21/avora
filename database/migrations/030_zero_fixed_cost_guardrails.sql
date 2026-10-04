CREATE TABLE IF NOT EXISTS ai_usage_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 feature text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_usage_events_user_created_idx ON ai_usage_events(user_id,created_at DESC);
CREATE INDEX IF NOT EXISTS ai_usage_events_created_idx ON ai_usage_events(created_at DESC);
