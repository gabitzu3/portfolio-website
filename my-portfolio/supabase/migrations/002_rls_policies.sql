CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM profiles WHERE id = auth.uid()),
    FALSE
  );
$$;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (TRUE);
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
CREATE POLICY "posts_select_published"
  ON posts FOR SELECT
  USING (status = 'published' OR is_admin());
CREATE POLICY "posts_insert_admin"
  ON posts FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY "posts_update_admin"
  ON posts FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY "posts_delete_admin"
  ON posts FOR DELETE
  USING (is_admin());
CREATE POLICY "achievements_select_published"
  ON achievements FOR SELECT
  USING (is_published = TRUE OR is_admin());
CREATE POLICY "achievements_insert_admin"
  ON achievements FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY "achievements_update_admin"
  ON achievements FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY "achievements_delete_admin"
  ON achievements FOR DELETE
  USING (is_admin());
CREATE POLICY "certifications_select_visible"
  ON certifications FOR SELECT
  USING (is_visible = TRUE OR is_admin());
CREATE POLICY "certifications_insert_admin"
  ON certifications FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY "certifications_update_admin"
  ON certifications FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY "certifications_delete_admin"
  ON certifications FOR DELETE
  USING (is_admin());
CREATE POLICY "reviews_select_approved_or_own_or_admin"
  ON reviews FOR SELECT
  USING (
    status = 'approved'
    OR submitter_id = auth.uid()
    OR is_admin()
  );
CREATE POLICY "reviews_insert_authenticated"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND submitter_id = auth.uid());
CREATE POLICY "reviews_update_admin"
  ON reviews FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY "reviews_delete_admin"
  ON reviews FOR DELETE
  USING (is_admin());
CREATE POLICY "logs_select_admin"
  ON logs FOR SELECT
  USING (is_admin());
