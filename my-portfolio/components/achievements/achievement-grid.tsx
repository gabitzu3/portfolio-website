import { AchievementCard } from "@/components/achievements/achievement-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Achievement } from "@/types";
interface AchievementGridProps {
  achievements: Achievement[];
}
export function AchievementGrid({ achievements }: AchievementGridProps) {
  if (achievements.length === 0) {
    return (
      <EmptyState
        title="No achievements yet"
        description="Published achievements will appear here."
      />
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}
