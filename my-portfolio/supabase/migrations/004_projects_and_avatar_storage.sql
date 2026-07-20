CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  cover_image_url TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  importance INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  operation TEXT,
  status_label TEXT,
  duration TEXT,
  objective TEXT,
  architecture TEXT,
  lessons_learned TEXT,
  demo_url TEXT,
  repo_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_projects_status_published ON projects(status, published_at DESC NULLS LAST);
CREATE UNIQUE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_importance ON projects(importance DESC, sort_order DESC);
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_select_published"
  ON projects FOR SELECT  USING (status = 'published' OR is_admin());
CREATE POLICY "projects_insert_admin"
  ON projects FOR INSERT  WITH CHECK (is_admin());
CREATE POLICY "projects_update_admin"
  ON projects FOR UPDATE  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY "projects_delete_admin"
  ON projects FOR DELETE  USING (is_admin());
CREATE POLICY "public_assets_avatar_insert_own"
  ON storage.objects FOR INSERT  WITH CHECK (
    bucket_id = 'public-assets'
    AND (storage.foldername(name))[1] = 'avatars'
    AND (storage.foldername(name))[2] = auth.uid()::TEXT  );
CREATE POLICY "public_assets_avatar_update_own"
  ON storage.objects FOR UPDATE  USING (
    bucket_id = 'public-assets'
    AND (storage.foldername(name))[1] = 'avatars'
    AND (storage.foldername(name))[2] = auth.uid()::TEXT  )
  WITH CHECK (
    bucket_id = 'public-assets'
    AND (storage.foldername(name))[1] = 'avatars'
    AND (storage.foldername(name))[2] = auth.uid()::TEXT  );
CREATE POLICY "public_assets_avatar_delete_own"
  ON storage.objects FOR DELETE  USING (
    bucket_id = 'public-assets'
    AND (storage.foldername(name))[1] = 'avatars'
    AND (storage.foldername(name))[2] = auth.uid()::TEXT  );
DROP POLICY IF EXISTS "certificates_select_admin" ON storage.objects;
CREATE POLICY "certificates_select_admin"
  ON storage.objects FOR SELECT  USING (bucket_id = 'certificates' AND is_admin());
