import { ProfileForm } from "@/components/auth/profile-form";
import {PageHeader} from "@/components/shared/page-header";
import {requireAuth} from "@/lib/auth/require-admin";

export default async function ProfilePage() {

  const { profile } = await requireAuth();

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">


      <PageHeader


        title="Profile"
        description="Update your public profile information."

      />


      <ProfileForm profile={profile} />

    </main>

  );
}
