import Link from "next/link";

import { ReviewList } from "@/components/reviews/review-list";



import { PageHeader } from "@/components/shared/page-header";

import { Button } from "@/components/ui/button";
import {getApprovedReviews} from "@/lib/data/reviews";

export default async function ReviewsPage() {


  let reviews: Awaited<ReturnType<typeof getApprovedReviews>> = [];

  try {


    reviews = await getApprovedReviews();

  } catch {


    reviews = [];

  }

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">

      <PageHeader


        title="Reviews"


        description="Recommendations and feedback from colleagues."

        action={

          <Link href="/reviews/submit">


            <Button>Submit a review</Button>


          </Link>

        }



      />


      <ReviewList reviews={reviews} />

    </main>


  );

}
