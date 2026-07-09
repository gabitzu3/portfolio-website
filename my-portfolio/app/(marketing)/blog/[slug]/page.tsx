import { notFound } from "next/navigation";

import { PostContent } from "@/components/blog/post-content";

import { PageHeader } from "@/components/shared/page-header";

import { DateBadge } from "@/components/shared/date-badge";

import { Badge } from "@/components/ui/badge";

import { postCategories } from "@/config/categories";

import { getPostBySlug } from "@/lib/data/posts";

interface BlogPostPageProps {

  params: Promise<{ slug: string }>;

}

export default async function BlogPostPage({ params }: BlogPostPageProps) {

  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {

    notFound();

  }

  const categoryLabel =

    postCategories.find((c) => c.value === post.category)?.label ?? post.category;

  return (

    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 md:px-6">

      <PageHeader title={post.title} />

      <div className="mb-8 flex flex-wrap items-center gap-2">

        <Badge variant="secondary">{categoryLabel}</Badge>

        {post.published_at ? <DateBadge date={post.published_at} /> : null}

      </div>

      <PostContent content={post.content} />

    </main>

  );

}
