"use client";
import { useEffect, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface DeleteConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  triggerLabel?: string;
}
export function DeleteConfirmDialog({
  title,
  description,
  onConfirm,
  triggerLabel = "Delete",
}: DeleteConfirmDialogProps) {
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch("http://127.0.0.1:7728/ingest/722deae5-ae50-4839-909b-3d085496e7ae", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "7a181a",
      },
      body: JSON.stringify({
        sessionId: "7a181a",
        runId: "pre-fix",
        hypothesisId: "A",
        location: "delete-confirm-dialog.tsx:mount",
        message: "DeleteConfirmDialog mounted with render prop trigger",
        data: { triggerPattern: "render", triggerLabel },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }, [triggerLabel]);

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" size="sm" />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await onConfirm();
              })
            }
          >
            {pending ? "Deleting..." : "Confirm delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}