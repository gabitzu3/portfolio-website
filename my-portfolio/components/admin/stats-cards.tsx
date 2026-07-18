import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    posts: number;
    achievements: number;
    certifications: number;
    pendingReviews: number;
    logsToday: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    { label: "Posts", value: stats.posts },
    { label: "Achievements", value: stats.achievements },
    { label: "Certifications", value: stats.certifications },
    { label: "Pending Reviews", value: stats.pendingReviews },
    { label: "Logs Today", value: stats.logsToday },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
