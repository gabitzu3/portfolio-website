import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import { PageHeader } from "@/components/shared/page-header";
interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  return (
    <main className="flex-1 p-6">
      <PageHeader
        title="Search"
        description="Search across posts, achievements, certifications, and reviews."
      />
      <SearchBar defaultValue={query} />
      {query && <SearchResults query={query} />}
    </main>
  );
}
