export type FeedItemType =
  | "post"
  | "achievement"
  | "certification"
  | "review"
  | "project";
export type FeedSort = "newest" | "oldest" | "importance";
export interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  summary: string;
  date: string;
  importance: number;
  href: string;
  badge?: string;
  meta?: string;
}
export const FEED_TYPE_LABELS: Record<FeedItemType, string> = {
  post: "Posts",
  achievement: "Achievements",
  certification: "Certifications",
  review: "Reviews",
  project: "Projects",
};
export const FEED_SORT_LABELS: Record<FeedSort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  importance: "Most important",
};
export const ALL_FEED_TYPES: FeedItemType[] = [
  "post",
  "achievement",
  "certification",
  "review",
  "project",
];