ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at timestamptz;

-- Preserve existing local/test accounts created before verification existed.
UPDATE users SET email_verified_at = now() WHERE email_verified_at IS NULL;

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_verification_user ON email_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_expiry ON email_verification_tokens(expires_at);
