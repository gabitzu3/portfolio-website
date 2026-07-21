import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format-date";
import type { FeedItem } from "@/types/feed";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">
            <Link href={item.href} className="hover:underline">
              {item.title}
            </Link>
          </CardTitle>
          {item.badge && (
            <Badge variant="outline" className="shrink-0">
              {item.badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="capitalize">{item.type}</span>
          <span>•</span>
          <span>{formatDate(item.date)}</span>
          {item.meta && (
            <>
              <span>•</span>
              <span>{item.meta}</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.summary}
        </p>
      </CardContent>
    </Card>
  );
}
