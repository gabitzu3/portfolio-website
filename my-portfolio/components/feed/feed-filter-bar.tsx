"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_FEED_TYPES, FEED_SORT_LABELS, FEED_TYPE_LABELS } from "@/types/feed";
import type { FeedItemType, FeedSort } from "@/types/feed";

interface FeedFilterBarProps {
  currentSort: FeedSort;
  currentTypes: FeedItemType[];
}

export function FeedFilterBar({ currentSort, currentTypes }: FeedFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<FeedSort>(currentSort);
  const [selectedTypes, setSelectedTypes] = useState<FeedItemType[]>(currentTypes);

  function toggleType(type: FeedItemType) {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    updateParams(newTypes, sort);
  }

  function handleSortChange(newSort: FeedSort | null) {
    if (!newSort) return;
    setSort(newSort);
    updateParams(selectedTypes, newSort);
  }

  function updateParams(types: FeedItemType[], sortValue: FeedSort) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortValue);
    if (types.length === 0) {
      params.delete("types");
    } else {
      params.set("types", types.join(","));
    }
    router.push(`/feed?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        {ALL_FEED_TYPES.map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{FEED_TYPE_LABELS[type]}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="sort" className="text-sm">
          Sort by:
        </Label>
        <Select value={sort} onValueChange={handleSortChange}>
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
