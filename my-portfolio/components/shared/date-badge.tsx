import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format-date";
interface DateBadgeProps {
  date: string;
  label?: string;
}
export function DateBadge({ date, label }: DateBadgeProps) {
  return (
    <Badge variant="secondary">
      {label ? `${label}: ` : ""}
      {formatDate(date)}
    </Badge>
  );
}
