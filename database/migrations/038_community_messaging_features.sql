-- Community ownership and delegated administration.
-- The sole community owner is verified against the authenticated user ID in lib/communityAccess.ts.
CREATE TABLE IF NOT EXISTS study_room_admins (
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 granted_by uuid NOT NULL REFERENCES users(id),
 granted_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS study_room_starred_posts (
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 post_id uuid NOT NULL REFERENCES study_room_posts(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(user_id,post_id)
);
CREATE TABLE IF NOT EXISTS study_room_reactions (
 post_id uuid NOT NULL REFERENCES study_room_posts(id) ON DELETE CASCADE,
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 emoji text NOT NULL CHECK (emoji IN ('👍','❤️','😂','😮','👏','🙏')),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(post_id,user_id)
);
ALTER TABLE study_rooms ADD COLUMN IF NOT EXISTS pinned_post_id uuid REFERENCES study_room_posts(id) ON DELETE SET NULL;
CREATE TABLE IF NOT EXISTS study_room_presence (
 room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 last_seen_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(room_id,user_id)
);
CREATE TABLE IF NOT EXISTS study_room_attachments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 post_id uuid NOT NULL REFERENCES study_room_posts(id) ON DELETE CASCADE,
 file_name text NOT NULL,
 mime_type text NOT NULL,
 file_size integer NOT NULL CHECK(file_size>0 AND file_size<=4194304),
 file_bytes bytea NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
