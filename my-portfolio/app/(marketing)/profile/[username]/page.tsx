import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSessionProfile } from "@/lib/auth/get-user";
import { getProfileByUsername } from "@/lib/data/profiles";
import { getPublishedContent } from "@/lib/data/content";
import { getRecentReviews } from "@/lib/data/reviews";
import { ContentCard } from "@/components/content/content-card";
import { ReviewCard } from "@/components/reviews/review-card";
import { EmptyState } from "@/components/shared/empty-state";
import Link from "next/link";
import type { Content, Review } from "@/types";

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

  let recentContent: Content[] = [];
  let timelineItems: Content[] = [];
  let reviews: Review[] = [];

  try {
    [recentContent, timelineItems, reviews] = await Promise.all([
      getPublishedContent({ sort: "newest", limit: 4 }),
      getPublishedContent({ tagSlugs: ["achievement", "certification"], sort: "newest", limit: 4 }),
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
            <h2 className="text-lg font-semibold mb-4">Recent Content</h2>
            {recentContent.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {recentContent.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState title="Nothing published yet" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Timeline</h2>
            {timelineItems.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {timelineItems.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState title="No achievements or certifications yet" />
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
