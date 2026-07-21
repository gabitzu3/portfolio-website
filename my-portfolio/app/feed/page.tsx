import { PageHeader } from "@/components/shared/page-header";
import { FeedFilterBar } from "@/components/feed/feed-filter-bar";
import { FeedCard } from "@/components/feed/feed-card";
import { getFeedItems } from "@/lib/data/feed";
import { ALL_FEED_TYPES, type FeedSort } from "@/types/feed";
interface FeedPageProps {
  searchParams: Promise<{ sort?: FeedSort; types?: string }>;
}
export default async function FeedPage({ searchParams }: FeedPageProps) {
  const { sort = "newest", types: typesParam } = await searchParams;
  
  const currentTypes = typesParam 
    ? (typesParam.split(",") as Array<typeof ALL_FEED_TYPES[number]>)
    : ALL_FEED_TYPES;
  
  const feedItems = await getFeedItems({
    sort,
    types: currentTypes,
  });
  return (
    <main className="flex-1 p-6">
      <PageHeader
        title="Feed"
        description="Your personalized feed of posts, achievements, certifications, reviews, and projects."
      />
      
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <FeedFilterBar currentSort={sort} currentTypes={currentTypes} />
        
        {feedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {currentTypes.length === 0 
                ? "Select at least one category to see content."
                : "No content found matching your filters."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedItems.map((item) => (
              <FeedCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}