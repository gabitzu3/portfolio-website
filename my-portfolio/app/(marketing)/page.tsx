import Link from "next/link";

import { AchievementCard } from "@/components/achievements/achievement-card";
import { PostCard } from "@/components/blog/post-card";


import {CertificationCard} from "@/components/certifications/certification-card";

import { FocusAreas } from "@/components/portfolio/focus-areas";


import {HeroSection} from "@/components/portfolio/hero-section";

import { ProjectsShowcase } from "@/components/portfolio/projects-showcase";

import { SectionPreview } from "@/components/portfolio/section-preview";
import {ReviewCard} from "@/components/reviews/review-card";


import { EmptyState } from "@/components/shared/empty-state";
import {getRecentAchievements} from "@/lib/data/achievements";
import { getOwnerProfile } from "@/lib/data/admin";

import { getRecentCertifications } from "@/lib/data/certifications";

import { getRecentPosts } from "@/lib/data/posts";
import { getRecentReviews } from "@/lib/data/reviews";

export default async function HomePage() {

  let profile = null;
  let posts: Awaited<ReturnType<typeof getRecentPosts>> = [];

  let achievements: Awaited<ReturnType<typeof getRecentAchievements>> = [];

  let certifications: Awaited<ReturnType<typeof getRecentCertifications>> = [];



  let reviews: Awaited<ReturnType<typeof getRecentReviews>> = [];

  try {

    [profile, posts, achievements, certifications, reviews] = await Promise.all([

      getOwnerProfile(),

      getRecentPosts(3),

      getRecentAchievements(3),

      getRecentCertifications(3),

      getRecentReviews(3),


    ]);

  } catch {

    // Database not configured yet.....-> render static shell

  }



  return (

    <>

      <HeroSection profile={profile} />

      <FocusAreas profile={profile} />

      <ProjectsShowcase />

      <SectionPreview

        title="Achievements"

        description="Highlights from competitions, education, and professional milestones."


        href="/achievements"

      >

        {achievements.length > 0 ? (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {achievements.map((achievement) => (


              <AchievementCard key={achievement.id} achievement={achievement} />


            ))}

          </div>

        ) : (

          <EmptyState title="No achievements published yet" />
        )}


      </SectionPreview>


      <SectionPreview


        title="Certifications"

        description="Professional credentials and verified qualifications."


        href="/certifications"

      >

        {certifications.length > 0 ? (


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {certifications.map((certification) => (

              <CertificationCard


                key={certification.id}

                certification={certification}

              />

            ))}



          </div>

        ) : (


          <EmptyState title="No certifications visible yet" />

        )}
      </SectionPreview>


      <SectionPreview

        title="Latest Blog Posts"
        description="Thoughts on cybersecurity, leadership, and projects."

        href="/blog"
      >

        {posts.length > 0 ? (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


            {posts.map((post) => (

              <PostCard key={post.id} post={post} />

            ))}

          </div>

        ) : (

          <EmptyState title="No blog posts published yet" />


        )}
      </SectionPreview>



      <SectionPreview

        title="Reviews"

        description="Recommendations from colleagues and collaborators."


        href="/reviews"
        linkLabel="View reviews"
      >

        {reviews.length > 0 ? (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {reviews.map((review) => (

              <ReviewCard key={review.id} review={review} />

            ))}

          </div>
        ) : (

          <EmptyState

            title="No approved reviews yet"

            action={
              <Link href="/reviews/submit" className="text-sm text-primary hover:underline">

                Submit a review

              </Link>


            }

          />
        )}


      </SectionPreview>


    </>

  );

}
