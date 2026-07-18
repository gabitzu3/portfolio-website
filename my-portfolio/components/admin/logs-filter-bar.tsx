"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOG_ACTIONS, LOG_ACTION_LABELS } from "@/lib/logging/actions";
const selectClassName =
  "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50";
export function LogsFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [action, setAction] = useState(searchParams.get("action") ?? "");
  const [userId, setUserId] = useState(searchParams.get("userId") ?? "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") ?? "");
  
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (action) params.set("action", action);
    if (userId) params.set("userId", userId);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    router.push(`/admin/logs?${params.toString()}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border p-4 md:grid-cols-4"
    >
      <div className="space-y-2">
        <Label htmlFor="action">Action</Label>
        <select
          id="action"
          name="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className={selectClassName}
        >
          <option value="">All actions</option>
          {Object.values(LOG_ACTIONS).map((action) => (
            <option key={action} value={action}>
              {LOG_ACTION_LABELS[action]}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateFrom">From</Label>
        <Input
          id="dateFrom"
          name="dateFrom"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateTo">To</Label>
        <Input
          id="dateTo"
          name="dateTo"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div className="md:col-span-4">
        <Button type="submit">Apply filters</Button>
      </div>
    </form>
  );
}
