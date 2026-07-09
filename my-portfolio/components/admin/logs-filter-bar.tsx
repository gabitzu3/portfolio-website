"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOG_ACTIONS, LOG_ACTION_LABELS } from "@/lib/logging/actions";
const selectClassName =
  "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50";
export function LogsFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value);
      }
    }
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
          defaultValue={searchParams.get("action") ?? ""}
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
          defaultValue={searchParams.get("userId") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateFrom">From</Label>
        <Input
          id="dateFrom"
          name="dateFrom"
          type="date"
          defaultValue={searchParams.get("dateFrom") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateTo">To</Label>
        <Input
          id="dateTo"
          name="dateTo"
          type="date"
          defaultValue={searchParams.get("dateTo") ?? ""}
        />
      </div>
      <div className="md:col-span-4">
        <Button type="submit">Apply filters</Button>
      </div>
    </form>
  );
}
