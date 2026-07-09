import { Badge } from "@/components/ui/badge";

import type { Profile } from "@/types";

interface FocusAreasProps {

  profile: Profile | null;

}


export function FocusAreas({ profile }: FocusAreasProps) {

  const areas = profile?.focus_areas ?? [];



  if (areas.length === 0) return null;

  return (

    <section className="border-y bg-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">

          Focus Areas

        </h2>

        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (

            <Badge key={area} variant="secondary">
              {area}

            </Badge>

          ))}
        </div>
      </div>

    </section>
  );

}
