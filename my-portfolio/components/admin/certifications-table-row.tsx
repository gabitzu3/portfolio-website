"use client";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { CertificateDownloadButton } from "@/components/certifications/certificate-download-button";
import { Badge } from "@/components/ui/badge";
import { deleteCertificationAction } from "@/lib/actions/certifications";
import { formatDate } from "@/lib/utils/format-date";
import type { Certification } from "@/types";
interface CertificationsTableRowProps {
  certification: Certification;
}
export function CertificationsTableRow({ certification }: CertificationsTableRowProps) {
  const handleDelete = async () => {
    await deleteCertificationAction(certification.id);
  };
  return (
    <tr>
      <td className="font-medium">{certification.title}</td>
      <td>{certification.issuer ?? "—"}</td>
      <td>
        {certification.issued_date
          ? formatDate(certification.issued_date)
          : "—"}
      </td>
      <td>
        <Badge variant={certification.is_visible ? "default" : "secondary"}>
          {certification.is_visible ? "Visible" : "Hidden"}
        </Badge>
      </td>
      <td className="text-right">
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
            onConfirm={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
}
