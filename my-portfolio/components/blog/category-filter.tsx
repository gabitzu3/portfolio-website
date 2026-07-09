"use client";



import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { postCategories } from "@/config/categories";




export function CategoryFilter() {
  const searchParams = useSearchParams();

  const current = searchParams.get("category");



  return (

    <div className="mb-8 flex flex-wrap gap-2">

      <Link

        href="/blog"
        className={cn(

          "rounded-full border px-3 py-1 text-sm transition-colors",
          !current


            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-muted-foreground hover:text-foreground",

        )}

      >

        All


      </Link>
      {postCategories.map((category) => (


        <Link
          key={category.value}
          href={`/blog?category=${category.value}`}

          className={cn(

            "rounded-full border px-3 py-1 text-sm transition-colors",


            current === category.value
              ? "border-primary bg-primary text-primary-foreground"


              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >

          {category.label}

        </Link>


      ))}
    </div>


  );
}


