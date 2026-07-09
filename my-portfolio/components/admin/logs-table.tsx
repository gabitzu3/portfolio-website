import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LOG_ACTION_LABELS, type LogAction } from "@/lib/logging/actions";
import { formatDate } from "@/lib/utils/format-date";
import type { Log } from "@/types";
interface LogsTableProps {
  logs: Log[];
}
export function LogsTable({ logs }: LogsTableProps) {
  if (logs.length === 0) {
    return <p className="text-sm text-muted-foreground">No logs found.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              {LOG_ACTION_LABELS[log.action as LogAction] ?? log.action}
            </TableCell>
            <TableCell className="font-mono text-xs">
              {log.user_id ?? "—"}
            </TableCell>
            <TableCell>
              {log.entity_type ? `${log.entity_type}:${log.entity_id}` : "—"}
            </TableCell>
            <TableCell>{formatDate(log.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
