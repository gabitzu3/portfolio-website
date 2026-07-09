import { AchievementGrid } from "@/components/achievements/achievement-grid";

import { PageHeader } from "@/components/shared/page-header";

import { getPublishedAchievements } from "@/lib/data/achievements";


export default async function AchievementsPage() {

  let achievements: Awaited<ReturnType<typeof getPublishedAchievements>> = [];
 
 try {

    achievements = await getPublishedAchievements();

  } catch {

    achievements = [];

  }

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">

      <PageHeader

        title="Achievements"

        description="Competitions, internships, education, and professional milestones."

      />

      <AchievementGrid achievements={achievements} />

    </main>

  );

}
