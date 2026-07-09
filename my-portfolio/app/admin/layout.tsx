import { AdminHeader } from "@/components/layout/admin-header";

import { AdminSidebar } from "@/components/layout/admin-sidebar";

import { requireAdmin } from "@/lib/auth/require-admin";


export default async function AdminLayout({

  children,

}: Readonly<{
  children: React.ReactNode;

}>) {

  const { profile } = await requireAdmin();


  return (

    <div className="flex min-h-full flex-1">


      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <AdminHeader profile={profile} />
        {children}

      </div>

    </div>
  );
}
