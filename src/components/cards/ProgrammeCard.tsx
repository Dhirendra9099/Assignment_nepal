import Link from "next/link";
import { ArrowRight, Building2, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

export function ProgrammeCard({ programme }: { programme: any }) {
  return (
    <GlassCard as="article" className="h-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge>{programme.degreeLevel}</Badge>
        <Badge>{programme.discipline}</Badge>
      </div>
      <h3 className="text-xl font-bold leading-snug text-white">{programme.title}</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        <p className="flex items-start gap-2">
          <Building2 className="mt-0.5 h-4 w-4 text-cyan-200" />
          <span>{programme.college?.name || "College to verify"} with {programme.foreignUniversity?.name || "foreign university partner"}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-cyan-200" />
          {programme.duration || "Duration to verify"}
        </p>
      </div>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">{programme.overview}</p>
      <Link href={`/programmes/${programme.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
        Get Study Guidance for This Programme <ArrowRight className="h-4 w-4" />
      </Link>
    </GlassCard>
  );
}
