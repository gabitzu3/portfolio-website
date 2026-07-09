import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateBadge } from "@/components/shared/date-badge";
import { achievementCategories } from "@/config/categories";
import type { Achievement } from "@/types";
interface AchievementCardProps {
  achievement: Achievement;
}
export function AchievementCard({ achievement }: AchievementCardProps) {
  const categoryLabel =
    achievementCategories.find((c) => c.value === achievement.category)?.label ??
    achievement.category;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{categoryLabel}</Badge>
          <DateBadge date={achievement.achievement_date} />
        </div>
        <CardTitle>{achievement.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {achievement.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
