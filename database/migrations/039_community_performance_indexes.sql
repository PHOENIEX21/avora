-- Performance indexes for high-volume group conversations and moderation.
CREATE INDEX IF NOT EXISTS study_room_posts_recent_idx ON study_room_posts(room_id,created_at DESC,id DESC) WHERE status='VISIBLE';
CREATE INDEX IF NOT EXISTS study_room_posts_author_recent_idx ON study_room_posts(author_id,created_at DESC);
CREATE INDEX IF NOT EXISTS study_room_reports_open_idx ON study_room_reports(created_at) WHERE status='OPEN';
CREATE INDEX IF NOT EXISTS study_room_presence_active_idx ON study_room_presence(room_id,last_seen_at DESC);
