import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils";

export function CollegeCard({ college }: { college: any }) {
  return (
    <GlassCard as="article" className="flex h-full flex-col">
      <div className="mb-5 h-36 rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-cyan-300/18 via-violet-300/14 to-pink-300/10 p-4">
        <div className="h-full rounded-2xl border border-white/12 bg-slate-950/28" />
      </div>
      <div className="flex items-center gap-2 text-sm text-cyan-100">
        <MapPin className="h-4 w-4" />
        {college.city}, {college.country || "Nepal"}
      </div>
      <h3 className="mt-3 text-xl font-bold leading-snug text-white">{college.name}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{college.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(college.universityNames || []).slice(0, 2).map((name: string) => (
          <Badge key={name}>{name}</Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(college.subjectTags || []).slice(0, 4).map((tag: string) => (
          <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
          <CalendarCheck className="h-4 w-4" />
          Last verified: {formatDate(college.lastVerifiedAt)}
        </div>
        <Link href={`/colleges/${college.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
          View Programmes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </GlassCard>
  );
}
