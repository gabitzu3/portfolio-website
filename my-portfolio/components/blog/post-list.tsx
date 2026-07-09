import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Post } from "@/types";
interface PostListProps {
  posts: Post[];
}
export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Published blog posts will appear here."
      />
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
