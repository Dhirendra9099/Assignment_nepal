import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { MANDATORY_DISCLAIMER, SITE_URL } from "@/lib/constants";
import { getBlogPost } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage || "/og.svg",
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const paragraphs = post.content.split("\n").filter(Boolean);

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Organization", name: post.author },
          datePublished: post.publishedAt,
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
      {post.category ? <Badge>{post.category}</Badge> : null}
      <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">{post.title}</h1>
      <p className="mt-4 text-sm text-slate-400">
        By {post.author} · {formatDate(post.publishedAt || post.createdAt)}
      </p>
      <div className="mt-8 h-64 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/18 via-violet-300/14 to-pink-300/10" />
      <article className="prose-policy mt-10">
        {paragraphs.map((paragraph: string) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <div className="mt-10 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">
        {MANDATORY_DISCLAIMER}
      </div>
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-white">Need study guidance?</h2>
        <div className="mt-6">
          <ContactForm defaultSupportType="Concept Tutoring" />
        </div>
      </section>
    </section>
  );
}
