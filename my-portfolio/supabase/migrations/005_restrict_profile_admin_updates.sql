REVOKE UPDATE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (username, full_name, title, bio, avatar_url, focus_areas)
  ON public.profiles TO authenticated;
