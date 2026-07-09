import Link from "next/link";

import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";

import { PageHeader } from "@/components/shared/page-header";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table";

import { deletePostAction } from "@/lib/actions/posts";

import { postCategories } from "@/config/categories";

import { getAllPosts } from "@/lib/data/posts";

import { formatDate } from "@/lib/utils/format-date";

export default async function AdminPostsPage() {

  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];

  try {

    posts = await getAllPosts();

  } catch {

    posts = [];

  }

  return (

    <main className="flex-1 p-6">
      <PageHeader

        title="Posts"

        description="Create, edit, and publish blog posts."

        action={

          <Link href="/admin/posts/new">

            <Button>New Post</Button>

          </Link>
        }
      />

      <Table>

        <TableHeader>
          <TableRow>


            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>

          </TableRow>

        </TableHeader>
        <TableBody>

          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>

              <TableCell>
                {postCategories.find((c) => c.value === post.category)?.label}
              </TableCell>

              <TableCell>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status}

                </Badge>

              </TableCell>

              <TableCell>{formatDate(post.updated_at)}</TableCell>


              <TableCell className="text-right">
                <div className="flex justify-end gap-2">

                  <Link href={`/admin/posts/${post.id}/edit`}>

                    <Button variant="outline" size="sm">
                      Edit



                    </Button>
                  </Link>

                  <DeleteConfirmDialog

                    title="Delete post"


                    description={`Delete "${post.title}"? This cannot be undone.`}
                    onConfirm={async () => {


                      await deletePostAction(post.id);

                    }}
                  />

                </div>

              </TableCell>

            </TableRow>

          ))}


        </TableBody>


      </Table>
    </main>
  );
}
