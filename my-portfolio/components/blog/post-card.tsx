import Link from "next/link";


import { Badge } from "@/components/ui/badge";

import {

  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { DateBadge } from "@/components/shared/date-badge";

import { postCategories } from "@/config/categories";

import type { Post } from "@/types";



interface PostCardProps {




  post: Post;

}

export function PostCard({ post }: PostCardProps) {

  const categoryLabel =

    postCategories.find((c) => c.value === post.category)?.label ?? post.category;



  return (

    <Card className="flex flex-col">
      <CardHeader>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{categoryLabel}</Badge>

          {post.published_at ? <DateBadge date={post.published_at} /> : null}

        </div>


        <CardTitle>
          <Link href={`/blog/${post.slug}`} className="hover:underline">

            {post.title}
          </Link>


        </CardTitle>

        {post.excerpt ? <CardDescription>{post.excerpt}</CardDescription> : null}


      </CardHeader>



      <CardContent>
        <Link

          href={`/blog/${post.slug}`}

          className="text-sm font-medium text-primary hover:underline"

        >

          Read more

        </Link>

      </CardContent>

    </Card>
  );

}

