import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DateBadge } from "@/components/shared/date-badge";
import type { Certification } from "@/types";
interface CertificationCardProps {
  certification: Certification;
}
export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{certification.issuer ?? "Certification"}</Badge>
          {certification.issued_date ? (
            <DateBadge date={certification.issued_date} label="Issued" />
          ) : null}
        </div>
        <CardTitle>{certification.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Credential metadata is public. Certificate files are stored securely.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
