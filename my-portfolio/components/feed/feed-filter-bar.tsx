"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FEED_SORT_LABELS } from "@/types/feed";
import type { FeedSort } from "@/types/feed";
import type { Tag } from "@/types";

interface FeedFilterBarProps {
  currentSort: FeedSort;
  currentTag?: string;
  includeReviews: boolean;
  tags: Tag[];
}

export function FeedFilterBar({ currentSort, currentTag, includeReviews, tags }: FeedFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(next: { sort?: FeedSort; tag?: string | null; includeReviews?: boolean }) {
    const params = new URLSearchParams(searchParams);
    if (next.sort) params.set("sort", next.sort);
    if (next.tag === null) params.delete("tag");
    else if (next.tag) params.set("tag", next.tag);
    if (next.includeReviews !== undefined) {
      if (next.includeReviews) params.delete("reviews");
      else params.set("reviews", "off");
    }
    router.push(`/feed?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        {tags.length > 0 && (
          <div className="flex items-center gap-2">
            <Label htmlFor="tag" className="text-sm">
              Tag:
            </Label>
            <Select
              value={currentTag ?? "all"}
              onValueChange={(value) => updateParams({ tag: value === "all" ? null : value })}
            >
              <SelectTrigger id="tag" className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.slug}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeReviews}
            onChange={(e) => updateParams({ includeReviews: e.target.checked })}
            className="rounded border-gray-300"
          />
          Include reviews
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="sort" className="text-sm">
          Sort by:
        </Label>
        <Select value={currentSort} onValueChange={(value) => value && updateParams({ sort: value as FeedSort })}>
          <SelectTrigger id="sort" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FEED_SORT_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
