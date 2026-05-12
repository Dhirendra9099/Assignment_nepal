import { notFound } from "next/navigation";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { ModuleAccordion } from "@/components/site/ModuleAccordion";
import { Badge } from "@/components/ui/Badge";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { card3dAssets, getProgrammeVisual } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER, VERIFICATION_NOTE } from "@/lib/constants";
import { getProgramme } from "@/lib/repository";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) return {};
  return createMetadata({
    title: `${programme.title} in Nepal | Modules and Study Guidance`,
    description: `View ${programme.title} duration, college, university partner, subject area, module structure, assessment notes, and ethical study guidance.`,
    path: `/programmes/${programme.slug}`,
  });
}

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) notFound();
  const programmeVisual = getProgrammeVisual(programme);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programmes", path: "/programmes" }, { name: programme.title, path: `/programmes/${programme.slug}` }])} />
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{programme.degreeLevel}</Badge>
              <Badge>{programme.discipline}</Badge>
              <Badge>{programme.subjectArea?.name}</Badge>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{programme.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{programme.overview}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/contact">Get Study Guidance for This Programme</LinkButton>
              {programme.sourceUrl ? (
                <a href={programme.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Source URL <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
          <GlassCard>
            <CardArt src={programmeVisual} alt="" className="mb-5" />
            <h2 className="text-2xl font-bold text-white">Programme snapshot</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <Row label="College" value={programme.college?.name || "Verify with source"} />
              <Row label="Foreign university" value={programme.foreignUniversity?.name || "Verify with source"} />
              <Row label="Duration" value={programme.duration || "Verify with source"} />
              <Row label="Subject area" value={programme.subjectArea?.name || programme.discipline} />
              <Row label="Intake" value={programme.intakeInfo || "Confirm with college"} />
            </dl>
            <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <CalendarCheck className="h-4 w-4 text-cyan-200" />
              Last verified: {formatDate(programme.lastVerifiedAt)}
            </p>
          </GlassCard>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <GlassCard>
            <CardArt src={card3dAssets.moduleRoadmap} alt="" compact className="mb-4" />
            <h2 className="text-2xl font-bold text-white">Assessment style notes</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{programme.assessmentStyleNotes}</p>
          </GlassCard>
          <GlassCard>
            <CardArt src={card3dAssets.businessBriefcase} alt="" compact className="mb-4" />
            <h2 className="text-2xl font-bold text-white">Career relevance</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{programme.careerNotes}</p>
          </GlassCard>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-5 text-sm leading-7 text-amber-50">
          {VERIFICATION_NOTE}
        </div>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-white">Module structure</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Module titles and credits are sample directory data where official structures are not fully verified. Use this view for planning questions and confirm the final breakdown with official college or university sources.
          </p>
          <div className="mt-6">
            <ModuleAccordion modules={programme.modules || []} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-white">Request ethical study support</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
          <div className="mt-6">
            <ContactForm defaultSupportType="Programme / Module Guidance" />
          </div>
        </section>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}
