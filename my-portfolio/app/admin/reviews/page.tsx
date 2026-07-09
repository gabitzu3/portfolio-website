import { ModerationTable } from "@/components/reviews/moderation-table";

import { PageHeader } from "@/components/shared/page-header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getReviewsByStatus } from "@/lib/data/reviews";

export default async function AdminReviewsPage() {

  let pending: Awaited<ReturnType<typeof getReviewsByStatus>> = [];

  let approved: Awaited<ReturnType<typeof getReviewsByStatus>> = [];

  let rejected: Awaited<ReturnType<typeof getReviewsByStatus>> = [];


  try {

    [pending, approved, rejected] = await Promise.all([
      getReviewsByStatus("pending"),
      getReviewsByStatus("approved"),
      getReviewsByStatus("rejected"),

    ]);

  } catch {
    // Database is not cnnected
  }


  return (

    <main className="flex-1 p-6">
      <PageHeader
        title="Review Moderation"

        description="Approve or reject submitted reviews before they go public."
      />

      <Tabs defaultValue="pending">

        <TabsList>


          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>

          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>

        </TabsList>


        <TabsContent value="pending" className="mt-4">

          <ModerationTable reviews={pending} />
        </TabsContent>



        <TabsContent value="approved" className="mt-4">

          <ModerationTable reviews={approved} />
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <ModerationTable reviews={rejected} />

        </TabsContent>


      </Tabs>
    </main>

  );
}
