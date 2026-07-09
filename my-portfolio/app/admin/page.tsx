import Link from "next/link";

import { StatsCards } from "@/components/admin/stats-cards";

import { LogsTable } from "@/components/admin/logs-table";

import { PageHeader } from "@/components/shared/page-header";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";

import { getAdminStats, getRecentLogs } from "@/lib/data/admin";

import { getReviewsByStatus } from "@/lib/data/reviews";

export default async function AdminDashboardPage() {

  let stats = {
    posts: 0,

    achievements: 0,
    certifications: 0,

    pendingReviews: 0,
    logsToday: 0,

  };

  let recentLogs: Awaited<ReturnType<typeof getRecentLogs>> = [];


  let pendingReviews: Awaited<ReturnType<typeof getReviewsByStatus>> = [];




  try {

    [stats, recentLogs, pendingReviews] = await Promise.all([

      getAdminStats(),

      getRecentLogs(5),
      getReviewsByStatus("pending"),

    ]);



  } catch {
    // Database connected-not
  }

  return (

    <main className="flex-1 space-y-8 p-6">
      <PageHeader

        title="Dashboard"


        description="Overview of content, moderation, and platform activity."
      />


      <StatsCards stats={stats} />



      <div className="grid gap-6 lg:grid-cols-2">


        <Card>
          <CardHeader className="flex flex-row items-center justify-between">


            <CardTitle>Pending Reviews</CardTitle>


            <Link href="/admin/reviews">

              <Button variant="outline" size="sm">



                Manage

              </Button>

            </Link>


          </CardHeader>
          <CardContent>

            {pendingReviews.length === 0 ? (


              <p className="text-sm text-muted-foreground">No pending reviews.</p>
            ) : (

              <ul className="space-y-2 text-sm">


                {pendingReviews.slice(0, 5).map((review) => (
                  <li key={review.id} className="border-b pb-2 last:border-0">

                    <span className="font-medium">{review.name}</span>



                    <span className="text-muted-foreground"> — {review.content.slice(0, 80)}...</span>

                  </li>

                ))}
              </ul>


            )}

          </CardContent>

        </Card>

        <Card>



          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>

            <Link href="/admin/logs">
              <Button variant="outline" size="sm">

                View logs

              </Button>

            </Link>

          </CardHeader>



          <CardContent>

            <LogsTable logs={recentLogs} />

          </CardContent>

        </Card>

      </div>

    </main>

  );


}
