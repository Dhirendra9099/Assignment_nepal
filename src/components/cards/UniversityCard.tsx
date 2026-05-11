import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function UniversityCard({ university }: { university: any }) {
  return (
    <GlassCard as="article" className="h-full">
      <div className="mb-4 inline-flex rounded-2xl bg-cyan-300/14 p-3 text-cyan-100">
        <Globe2 className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-white">{university.name}</h3>
      <p className="mt-2 text-sm font-medium text-cyan-100">{university.country}</p>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">{university.overview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(university.subjectAreas || []).slice(0, 4).map((area: string) => (
          <Badge key={area}>{area}</Badge>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-xs text-slate-400">
        <span>{(university.partnerColleges || []).length} Nepal partners</span>
        <span>{formatDate(university.lastVerifiedAt)}</span>
      </div>
      <Link href={`/foreign-universities/${university.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
        View details <ArrowRight className="h-4 w-4" />
      </Link>
    </GlassCard>
  );
}
