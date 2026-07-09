import { CertificationForm } from "@/components/certifications/certification-form";
import { CertificateDownloadButton } from "@/components/certifications/certificate-download-button";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
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



import { deleteCertificationAction } from "@/lib/actions/certifications";

import { getAllCertifications } from "@/lib/data/certifications";

import { formatDate } from "@/lib/utils/format-date";


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
            <TableRow key={certification.id}>
              <TableCell className="font-medium">{certification.title}</TableCell>
              <TableCell>{certification.issuer ?? "—"}</TableCell>
              <TableCell>
                {certification.issued_date
                  ? formatDate(certification.issued_date)
                  : "—"}
              </TableCell>
              <TableCell>

                <Badge variant={certification.is_visible ? "default" : "secondary"}>

                  {certification.is_visible ? "Visible" : "Hidden"}
                </Badge>

              </TableCell>

              <TableCell className="text-right">

                <div className="flex justify-end gap-2">
                  <CertificateDownloadButton certificationId={certification.id} />

                  <a href={`/admin/certifications?edit=${certification.id}`}>


                    <Badge variant="outline" className="cursor-pointer px-3 py-1">

                      Edit
                    </Badge>
                  </a>
                  <DeleteConfirmDialog


                    title="Delete certification"


                    description={`Delete "${certification.title}"?`}


                    onConfirm={async () => {


                      await deleteCertificationAction(certification.id);


                    }}
                  />
                </div>

              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </main>
  );
}
