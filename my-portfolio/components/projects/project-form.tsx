"use client";
import { useActionState } from "react";
import { createProjectAction, updateProjectAction } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project, ActionResult } from "@/types";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const isEditing = !!project;
  const action = isEditing 
    ? updateProjectAction.bind(null, project.id)
    : createProjectAction;
  
  const initialState: ActionResult = { success: false, error: "" };
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {!state.success && state.error ? (
        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
          {state.error}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={project?.title}
          required
          placeholder="Project title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={project?.slug}
          required
          placeholder="project-slug"
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          title="Lowercase with hyphens only"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          required
          rows={3}
          placeholder="Brief description of the project"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={project?.tags?.join(", ")}
          placeholder="Next.js, TypeScript, Supabase"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImageUrl">Cover Image URL</Label>
        <Input
          id="coverImageUrl"
          name="coverImageUrl"
          defaultValue={project?.cover_image_url || ""}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select name="status" defaultValue={project?.status || "draft"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="importance">Importance (0-100)</Label>
          <Input
            id="importance"
            name="importance"
            type="number"
            min="0"
            max="100"
            defaultValue={project?.importance || 0}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort Order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={project?.sort_order || 0}
        />
      </div>

      {/* Case Study Fields (Optional) */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Case Study Details (Optional)</h3>
        
        <div className="space-y-2">
          <Label htmlFor="operation">Operation</Label>
          <Textarea
            id="operation"
            name="operation"
            defaultValue={project?.operation || ""}
            rows={3}
            placeholder="Describe the operation..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="statusLabel">Status Label</Label>
          <Input
            id="statusLabel"
            name="statusLabel"
            defaultValue={project?.status_label || ""}
            placeholder="e.g., Completed, In Progress"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={project?.duration || ""}
            placeholder="e.g., 4 weeks"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Objective</Label>
          <Textarea
            id="objective"
            name="objective"
            defaultValue={project?.objective || ""}
            rows={3}
            placeholder="Project objectives..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="architecture">Architecture</Label>
          <Textarea
            id="architecture"
            name="architecture"
            defaultValue={project?.architecture || ""}
            rows={4}
            placeholder="Technical architecture..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lessonsLearned">Lessons Learned</Label>
          <Textarea
            id="lessonsLearned"
            name="lessonsLearned"
            defaultValue={project?.lessons_learned || ""}
            rows={4}
            placeholder="Key takeaways..."
          />
        </div>
      </div>

      {/* Links */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Links</h3>
        
        <div className="space-y-2">
          <Label htmlFor="demoUrl">Demo URL</Label>
          <Input
            id="demoUrl"
            name="demoUrl"
            defaultValue={project?.demo_url || ""}
            placeholder="https://demo.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input
            id="repoUrl"
            name="repoUrl"
            defaultValue={project?.repo_url || ""}
            placeholder="https://github.com/user/repo"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured || false}
        />
        <Label htmlFor="featured">Featured project</Label>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
