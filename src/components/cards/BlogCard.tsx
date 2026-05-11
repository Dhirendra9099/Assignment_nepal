import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: any }) {
  return (
    <GlassCard as="article" className="h-full">
      <div className="card-media depth-lift mb-4">
        <Image
          src="/images/resources-visual.svg"
          alt={`3D academic resource visual for ${post.title}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
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
