"use client";
import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/actions/posts";
import { postCategories } from "@/config/categories";
import { formatDate } from "@/lib/utils/format-date";
import type { Post } from "@/types";
interface PostsTableRowProps {
  post: Post;
}
export function PostsTableRow({ post }: PostsTableRowProps) {
  const handleDelete = async () => {
    await deletePostAction(post.id);
  };
  return (
    <tr>
      <td className="font-medium">{post.title}</td>
      <td>
        {postCategories.find((c) => c.value === post.category)?.label}
      </td>
      <td>
        <Badge variant={post.status === "published" ? "default" : "secondary"}>
          {post.status}
        </Badge>
      </td>
      <td>{formatDate(post.updated_at)}</td>
      <td className="text-right">
        <div className="flex justify-end gap-2">
          <Link href={`/admin/posts/${post.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <DeleteConfirmDialog
            title="Delete post"
            description={`Delete "${post.title}"? This cannot be undone.`}
            onConfirm={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
}
