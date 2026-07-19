import { getAllPosts } from "@/lib/data/posts";
import { getAllAchievements } from "@/lib/data/achievements";
import { getAllCertifications } from "@/lib/data/certifications";
import { getReviewsByStatus } from "@/lib/data/reviews";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import type { Post, Achievement, Certification, Review } from "@/types";
interface SearchResultsProps {
  query: string;
}
export async function SearchResults({ query }: SearchResultsProps) {
  const lowerQuery = query.toLowerCase();
  let posts: Post[] = [];
  let achievements: Achievement[] = [];
  let certifications: Certification[] = [];
  let reviews: Review[] = [];
  try {
    [posts, achievements, certifications, reviews] = await Promise.all([
      getAllPosts(),
      getAllAchievements(),
      getAllCertifications(),
      getReviewsByStatus("approved"),
    ]);
  } catch {

  }
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt?.toLowerCase().includes(lowerQuery) ||
      post.content?.toLowerCase().includes(lowerQuery)
  );
  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.title.toLowerCase().includes(lowerQuery) ||
      achievement.description.toLowerCase().includes(lowerQuery)
  );
  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(lowerQuery) ||
      cert.issuer?.toLowerCase().includes(lowerQuery)
  );
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(lowerQuery) ||
      review.content.toLowerCase().includes(lowerQuery) ||
      review.role?.toLowerCase().includes(lowerQuery)
  );
  const totalResults =
    filteredPosts.length +
    filteredAchievements.length +
    filteredCertifications.length +
    filteredReviews.length;
  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No results found for "{query}"</p>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground mb-4">
        Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
      </p>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All ({totalResults})
          </TabsTrigger>
          <TabsTrigger value="posts">
            Posts ({filteredPosts.length})
          </TabsTrigger>
          <TabsTrigger value="achievements">
            Achievements ({filteredAchievements.length})
          </TabsTrigger>
          <TabsTrigger value="certifications">
            Certifications ({filteredCertifications.length})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({filteredReviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {filteredPosts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Posts</h3>
              <div className="space-y-2">
                {filteredPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt || post.content?.slice(0, 150)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {filteredAchievements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Achievements</h3>
              <div className="space-y-2">
                {filteredAchievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {achievement.description}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {achievement.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {filteredCertifications.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <div className="space-y-2">
                {filteredCertifications.map((cert) => (
                  <Card key={cert.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{cert.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer || "Unknown issuer"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {filteredReviews.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Reviews</h3>
              <div className="space-y-2">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{review.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {review.content}
                      </p>
                      {review.role && (
                        <p className="text-xs text-muted-foreground mt-1">{review.role}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="posts" className="mt-4 space-y-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt || post.content?.slice(0, 150)}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No posts found.</p>
          )}
        </TabsContent>
        <TabsContent value="achievements" className="mt-4 space-y-2">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle className="text-base">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {achievement.category}
                  </Badge>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No achievements found.</p>
          )}
        </TabsContent>
        <TabsContent value="certifications" className="mt-4 space-y-2">
          {filteredCertifications.length > 0 ? (
            filteredCertifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="text-base">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer || "Unknown issuer"}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No certifications found.</p>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-4 space-y-2">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-base">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.content}
                  </p>
                  {review.role && (
                    <p className="text-xs text-muted-foreground mt-1">{review.role}</p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No reviews found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
