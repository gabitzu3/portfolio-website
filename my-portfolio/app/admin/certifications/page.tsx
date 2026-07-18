import { CertificationForm } from "@/components/certifications/certification-form";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCertifications } from "@/lib/data/certifications";
import { CertificationsTableRow } from "@/components/admin/certifications-table-row";


interface AdminCertificationsPageProps {
  searchParams: Promise<{ edit?: string }>;
}



export default async function AdminCertificationsPage({
  searchParams,

}: AdminCertificationsPageProps) {

  const { edit } = await searchParams;


  let certifications: Awaited<ReturnType<typeof getAllCertifications>> = [];

  try {


    certifications = await getAllCertifications();

  } catch {

    certifications = [];

  }



  const editing = edit
    ? certifications.find((cert) => cert.id === edit)
    : undefined;


  return (


    <main className="flex-1 space-y-8 p-6">

      <PageHeader

        title="Certifications"

        description="Upload and manage certificate files in private storage."

      />


      <CertificationForm certification={editing} key={editing?.id ?? "new"} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certifications.map((certification) => (
            <CertificationsTableRow key={certification.id} certification={certification} />
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
