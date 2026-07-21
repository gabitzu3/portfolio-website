import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSessionProfile } from "@/lib/auth/get-user";
import { getProfileByUsername } from "@/lib/data/profiles";
import { getRecentPosts } from "@/lib/data/posts";
import { getRecentAchievements } from "@/lib/data/achievements";
import { getRecentCertifications } from "@/lib/data/certifications";
import { getRecentReviews } from "@/lib/data/reviews";
import { PostCard } from "@/components/blog/post-card";
import { AchievementCard } from "@/components/achievements/achievement-card";
import { CertificationCard } from "@/components/certifications/certification-card";
import { ReviewCard } from "@/components/reviews/review-card";
import { EmptyState } from "@/components/shared/empty-state";
import Link from "next/link";
import type { Post, Achievement, Certification, Review } from "@/types";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  const session = await getSessionProfile();

  if (!profile) {
    notFound();
  }

  const isOwnProfile = session?.user.id === profile.id;

  let posts: Post[] = [];
  let achievements: Achievement[] = [];
  let certifications: Certification[] = [];
  let reviews: Review[] = [];

  try {
    [posts, achievements, certifications, reviews] = await Promise.all([
      getRecentPosts(3),
      getRecentAchievements(3),
      getRecentCertifications(3),
      getRecentReviews(3),
    ]);
  } catch {
    // Database not configured
  }

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || "Avatar"}
                className="w-32 h-32 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-primary/10 flex items-center justify-center border">
                <span className="text-3xl font-medium">
                  {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{profile.full_name || profile.username}</h1>
              {profile.title && (
                <p className="text-lg text-muted-foreground">{profile.title}</p>
              )}
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
            </div>
          </div>
          
          {isOwnProfile && (
            <Link href="/profile">
              <Button>Edit Profile</Button>
            </Link>
          )}
        </div>

        {profile.bio && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
        )}

        {profile.focus_areas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Focus Areas</h2>
            <div className="flex flex-wrap gap-2">
              {profile.focus_areas.map((area) => (
                <Badge key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recent Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
            {posts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState title="No posts yet" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Achievements</h2>
            {achievements.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <EmptyState title="No achievements yet" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Certifications</h2>
            {certifications.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {certifications.map((certification) => (
                  <CertificationCard key={certification.id} certification={certification} />
                ))}
              </div>
            ) : (
              <EmptyState title="No certifications yet" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <EmptyState title="No reviews yet" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
