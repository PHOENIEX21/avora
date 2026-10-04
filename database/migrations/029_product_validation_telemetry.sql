CREATE TABLE IF NOT EXISTS product_validation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL,
  event_name text NOT NULL,
  surface text NOT NULL DEFAULT 'web',
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_product_validation_events_created ON product_validation_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_validation_events_user_created ON product_validation_events(user_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_validation_events_name_created ON product_validation_events(event_name,created_at DESC);
COMMENT ON TABLE product_validation_events IS 'Privacy-minimized product validation telemetry. Never store raw answers, prompts, narration, chat text, email, names, IP addresses or user-agent strings.';
