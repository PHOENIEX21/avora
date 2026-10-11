-- Guardian challenge storage for an independently verified contact flow.
-- This migration is NOT permission to enable enrollment or send messages.
-- Apply only to the isolated validation branch until the owner approves production.
CREATE TABLE IF NOT EXISTS weekly_guardian_challenges (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 contact_digest text NOT NULL,
 code_hash text NOT NULL,
 nonce text NOT NULL,
 channel text NOT NULL CHECK (channel IN ('EMAIL','SMS')),
 attempts integer NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),
 expires_at timestamptz NOT NULL,
 consumed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS weekly_guardian_challenges_student_recent
 ON weekly_guardian_challenges(student_id,created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS weekly_guardian_challenges_one_active
 ON weekly_guardian_challenges(student_id) WHERE consumed_at IS NULL;
