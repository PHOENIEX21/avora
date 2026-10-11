-- Distinguish a successfully verified contact from a revoked or superseded code.
-- Only apply to the isolated validation database until production approval.
ALTER TABLE weekly_guardian_challenges
 ADD COLUMN IF NOT EXISTS verified_at timestamptz;
CREATE INDEX IF NOT EXISTS weekly_guardian_challenges_verified
 ON weekly_guardian_challenges(student_id,verified_at DESC)
 WHERE verified_at IS NOT NULL;
