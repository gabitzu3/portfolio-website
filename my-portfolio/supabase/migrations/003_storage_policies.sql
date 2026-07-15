INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES  (
    'public-assets',
    'public-assets',
    TRUE,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
),
  (
    'certificates',
    'certificates',
    FALSE,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  )
ON CONFLICT (id) DO NOTHING;
CREATE POLICY "public_assets_select"
  ON storage.objects FOR SELECT  USING (bucket_id = 'public-assets');
CREATE POLICY "public_assets_insert_admin"
  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'public-assets' AND is_admin());
CREATE POLICY "public_assets_update_admin"
  ON storage.objects FOR UPDATE  USING (bucket_id = 'public-assets' AND is_admin())
  WITH CHECK (bucket_id = 'public-assets' AND is_admin());
CREATE POLICY "public_assets_delete_admin"
  ON storage.objects FOR DELETE  USING (bucket_id = 'public-assets' AND is_admin());
CREATE POLICY "certificates_select_admin"
  ON storage.objects FOR logs_select_admin  USING (bucket_id = 'certificates' AND is_admin());
CREATE POLICY "certificates_insert_admin"
  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'certificates' AND is_admin());
CREATE POLICY "certificates_update_admin"
  ON storage.objects FOR UPDATE  USING (bucket_id = 'certificates' AND is_admin())
  WITH CHECK (bucket_id = 'certificates' AND is_admin());
CREATE POLICY "certificates_delete_admin"
  ON storage.objects FOR DELETE  USING (bucket_id = 'certificates' AND is_admin());

