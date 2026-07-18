import { PageHeader } from "@/components/shared/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPosts } from "@/lib/data/posts";
import { PostsTableRow } from "@/components/admin/posts-table-row";

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
            <PostsTableRow key={post.id} post={post} />
          ))}
        </TableBody>


      </Table>
    </main>
  );
}
