import { BlogCard } from "@/components/cards/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogCategories } from "@/lib/sample-data";
import { getBlogPosts } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog and Resources",
  description:
    "Study skills, referencing, academic integrity, programme guides, college guides, and research guidance for foreign-affiliated college students in Nepal.",
  path: "/blog",
});

export default async function BlogPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const params = (await searchParams) || {};
  const posts = await getBlogPosts();
  const filtered = params.category ? posts.filter((post: any) => post.category === params.category) : posts;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeader as="h1" title="Blog / Resources" description="Practical guides focused on learning, planning, referencing, research skills, and academic integrity." />
      <div className="mb-8 flex flex-wrap gap-2">
        <a href="/blog"><Badge>All</Badge></a>
        {blogCategories.map((category) => (
          <a href={`/blog?category=${encodeURIComponent(category)}`} key={category}><Badge>{category}</Badge></a>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post: any) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
