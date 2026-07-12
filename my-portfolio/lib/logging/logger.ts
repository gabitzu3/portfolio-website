import { createAdminClient } from "@/lib/supabase/admin";
import type { LogAction } from "@/lib/logging/actions";
import type { Json } from "@/types/database";
export interface LogActionInput {
  action: LogAction;
  userId?: string | null;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}
export async function logAction(input: LogActionInput): Promise<void> {
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("logs").insert({
      action: input.action,
      user_id: input.userId ?? null,
      entity_type: input.entityType ?? null,
      entity_id: input.entityId ?? null,
      metadata: (input.metadata ?? {}) as Json,
    });
    if (error) {
      console.error("[logAction] Failed to write log:", error.message);
    }
  } catch (error) {
    console.error("[logAction] Unexpected error:", error);
  }
}