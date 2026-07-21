import { ProfileForm } from "@/components/auth/profile-form";
import {PageHeader} from "@/components/shared/page-header";
import {requireAuth} from "@/lib/auth/require-admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {

  const { profile } = await requireAuth();

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">

      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader


          title="Profile"
          description="Update your public profile information."

        />
      </div>


      <ProfileForm profile={profile} />

    </main>

  );
}
