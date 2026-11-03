/*
# Scrapbook storage setup

1. New Tables
- `site`: one row (id 1) holding the whole scrapbook content as JSON.
- `moods`: a log of moods sent from the scrapbook, with timestamps.

2. Storage
- A public `media` bucket for photos and songs uploaded in edit mode.

3. Security
- Row level security is enabled on `site` and `moods`.
- Anyone with the link can read the scrapbook content and add a mood.
- Only the signed-in owner can change the scrapbook content, read moods, or upload and delete media.

4. Notes
- Every statement is safe to re-run.
*/

CREATE TABLE IF NOT EXISTS site (
  id int PRIMARY KEY,
  data jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS moods (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  mood text NOT NULL,
  at timestamptz DEFAULT now()
);

ALTER TABLE site ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON site TO anon;
GRANT INSERT, UPDATE ON site TO authenticated;
GRANT SELECT ON site TO authenticated;
GRANT INSERT ON moods TO anon, authenticated;
GRANT SELECT ON moods TO authenticated;

DROP POLICY IF EXISTS "anyone reads site" ON site;
CREATE POLICY "anyone reads site" ON site FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin inserts site" ON site;
CREATE POLICY "admin inserts site" ON site FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin updates site" ON site;
CREATE POLICY "admin updates site" ON site FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anyone adds mood" ON moods;
CREATE POLICY "anyone adds mood" ON moods FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin reads moods" ON moods;
CREATE POLICY "admin reads moods" ON moods FOR SELECT
  TO authenticated USING (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
  ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "admin uploads media" ON storage.objects;
CREATE POLICY "admin uploads media" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "admin deletes media" ON storage.objects;
CREATE POLICY "admin deletes media" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'media');
