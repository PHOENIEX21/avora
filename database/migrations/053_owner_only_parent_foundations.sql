-- New owner-only AVORA specification alignment. Additive, default-deny.
-- No parent consent text is inserted: wording requires owner/legal approval.
CREATE TABLE IF NOT EXISTS weekly_parent_consents (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 consent_data boolean NOT NULL DEFAULT false,
 consent_photo boolean NOT NULL DEFAULT false,
 consent_at timestamptz,
 consent_version text,
 parent_contact text,
 parent_contact_verified_at timestamptz,
 recorded_at timestamptz NOT NULL DEFAULT now(),
 CHECK (NOT consent_data OR (consent_at IS NOT NULL AND consent_version IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS weekly_parent_pins (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 pin_hash text NOT NULL,
 failed_attempts integer NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
 locked_until timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_student_pins (
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 pin_hash text NOT NULL,
 failed_attempts integer NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
 locked_until timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS weekly_question_reports (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE CASCADE,
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 reason text NOT NULL,
 status text NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','RESOLVED','DISMISSED')),
 created_at timestamptz NOT NULL DEFAULT now(),
 reviewed_at timestamptz
);
CREATE INDEX IF NOT EXISTS weekly_question_reports_queue ON weekly_question_reports(status,created_at);
CREATE TABLE IF NOT EXISTS weekly_admin_audit_log (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 admin_id uuid REFERENCES users(id) ON DELETE SET NULL,
 action text NOT NULL,
 target_type text NOT NULL,
 target_id text,
 details jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS weekly_admin_audit_recent ON weekly_admin_audit_log(created_at DESC);
-- Teacher permissions from earlier draft are deliberately not used by the owner-only system.
-- Preserve their table for backwards compatibility; no teacher access is granted.
