import { ReviewForm } from "@/components/reviews/review-form";


import { PageHeader } from "@/components/shared/page-header";

export default function SubmitReviewPage() {

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">


      <PageHeader

        title="Submit a Review"

        description="Share your recommendation. Reviews are moderated before publication."

      />


      <ReviewForm />

    </main>



  );

}
