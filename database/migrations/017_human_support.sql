CREATE TABLE IF NOT EXISTS support_threads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, category text NOT NULL DEFAULT 'LEARNING_HELP', subject text, title text NOT NULL,
 status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','WAITING_ON_STUDENT','WAITING_ON_SUPPORT','RESOLVED','CLOSED')), priority text NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW','NORMAL','HIGH','URGENT')),
 assigned_admin_id uuid REFERENCES users(id) ON DELETE SET NULL, class_level_snapshot text, current_topic_snapshot text, context_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
 last_message_at timestamptz NOT NULL DEFAULT now(), resolved_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS support_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), thread_id uuid NOT NULL REFERENCES support_threads(id) ON DELETE CASCADE, sender_id uuid REFERENCES users(id) ON DELETE SET NULL, sender_role text NOT NULL CHECK (sender_role IN ('STUDENT','ADMIN','SYSTEM')), body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 4000), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS support_thread_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), thread_id uuid NOT NULL REFERENCES support_threads(id) ON DELETE CASCADE, actor_id uuid REFERENCES users(id) ON DELETE SET NULL, event_type text NOT NULL, event_data jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS idx_support_threads_student ON support_threads(student_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_threads_queue ON support_threads(status, priority, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_threads_admin ON support_threads(assigned_admin_id, status, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_messages_thread ON support_messages(thread_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_support_events_thread ON support_thread_events(thread_id, created_at DESC);
