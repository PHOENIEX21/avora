-- AVORA V10.8.0: family access integrity, three learner seats, trial lifecycle and seat history.
ALTER TABLE billing_accounts DROP CONSTRAINT IF EXISTS billing_accounts_status_check;
ALTER TABLE billing_accounts ADD CONSTRAINT billing_accounts_status_check CHECK(status IN ('INACTIVE','TRIALING','PENDING','ACTIVE','PAST_DUE','CANCELLED'));
ALTER TABLE billing_accounts ALTER COLUMN max_students SET DEFAULT 3;
UPDATE billing_accounts SET max_students=3, updated_at=now() WHERE plan_key='FAMILY_MONTHLY' AND max_students<3;
ALTER TABLE billing_accounts ADD COLUMN IF NOT EXISTS trial_started_at timestamptz, ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz, ADD COLUMN IF NOT EXISTS trial_consumed_at timestamptz;

CREATE TABLE IF NOT EXISTS learner_access_trials (
  student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL DEFAULT (now()+interval '14 days'),
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_learner_access_trials_end ON learner_access_trials(ends_at);

ALTER TABLE billing_student_seats ADD COLUMN IF NOT EXISTS locked_at timestamptz, ADD COLUMN IF NOT EXISTS replacement_available_at timestamptz, ADD COLUMN IF NOT EXISTS release_reason text;
UPDATE billing_student_seats SET locked_at=COALESCE(locked_at,attached_at) WHERE status='ACTIVE';
CREATE UNIQUE INDEX IF NOT EXISTS uq_active_family_seat_per_student ON billing_student_seats(student_id) WHERE status='ACTIVE';

CREATE TABLE IF NOT EXISTS family_seat_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  billing_account_id uuid NOT NULL REFERENCES billing_accounts(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK(event_type IN ('ATTACHED','RELEASED','REPLACED','BLOCKED')),
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_family_seat_events_billing ON family_seat_events(billing_account_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_family_seat_events_student ON family_seat_events(student_id,created_at DESC);

ALTER TABLE parent_student_links ADD COLUMN IF NOT EXISTS seat_locked_at timestamptz, ADD COLUMN IF NOT EXISTS last_relationship_change_at timestamptz;
UPDATE parent_student_links SET seat_locked_at=COALESCE(seat_locked_at,linked_at) WHERE status='ACTIVE';
