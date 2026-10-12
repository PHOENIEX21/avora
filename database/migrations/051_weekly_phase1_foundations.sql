-- Phase 1: additive schema foundation. No existing learner rows are changed.
-- Reversal is intentionally manual and gated on empty new tables; see rollback plan.
CREATE TABLE IF NOT EXISTS weekly_class_subjects(
 class_level text NOT NULL, subject_name text NOT NULL, subject_kind text NOT NULL
 CHECK(subject_kind IN ('CORE','OPTIONAL')), active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(class_level,subject_name));
CREATE TABLE IF NOT EXISTS weekly_student_optional_subjects(
 student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 class_level text NOT NULL, subject_name text NOT NULL,
 PRIMARY KEY(student_id,class_level,subject_name),
 FOREIGN KEY(class_level,subject_name) REFERENCES weekly_class_subjects(class_level,subject_name));
CREATE TABLE IF NOT EXISTS weekly_term_calendar(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 start_date date NOT NULL,teaching_weeks integer NOT NULL CHECK(teaching_weeks BETWEEN 1 AND 16),
 break_weeks jsonb NOT NULL DEFAULT '[]'::jsonb,term_exam_week integer CHECK(term_exam_week BETWEEN 1 AND 16),
 timezone text NOT NULL DEFAULT 'Africa/Lagos', UNIQUE(class_level,term,start_date));
CREATE TABLE IF NOT EXISTS weekly_class_week_state(
 class_level text PRIMARY KEY,term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 current_week integer NOT NULL CHECK(current_week BETWEEN 1 AND 16),
 mode text NOT NULL DEFAULT 'HELD' CHECK(mode IN ('AUTO','HELD')),
 changed_by uuid REFERENCES users(id) ON DELETE SET NULL,changed_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_class_week_audit(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,
 old_term integer,old_week integer,new_term integer NOT NULL,new_week integer NOT NULL,
 old_mode text,new_mode text NOT NULL,changed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 reason text NOT NULL,changed_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_teacher_class_permissions(
 teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 class_level text NOT NULL,can_change_week boolean NOT NULL DEFAULT false,
 assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
 PRIMARY KEY(teacher_id,class_level));
-- Existing APPROVED rows are review-ready, but never published automatically.
ALTER TABLE weekly_curriculum_objectives
 ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE weekly_curriculum_objectives
 ADD COLUMN IF NOT EXISTS published_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE weekly_curriculum_objectives
 ADD COLUMN IF NOT EXISTS source_page text;
ALTER TABLE weekly_curriculum_objectives DROP CONSTRAINT IF EXISTS weekly_curriculum_objectives_approval_status_check;
ALTER TABLE weekly_curriculum_objectives ADD CONSTRAINT weekly_curriculum_objectives_approval_status_check
 CHECK(approval_status IN ('DRAFT','IN_REVIEW','REVIEWED','APPROVED','PUBLISHED','RETIRED'));
ALTER TABLE weekly_curriculum_objectives ADD CONSTRAINT weekly_published_objective_review_guard
 CHECK(approval_status<>'PUBLISHED' OR
 (reviewed_by IS NOT NULL AND published_by IS NOT NULL AND published_at IS NOT NULL AND day_index BETWEEN 1 AND 5));
CREATE INDEX IF NOT EXISTS weekly_published_objectives_idx ON weekly_curriculum_objectives
 (class_level,term,week_number,subject_name,day_index) WHERE approval_status='PUBLISHED';
ALTER TABLE weekly_items DROP CONSTRAINT IF EXISTS weekly_items_status_check;
ALTER TABLE weekly_items ADD CONSTRAINT weekly_items_status_check
 CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED'));
ALTER TABLE weekly_items ADD CONSTRAINT weekly_published_item_guard
 CHECK(status<>'PUBLISHED' OR
 (objective_id IS NOT NULL AND answer_key IS NOT NULL AND reviewer_id IS NOT NULL AND reviewed_at IS NOT NULL));
CREATE TABLE IF NOT EXISTS weekly_content_batches(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,term integer NOT NULL,
 first_week integer NOT NULL,last_week integer NOT NULL,
 batch_type text NOT NULL CHECK(batch_type IN ('ENGLISH','OBJECTIVES')),
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','REJECTED')),
 reviewer_id uuid REFERENCES users(id) ON DELETE SET NULL,signed_off_at timestamptz,
 source_reference text,created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(first_week BETWEEN 1 AND 16 AND last_week BETWEEN first_week AND 16));
CREATE TABLE IF NOT EXISTS weekly_vocabulary_words(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,word text NOT NULL,
 part_of_speech text NOT NULL,meaning text NOT NULL,pronunciation_hint text,
 example_sentences jsonb NOT NULL DEFAULT '[]'::jsonb,related_form text,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(jsonb_typeof(example_sentences)='array' AND jsonb_array_length(example_sentences)<=3));
CREATE TABLE IF NOT EXISTS weekly_english_rules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,topic text NOT NULL,
 series text NOT NULL,part_number integer NOT NULL CHECK(part_number>0),
 definition text NOT NULL,rule_points jsonb NOT NULL DEFAULT '[]'::jsonb,
 common_mistakes jsonb NOT NULL DEFAULT '[]'::jsonb,summary text NOT NULL,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_audio_assets(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),storage_path text NOT NULL,duration_ms integer NOT NULL CHECK(duration_ms>0),
 speaker_label text,reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_oral_lessons(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,
 topic text NOT NULL CHECK(topic IN ('VOWELS','CONSONANTS','DIPHTHONGS','STRESS','INTONATION','RHYME')),
 description text NOT NULL,examples jsonb NOT NULL DEFAULT '[]'::jsonb,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_english_daily_plan(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),class_level text NOT NULL,term integer NOT NULL CHECK(term BETWEEN 1 AND 3),
 week_number integer NOT NULL CHECK(week_number BETWEEN 1 AND 16),
 day_index integer NOT NULL CHECK(day_index BETWEEN 1 AND 5),
 word_ids uuid[] NOT NULL,rule_id uuid NOT NULL REFERENCES weekly_english_rules(id) ON DELETE RESTRICT,
 oral_lesson_id uuid NOT NULL REFERENCES weekly_oral_lessons(id) ON DELETE RESTRICT,
 sentence_task_set_id uuid, status text NOT NULL DEFAULT 'DRAFT'
 CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(array_length(word_ids,1)=5),UNIQUE(class_level,term,week_number,day_index));
CREATE TABLE IF NOT EXISTS weekly_encouragement_messages(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),message_text text NOT NULL,context_tag text NOT NULL,
 status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_encouragement_log(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 message_id uuid NOT NULL REFERENCES weekly_encouragement_messages(id) ON DELETE RESTRICT,
 shown_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS weekly_cbt_sessions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 source text NOT NULL CHECK(source IN ('DAILY_LESSON','WEEKLY_EXAM','REVISIT')),
 mode text NOT NULL CHECK(mode IN ('PRACTICE','EXAM')),
 question_ids uuid[] NOT NULL DEFAULT '{}'::uuid[],started_at timestamptz NOT NULL DEFAULT now(),
 submitted_at timestamptz);
CREATE TABLE IF NOT EXISTS weekly_content_item_links(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),item_id uuid NOT NULL REFERENCES weekly_items(id) ON DELETE RESTRICT,
 rule_id uuid REFERENCES weekly_english_rules(id) ON DELETE CASCADE,
 oral_lesson_id uuid REFERENCES weekly_oral_lessons(id) ON DELETE CASCADE,
 rule_point_index integer CHECK(rule_point_index>=0),
 CHECK((rule_id IS NOT NULL)<>(oral_lesson_id IS NOT NULL)));
CREATE TABLE IF NOT EXISTS weekly_moderation_actions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
 post_id uuid REFERENCES study_room_posts(id) ON DELETE SET NULL,
 moderator_id uuid REFERENCES users(id) ON DELETE SET NULL,
 action text NOT NULL CHECK(action IN ('APPROVE','REJECT','HIDE','RESTORE','ESCALATE')),
 reason text,created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS weekly_moderation_room_idx ON weekly_moderation_actions(room_id,created_at DESC);
CREATE TABLE IF NOT EXISTS weekly_photo_consents(
 student_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 consent_method text NOT NULL,consent_reference text NOT NULL,
 recorded_by uuid REFERENCES users(id) ON DELETE SET NULL,recorded_at timestamptz NOT NULL DEFAULT now(),
 withdrawn_at timestamptz);
CREATE TABLE IF NOT EXISTS weekly_phase1_schema_marker(
 version integer PRIMARY KEY,applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO weekly_phase1_schema_marker(version) VALUES(51) ON CONFLICT DO NOTHING;
