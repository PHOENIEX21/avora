ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS provider text;
ALTER TABLE ai_usage_events ADD COLUMN IF NOT EXISTS model text;
CREATE INDEX IF NOT EXISTS ai_usage_events_provider_created_idx ON ai_usage_events(provider,created_at DESC);
