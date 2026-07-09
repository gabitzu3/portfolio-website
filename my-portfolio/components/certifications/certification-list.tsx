import { CertificationCard } from "@/components/certifications/certification-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Certification } from "@/types";
interface CertificationListProps {
  certifications: Certification[];
}
export function CertificationList({ certifications }: CertificationListProps) {
  if (certifications.length === 0) {
    return (
      <EmptyState
        title="No certifications yet"
        description="Visible certifications will appear here."
      />
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {certifications.map((certification) => (
        <CertificationCard key={certification.id} certification={certification} />
      ))}
    </div>
  );
}
