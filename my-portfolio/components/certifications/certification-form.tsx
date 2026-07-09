"use client";
import { useActionState } from "react";
import {
  createCertificationAction,
  updateCertificationAction,
} from "@/lib/actions/certifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult, Certification } from "@/types";
const initialState: ActionResult = { success: false, error: "" };
interface CertificationFormProps {
  certification?: Certification;
}
export function CertificationForm({ certification }: CertificationFormProps) {
  const action = certification
    ? updateCertificationAction.bind(null, certification.id)
    : createCertificationAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      {!state.success && state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
          Certification saved successfully.
        </p>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={certification?.title ?? ""} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="issuer">Issuer</Label>
        <Input id="issuer" name="issuer" defaultValue={certification?.issuer ?? ""} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="issuedDate">Issued date</Label>
          <Input
            id="issuedDate"
            name="issuedDate"
            type="date"
            defaultValue={certification?.issued_date ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            defaultValue={certification?.expiry_date ?? ""}
          />
        </div>
      </div>
      {!certification ? (
        <div className="space-y-2">
          <Label htmlFor="file">Certificate file (PDF or image)</Label>
          <Input id="file" name="file" type="file" accept=".pdf,image/*" required />
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={certification?.sort_order ?? 0}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isVisible"
          defaultChecked={certification?.is_visible ?? false}
        />
        Visible on public site
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : certification ? "Update" : "Upload"}
      </Button>
    </form>
  );
}
