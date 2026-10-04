-- AVORA V12.7.0: durable login brute-force protection.
-- Forward-only migration; does not alter historical 024/025 password-reset migrations.
CREATE TABLE IF NOT EXISTS login_rate_limits (
  bucket_key text PRIMARY KEY,
  scope text NOT NULL CHECK (scope IN ('IDENTITY','IDENTITY_IP','IP')),
  failure_count integer NOT NULL DEFAULT 0 CHECK (failure_count >= 0),
  window_started_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS login_rate_limits_locked_until_idx
  ON login_rate_limits (locked_until)
  WHERE locked_until IS NOT NULL;

CREATE INDEX IF NOT EXISTS login_rate_limits_updated_at_idx
  ON login_rate_limits (updated_at);
