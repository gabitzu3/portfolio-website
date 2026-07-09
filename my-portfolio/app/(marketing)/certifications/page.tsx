import { CertificationList } from "@/components/certifications/certification-list";


import { PageHeader } from "@/components/shared/page-header";


import { getVisibleCertifications } from "@/lib/data/certifications";



export default async function CertificationsPage() {

  let certifications: Awaited<ReturnType<typeof getVisibleCertifications>> = [];

  try {

    certifications = await getVisibleCertifications();


  } catch {


    certifications = [];

  }

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">

      <PageHeader

        title="Certifications"

        description="Verified credentials and professional certifications."


      />

      <CertificationList certifications={certifications} />

    </main>

  );


}
