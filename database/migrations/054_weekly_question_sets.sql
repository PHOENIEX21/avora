-- Additive question-set architecture. Defaults keep every item out of live serving.
CREATE TABLE IF NOT EXISTS weekly_topic_question_sets (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 class_level text NOT NULL, subject_name text NOT NULL,
 term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 week_number integer NOT NULL CHECK(week_number BETWEEN 1 AND 16),
 topic_title text NOT NULL,
 rotation_due_at timestamptz,
 last_rotated_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(class_level,subject_name,term,week_number,topic_title)
);
CREATE TABLE IF NOT EXISTS weekly_topic_question_memberships (
 topic_set_id uuid NOT NULL REFERENCES weekly_topic_question_sets(id) ON DELETE RESTRICT,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 pool text NOT NULL DEFAULT 'RESERVE' CHECK(pool IN ('RESERVE','LIVE','RETIRED')),
 exam_eligible boolean NOT NULL DEFAULT false,
 entered_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(topic_set_id,item_id)
);
CREATE INDEX IF NOT EXISTS weekly_topic_memberships_pool_idx ON weekly_topic_question_memberships(topic_set_id,pool,exam_eligible);
CREATE TABLE IF NOT EXISTS weekly_question_rotations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 topic_set_id uuid NOT NULL REFERENCES weekly_topic_question_sets(id) ON DELETE RESTRICT,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','APPROVED','APPLIED','REJECTED')),
 incoming_ids uuid[] NOT NULL DEFAULT '{}'::uuid[],
 outgoing_ids uuid[] NOT NULL DEFAULT '{}'::uuid[],
 proposed_at timestamptz NOT NULL DEFAULT now(),
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_at timestamptz,
 applied_at timestamptz,
 CHECK(cardinality(incoming_ids)=cardinality(outgoing_ids))
);
CREATE TABLE IF NOT EXISTS weekly_question_set_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 topic_set_id uuid NOT NULL REFERENCES weekly_topic_question_sets(id) ON DELETE RESTRICT,
 item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 old_pool text, new_pool text NOT NULL,
 changed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 reason text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
-- Membership rows alone never confer permission to serve an unapproved item.
