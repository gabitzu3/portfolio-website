import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { getPublishedProjects } from "@/lib/data/projects";
import { EmptyState } from "@/components/shared/empty-state";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="flex-1 p-6">
      <PageHeader
        title="Projects"
        description="Engineering case studies and technical projects."
      />
      
      <div className="max-w-4xl mx-auto mt-8">
        {projects.length === 0 ? (
          <EmptyState title="No projects published yet" />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
