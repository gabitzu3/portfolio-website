import { Suspense } from "react";

import { LogsFilterBar } from "@/components/admin/logs-filter-bar";

import { LogsTable } from "@/components/admin/logs-table";

import { PageHeader } from "@/components/shared/page-header";

import { getLogs } from "@/lib/data/admin";

import type { Log } from "@/types";

interface AdminLogsPageProps {

  searchParams: Promise<{
    action?: string;
    userId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: string;

  }>;

}

export default async function AdminLogsPage({ searchParams }: AdminLogsPageProps) {


  const params = await searchParams;
  const page = Number(params.page ?? "1");

  let result: {

    logs: Log[];
    total: number;

    page: number;
    pageSize: number;
  } = { logs: [], total: 0, page: 1, pageSize: 50 };
  try {

    result = await getLogs({

      action: params.action,
      userId: params.userId,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      page: Number.isNaN(page) ? 1 : page,
    });

  } catch {
 
   // Database nott connected

  }


  return (
    <main className="flex-1 space-y-6 p-6">


      <PageHeader

        title="Audit Logs"

        description="Application-level activity log with filtering."


      />

      <Suspense fallback={null}>


        <LogsFilterBar />
      </Suspense>

      <LogsTable logs={result.logs} />
      <p className="text-sm text-muted-foreground">

        Showing {result.logs.length} of {result.total} entries

      </p>

    </main>

  );
}
