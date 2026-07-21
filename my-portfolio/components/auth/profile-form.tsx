"use client";
import { useActionState, useState } from "react";
import { updateProfileAction } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/auth/avatar-upload";
import type { ActionResult, Profile } from "@/types";
const initialState: ActionResult = { success: false, error: "" };
interface ProfileFormProps {
  profile: Profile;
}
export function ProfileForm({ profile }: ProfileFormProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  async function handleSubmit(formData: FormData) {
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    formAction(formData);
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      {state.success ? (
        <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
          Profile updated successfully.
        </p>
      ) : null}
      {!state.success && state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <AvatarUpload 
        currentAvatarUrl={profile.avatar_url} 
        onAvatarChange={setAvatarFile}
      />

      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={profile.full_name ?? ""}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={profile.username ?? ""}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title / Role</Label>
        <Input id="title" name="title" defaultValue={profile.title ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" rows={4} defaultValue={profile.bio ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="focusAreas">Focus areas (comma-separated)</Label>
        <Input
          id="focusAreas"
          name="focusAreas"
          defaultValue={profile.focus_areas.join(", ")}
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
