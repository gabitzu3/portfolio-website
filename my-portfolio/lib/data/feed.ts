import { getPublishedPosts } from "@/lib/data/posts";
import { getPublishedAchievements } from "@/lib/data/achievements";
import { getVisibleCertifications } from "@/lib/data/certifications";
import { getApprovedReviews } from "@/lib/data/reviews";
import { getPublishedProjects } from "@/lib/data/projects";
import { postCategories, achievementCategories } from "@/config/categories";
import type { FeedItem, FeedItemType, FeedSort } from "@/types/feed";
function sortFeedItems(items: FeedItem[], sort: FeedSort): FeedItem[] {
  const sorted = [...items];
  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    case "importance":
      return sorted.sort((a, b) => {
        if (b.importance !== a.importance) return b.importance - a.importance;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    case "newest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  }
}
export async function getFeedItems(options?: {
  types?: FeedItemType[];
  sort?: FeedSort;
}): Promise<FeedItem[]> {
  const types = options?.types ?? [
    "post",
    "achievement",
    "certification",
    "review",
    "project",
  ];
  const sort = options?.sort ?? "newest";
  const fetches: Promise<FeedItem[]>[] = [];
  if (types.includes("post")) {
    fetches.push(
      getPublishedPosts().then((posts) =>
        posts.map((post) => ({
          id: post.id,
          type: "post" as const,
          title: post.title,
          summary: post.excerpt || post.content.slice(0, 200),
          date: post.published_at ?? post.created_at,
          importance: 0,
          href: `/blog/${post.slug}`,
          badge: postCategories.find((c) => c.value === post.category)?.label,
        })),
      ),
    );
  }
  if (types.includes("achievement")) {
    fetches.push(
      getPublishedAchievements().then((achievements) =>
        achievements.map((a) => ({
          id: a.id,
          type: "achievement" as const,
          title: a.title,
          summary: a.description.slice(0, 200),
          date: a.achievement_date,
          importance: a.sort_order,
          href: `/achievements#${a.id}`,
          badge: achievementCategories.find((c) => c.value === a.category)
            ?.label,
        })),
      ),
    );
  }
  if (types.includes("certification")) {
    fetches.push(
      getVisibleCertifications().then((certs) =>
        certs.map((cert) => ({
          id: cert.id,
          type: "certification" as const,
          title: cert.title,
          summary: cert.issuer ? `Issued by ${cert.issuer}` : "Certification",
          date: cert.issued_date ?? cert.created_at,
          importance: cert.sort_order,
          href: `/certifications#${cert.id}`,
          badge: "Certification",
        })),
      ),
    );
  }
  if (types.includes("review")) {
    fetches.push(
      getApprovedReviews().then((reviews) =>
        reviews.map((review) => ({
          id: review.id,
          type: "review" as const,
          title: review.name,
          summary: review.content.slice(0, 200),
          date: review.created_at,
          importance: review.rating ?? 0,
          href: `/reviews#${review.id}`,
          badge: review.role ?? "Review",
          meta: review.rating ? `${review.rating}/5` : undefined,
        })),
      ),
    );
  }
  if (types.includes("project")) {
    fetches.push(
      getPublishedProjects().then((projects) =>
        projects.map((project) => ({
          id: project.id,
          type: "project" as const,
          title: project.title,
          summary: project.description.slice(0, 200),
          date: project.published_at ?? project.created_at,
          importance: project.importance,
          href: `/projects/${project.slug}`,
          badge: project.status_label ?? "Project",
        })),
      ),
    );
  }
  const groups = await Promise.all(fetches);
  return sortFeedItems(groups.flat(), sort);
}