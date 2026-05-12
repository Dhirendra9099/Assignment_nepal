import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getSubjectVisual } from "@/lib/card-assets";

export function SubjectCard({ subject }: { subject: any }) {
  const visual = getSubjectVisual(subject);

  return (
    <GlassCard as="article" className="h-full">
      <div className="card-media depth-lift mb-5">
        <Image
          src={visual}
          alt={`3D subject area visual for ${subject.name}`}
          fill
          loading="eager"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="card-media-object"
        />
      </div>
      <h2 className="text-2xl font-bold text-white">{subject.name}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">{subject.description}</p>
      <Link href={`/subjects/${subject.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
        View programmes <ArrowRight className="h-4 w-4" />
      </Link>
    </GlassCard>
  );
}
