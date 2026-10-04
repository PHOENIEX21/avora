-- AVORA V10.6.0: authenticated parent/guardian accounts, child linking and supervised evidence dashboard.
CREATE TABLE IF NOT EXISTS parent_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS parent_student_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relationship text NOT NULL DEFAULT 'PARENT_GUARDIAN',
  status text NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE','REVOKED')),
  linked_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  UNIQUE(parent_id,student_id)
);
CREATE INDEX IF NOT EXISTS idx_parent_student_parent ON parent_student_links(parent_id,status,linked_at DESC);
CREATE INDEX IF NOT EXISTS idx_parent_student_student ON parent_student_links(student_id,status,linked_at DESC);

CREATE TABLE IF NOT EXISTS parent_link_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  used_by_parent_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_parent_link_codes_student ON parent_link_codes(student_id,created_at DESC);

ALTER TABLE live_assessment_participants
  ADD COLUMN IF NOT EXISTS confirmed_by_parent_id uuid REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS parent_confirmation_method text,
  ADD COLUMN IF NOT EXISTS parent_confirmation_note text;
