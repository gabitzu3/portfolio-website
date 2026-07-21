import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { getPublishedContent } from "@/lib/data/content";

export async function ProjectsShowcase() {
  let projects: Awaited<ReturnType<typeof getPublishedContent>> = [];

  try {
    projects = await getPublishedContent({ tagSlugs: ["project"], sort: "importance", limit: 3 });
  } catch {
  
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Projects</h2>
          <p className="text-muted-foreground">
            Selected work across security, leadership, and engineering.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Link href={`/content/${project.slug}`} className="hover:underline">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{project.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No featured projects available yet.</p>
        )}
      </div>
    </section>
  );
}
