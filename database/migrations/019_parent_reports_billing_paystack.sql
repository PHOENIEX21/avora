-- AVORA V10.7.0: parent weekly reports, notifications and family billing via Paystack.
CREATE TABLE IF NOT EXISTS billing_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL DEFAULT 'PAYSTACK',
  status text NOT NULL DEFAULT 'INACTIVE' CHECK(status IN ('INACTIVE','PENDING','ACTIVE','PAST_DUE','CANCELLED')),
  plan_key text NOT NULL DEFAULT 'FAMILY_MONTHLY',
  max_students integer NOT NULL DEFAULT 1 CHECK(max_students >= 1),
  provider_customer_code text,
  provider_subscription_code text,
  provider_email_token text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS billing_student_seats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  billing_account_id uuid NOT NULL REFERENCES billing_accounts(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE','REMOVED')),
  attached_at timestamptz NOT NULL DEFAULT now(),
  removed_at timestamptz,
  UNIQUE(billing_account_id,student_id)
);
CREATE INDEX IF NOT EXISTS idx_billing_student_seats_student ON billing_student_seats(student_id,status);

CREATE TABLE IF NOT EXISTS billing_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  billing_account_id uuid NOT NULL REFERENCES billing_accounts(id) ON DELETE CASCADE,
  provider_reference text UNIQUE NOT NULL,
  provider_transaction_id text,
  amount_kobo integer,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'PENDING',
  paid_at timestamptz,
  raw_event jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS parent_weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  week_end date NOT NULL,
  lessons_completed integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  supervised_assessments integer NOT NULL DEFAULT 0,
  supervised_average integer,
  mastery_average integer,
  strongest_topic text,
  weakest_topic text,
  recommended_next text,
  summary text NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(parent_id,student_id,week_start)
);

CREATE TABLE IF NOT EXISTS parent_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  kind text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  href text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_parent_notifications_parent ON parent_notifications(parent_id,created_at DESC);
