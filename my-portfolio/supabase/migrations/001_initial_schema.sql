CREATE TYPE post_category AS ENUM ('cybersecurity', 'leadership', 'projects');
CREATE TYPE post_status AS ENUM ('draft', 'published');
CREATE TYPE achievement_category AS ENUM ('ctf', 'internship', 'competition', 'education');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  focus_areas TEXT[] NOT NULL DEFAULT '{}',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  category post_category NOT NULL DEFAULT 'projects',
  status post_status NOT NULL DEFAULT 'draft',
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  achievement_date DATE NOT NULL,
  category achievement_category NOT NULL,
  media_url TEXT,
  media_type TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT,
  issued_date DATE,
  expiry_date DATE,
  file_path TEXT NOT NULL,
  file_type TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating SMALLINT CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  status review_status NOT NULL DEFAULT 'pending',
  moderated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  moderated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = TRUE;
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC NULLS LAST);
CREATE INDEX idx_posts_category_status ON posts(category, status);
CREATE UNIQUE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_achievements_published_date ON achievements(is_published, achievement_date DESC);
CREATE INDEX idx_achievements_category ON achievements(category, is_published);
CREATE INDEX idx_certifications_visible ON certifications(is_visible, sort_order);
CREATE INDEX idx_reviews_status_created ON reviews(status, created_at DESC);
CREATE INDEX idx_reviews_submitter ON reviews(submitter_id);
CREATE INDEX idx_logs_action_created ON logs(action, created_at DESC);
CREATE INDEX idx_logs_user_created ON logs(user_id, created_at DESC);
CREATE INDEX idx_logs_entity ON logs(entity_type, entity_id);
CREATE INDEX idx_logs_created ON logs(created_at DESC);
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER achievements_updated_at
  BEFORE UPDATE ON achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
