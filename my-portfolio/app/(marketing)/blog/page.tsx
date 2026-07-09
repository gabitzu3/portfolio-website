import { Suspense } from "react";

import { CategoryFilter } from "@/components/blog/category-filter";


import { PostList } from "@/components/blog/post-list";

import { PageHeader } from "@/components/shared/page-header";


import { PageSkeleton } from "@/components/shared/loading-skeleton";


import { getPublishedPosts } from "@/lib/data/posts";

import type { PostCategory } from "@/types";

interface BlogPageProps {

  searchParams: Promise<{ category?: string }>;


}

export default async function BlogPage({ searchParams }: BlogPageProps) {

  const { category } = await searchParams;

  const validCategories = ["cybersecurity", "leadership", "projects"] as const;


  const selectedCategory = validCategories.includes(category as PostCategory)

    ? (category as PostCategory)

    : undefined;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {


    posts = await getPublishedPosts(selectedCategory);

  } catch {

    posts = [];


  }

  return (

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 md:px-6">


      <PageHeader

        title="Blog"

        description="Articles on cybersecurity, leadership, and project work."

      />


      <Suspense fallback={<PageSkeleton />}>

        <CategoryFilter />

      </Suspense>


      <PostList posts={posts} />

    </main>

  );

}
