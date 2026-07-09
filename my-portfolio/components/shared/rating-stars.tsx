import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
}
export function RatingStars({ rating, max = 5, className }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}
