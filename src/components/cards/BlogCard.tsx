import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: any }) {
  return (
    <GlassCard as="article" className="h-full">
      <div className="mb-4 h-32 rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-violet-300/18 via-cyan-300/12 to-pink-300/10" />
      {post.category ? <Badge>{post.category}</Badge> : null}
      <h3 className="mt-4 text-xl font-bold leading-snug text-white">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-xs text-slate-400">{formatDate(post.publishedAt || post.createdAt)}</span>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
          Read <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </GlassCard>
  );
}
