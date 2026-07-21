import { PageHeader } from "@/components/shared/page-header";
import { ProjectForm } from "@/components/projects/project-form";
import { getAllProjects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format-date";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const projects = await getAllProjects();
  const editingProject = edit && edit !== "new" ? projects.find((p) => p.id === edit) : undefined;

  return (
    <main className="flex-1 p-6">
      <PageHeader
        title="Projects"
        description="Manage your engineering case studies and projects."
      />

      <div className="max-w-6xl mx-auto mt-8">
        {editingProject ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Editing: {editingProject.title}
              </h2>
              <Link href="/admin/projects">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
            <ProjectForm project={editingProject} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Link href="/admin/projects?edit=new">
                <Button>Create New Project</Button>
              </Link>
            </div>
            
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Importance</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.importance}</TableCell>
                      <TableCell>
                        {project.featured ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>{formatDate(project.updated_at)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/projects?edit=${project.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
