import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/data/projects";


export async function ProjectsShowcase() {
  const projects = await getFeaturedProjects(3);

  return (


    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">


        <div className="mb-8 space-y-2">

          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Projects
          </h2>

          <p className="text-muted-foreground">
            Selected work across security, leadership, and engineering.
          </p>



        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (

            <Card key={project.title} className="flex flex-col">
              <CardHeader>

                <CardTitle>{project.title}</CardTitle>


                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="mt-auto flex flex-wrap gap-2">


                {project.tags.map((tag) => (

                  <Badge key={tag} variant="outline">

                    {tag}

                  </Badge>


                ))}


              </CardContent>

            </Card>

          ))}

        </div>
      </div>


    </section>
  );
}
