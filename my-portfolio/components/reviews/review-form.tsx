"use client";
import { useActionState } from "react";
import { submitReviewAction } from "@/lib/actions/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionResult } from "@/types";
const initialState: ActionResult = { success: false, error: "" };
const selectClassName =
  "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
export function ReviewForm() {
  const [state, formAction, pending] = useActionState(
    submitReviewAction,
    initialState,
  );
  return (
    <form action={formAction} className="max-w-xl space-y-4">
      {state.success ? (
        <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
          Review submitted for moderation. Thank you!
        </p>
      ) : null}
      {!state.success && state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role / Company (optional)</Label>
        <Input id="role" name="role" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (optional)</Label>
        <select id="rating" name="rating" className={selectClassName} defaultValue="">
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} star{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Review</Label>
        <Textarea id="content" name="content" rows={5} required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit review"}
      </Button>
    </form>
  );
}
