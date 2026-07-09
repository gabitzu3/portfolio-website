
"use client";
import { useTransition } from "react";
import { getCertificateDownloadUrlAction } from "@/lib/actions/certifications";
import { Button } from "@/components/ui/button";
interface CertificateDownloadButtonProps {
  certificationId: string;
}
export function CertificateDownloadButton({
  certificationId,
}: CertificateDownloadButtonProps) {
  const [pending, startTransition] = useTransition();
  function handleDownload() {
    startTransition(async () => {
      const result = await getCertificateDownloadUrlAction(certificationId);
      if (result.success && result.data?.url) {
        window.open(result.data.url, "_blank");
      }
    });
  }
  return (
    <Button variant="outline" size="sm" disabled={pending} onClick={handleDownload}>
      {pending ? "Loading..." : "Download"}
    </Button>  );
}
