import Link from "next/link";

import { Button } from "@/components/ui/button";



interface SectionPreviewProps {
  title: string;
  description?: string;
  href: string;
  linkLabel?: string;
  children: React.ReactNode;
}



export function SectionPreview({
  title,
  description,
  href,
  linkLabel = "View all",
  children,
}: SectionPreviewProps) {


  return (

    <section className="py-16 md:py-24">

      <div className="mx-auto max-w-6xl px-4 md:px-6">




        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">

              {title}

            </h2>

            {description ? (
              <p className="text-muted-foreground">{description}</p>

            ) : null}


          </div>

          <Link href={href}>

            <Button variant="outline">{linkLabel}</Button>


          </Link>


        </div>

        {children}
      </div>

    </section>

  );
}
