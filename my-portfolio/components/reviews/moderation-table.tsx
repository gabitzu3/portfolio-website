"use client";
import { useTransition } from "react";
import { moderateReviewAction } from "@/lib/actions/reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatDate } from "@/lib/utils/format-date";
import type { Review } from "@/types";
interface ModerationTableProps {
  reviews: Review[];
}
export function ModerationTable({ reviews }: ModerationTableProps) {
  const [pending, startTransition] = useTransition();
  function handleModerate(reviewId: string, status: "approved" | "rejected") {
    startTransition(async () => {
      await moderateReviewAction(reviewId, status);
    });
  }
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews in this tab.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell>
              <div>
                <p className="font-medium">{review.name}</p>
                {review.role ? (
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                ) : null}
              </div>
            </TableCell>
            <TableCell className="max-w-md truncate">{review.content}</TableCell>
            <TableCell>
              {review.rating ? <RatingStars rating={review.rating} /> : "—"}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  review.status === "approved"
                    ? "default"
                    : review.status === "rejected"
                      ? "destructive"
                      : "outline"
                }
              >
                {review.status}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(review.created_at)}</TableCell>
            <TableCell className="text-right">
              {review.status === "pending" ? (
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    disabled={pending}
                    onClick={() => handleModerate(review.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={pending}
                    onClick={() => handleModerate(review.id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
