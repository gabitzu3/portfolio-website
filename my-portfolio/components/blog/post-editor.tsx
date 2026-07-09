"use client";
import { useActionState } from "react";
import {
  createPostAction,
  updatePostAction,
} from "@/lib/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postCategories, postStatuses } from "@/config/categories";
import { slugify } from "@/lib/utils/slugify";
import type { ActionResult, Post } from "@/types";
const initialState: ActionResult = { success: false, error: "" };
const selectClassName =
  "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
interface PostEditorProps {
  post?: Post;
}
export function PostEditor({ post }: PostEditorProps) {
  const action = post
    ? updatePostAction.bind(null, post.id)
    : createPostAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  return (
    <form action={formAction} className="space-y-6">
      {!state.success && state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.success && post ? (
        <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
          Post updated successfully.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post?.title ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={post?.slug ?? ""}
            required
            onBlur={(e) => {
              if (!e.target.value && e.currentTarget.form) {
                const titleInput = e.currentTarget.form.elements.namedItem(
                  "title",
                ) as HTMLInputElement | null;
                if (titleInput?.value) {
                  e.target.value = slugify(titleInput.value);
                }
              }
            }}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={post?.category ?? "projects"}
            className={selectClassName}
          >
            {postCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={post?.status ?? "draft"}
            className={selectClassName}
          >
            {postStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coverImageUrl">Cover image URL</Label>
        <Input
          id="coverImageUrl"
          name="coverImageUrl"
          defaultValue={post?.cover_image_url ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={post?.content ?? ""}
          required
          className="font-mono text-sm"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : post ? "Update post" : "Create post"}
      </Button>
    </form>
  );
}
