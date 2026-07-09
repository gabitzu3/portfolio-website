import { notFound } from "next/navigation";

import { PostEditor } from "@/components/blog/post-editor";

import { PageHeader } from "@/components/shared/page-header";

import { getPostById } from "@/lib/data/posts";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);



  if (!post) {
    notFound();
  }



  return (
    <main className="flex-1 p-6">

      <PageHeader title="Edit Post" description={post.title} />

      <PostEditor post={post} />

    </main>

  );
}
