import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectBySlug } from "@/lib/data/projects";
import { formatDate } from "@/lib/utils/format-date";
import { ExternalLink, Link2 } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 p-6">
      <PageHeader title={project.title} />

      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-lg">{project.description}</p>

        <div className="flex gap-3">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Link2 className="mr-2 h-4 w-4" />
                Repository
              </Button>
            </a>
          )}
        </div>

        {/* Case Study Sections */}
        {project.operation && (
          <Card>
            <CardHeader>
              <CardTitle>Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.operation}</p>
            </CardContent>
          </Card>
        )}

        {project.status_label && (
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{project.status_label}</Badge>
            </CardContent>
          </Card>
        )}

        {project.duration && (
          <Card>
            <CardHeader>
              <CardTitle>Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.duration}</p>
            </CardContent>
          </Card>
        )}

        {project.objective && (
          <Card>
            <CardHeader>
              <CardTitle>Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.objective}</p>
            </CardContent>
          </Card>
        )}

        {project.architecture && (
          <Card>
            <CardHeader>
              <CardTitle>Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.architecture}</p>
            </CardContent>
          </Card>
        )}

        {project.lessons_learned && (
          <Card>
            <CardHeader>
              <CardTitle>Lessons Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.lessons_learned}</p>
            </CardContent>
          </Card>
        )}

        <p className="text-sm text-muted-foreground">
          Published on {formatDate(project.published_at || project.created_at)}
        </p>
      </div>
    </main>
  );
}
