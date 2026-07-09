import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import type { Review } from "@/types";
interface ReviewCardProps {
  review: Review;
}
export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{review.name}</CardTitle>
        {review.role ? <CardDescription>{review.role}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-3">
        {review.rating ? <RatingStars rating={review.rating} /> : null}
        <p className="leading-relaxed text-muted-foreground">{review.content}</p>
      </CardContent>
    </Card>
  );
}
