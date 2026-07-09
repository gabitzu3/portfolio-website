"use client";
import { useActionState } from "react";
import {
  createAchievementAction,
  updateAchievementAction,
} from "@/lib/actions/achievements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { achievementCategories } from "@/config/categories";
import type { Achievement, ActionResult } from "@/types";
const initialState: ActionResult = { success: false, error: "" };
const selectClassName =
  "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
interface AchievementFormProps {
  achievement?: Achievement;
}
export function AchievementForm({ achievement }: AchievementFormProps) {
  const action = achievement
    ? updateAchievementAction.bind(null, achievement.id)
    : createAchievementAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      {!state.success && state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
          Achievement saved successfully.
        </p>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={achievement?.title ?? ""} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={achievement?.description ?? ""}
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="achievementDate">Date</Label>
          <Input
            id="achievementDate"
            name="achievementDate"
            type="date"
            defaultValue={achievement?.achievement_date ?? ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={achievement?.category ?? "ctf"}
            className={selectClassName}
          >
            {achievementCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mediaUrl">Media URL</Label>
          <Input id="mediaUrl" name="mediaUrl" defaultValue={achievement?.media_url ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort order</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={achievement?.sort_order ?? 0}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={achievement?.is_published ?? false}
        />
        Published
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : achievement ? "Update" : "Create"}
      </Button>
    </form>
  );
}
