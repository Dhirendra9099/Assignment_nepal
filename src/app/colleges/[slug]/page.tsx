import { notFound } from "next/navigation";
import { CalendarCheck, ExternalLink, MapPin } from "lucide-react";
import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { card3dAssets, getCollegeVisual } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER, VERIFICATION_NOTE } from "@/lib/constants";
import { getCollege, getProgrammes } from "@/lib/repository";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = await getCollege(slug);
  if (!college) return {};
  return createMetadata({
    title: `${college.name} Programmes, University Partners and Study Support`,
    description: `View ${college.name} location, foreign university affiliations, programmes, subject areas, source notes, and ethical academic support options.`,
    path: `/colleges/${college.slug}`,
  });
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = await getCollege(slug);
  if (!college) notFound();

  const allProgrammes = await getProgrammes();
  const collegeProgrammes = allProgrammes.filter((programme: any) => programme.college?.slug === college.slug || programme.collegeSlug === college.slug);
  const collegeVisual = getCollegeVisual(college);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Colleges", path: "/colleges" }, { name: college.name, path: `/colleges/${college.slug}` }])} />
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{college.city}</Badge>
              <Badge>{college.status === "REQUIRES_VERIFICATION" ? "Requires verification" : "Directory profile"}</Badge>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{college.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{college.description}</p>
            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-200" /> {college.address || `${college.city}, Nepal`}</p>
              <p className="flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-cyan-200" /> Last verified: {formatDate(college.lastVerifiedAt)}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/contact">Get academic support</LinkButton>
              <LinkButton href={`/correction-request?page=${encodeURIComponent(`/colleges/${college.slug}`)}`} variant="secondary">
                Request correction
              </LinkButton>
            </div>
          </div>
          <GlassCard>
            <CardArt src={collegeVisual} alt="" className="mb-5" />
            <h2 className="text-2xl font-bold text-white">Foreign university affiliation(s)</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(college.universityNames || []).map((name: string) => (
                <Badge key={name}>{name}</Badge>
              ))}
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Subjects</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(college.subjectTags || []).map((tag: string) => (
                <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-sm text-slate-200">{tag}</span>
              ))}
            </div>
            {college.websiteUrl ? (
              <a href={college.websiteUrl} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white" target="_blank" rel="noreferrer">
                Official/source website <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </GlassCard>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-5 text-sm leading-7 text-amber-50">
          <CardArt src={card3dAssets.moduleRoadmap} alt="" compact className="mb-4" />
          {VERIFICATION_NOTE}
        </div>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-white">Programmes offered</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {collegeProgrammes.map((programme: any) => (
              <ProgrammeCard key={programme.slug} programme={programme} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-white">Ask about this college</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
          <div className="mt-6">
            <ContactForm defaultSupportType="Programme / Module Guidance" />
          </div>
        </section>
      </section>
    </>
  );
}
