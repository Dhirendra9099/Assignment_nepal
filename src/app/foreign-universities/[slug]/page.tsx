import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { Badge } from "@/components/ui/Badge";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/site/JsonLd";
import { card3dAssets, getUniversityVisual } from "@/lib/card-assets";
import { getForeignUniversity, getProgrammes } from "@/lib/repository";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = await getForeignUniversity(slug);
  if (!university) return {};
  return createMetadata({
    title: `${university.name} Nepal Partner Colleges and Programmes`,
    description: `View ${university.name} partner colleges in Nepal, programmes, subject areas, source URL, and ethical programme guidance options.`,
    path: `/foreign-universities/${university.slug}`,
  });
}

export default async function ForeignUniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = await getForeignUniversity(slug);
  if (!university) notFound();
  const programmes = (await getProgrammes()).filter((programme: any) => programme.foreignUniversity?.slug === university.slug || programme.universitySlug === university.slug);
  const universityVisual = getUniversityVisual(university);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Foreign Universities", path: "/foreign-universities" }, { name: university.name, path: `/foreign-universities/${university.slug}` }])} />
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Badge>{university.country}</Badge>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">{university.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{university.overview}</p>
            <p className="mt-5 text-sm text-slate-400">Last verified: {formatDate(university.lastVerifiedAt)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/contact">Get programme guidance</LinkButton>
              {university.officialWebsite ? (
                <a href={university.officialWebsite} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Official website <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
          <GlassCard>
            <CardArt src={universityVisual} alt="" className="mb-5" />
            <h2 className="text-2xl font-bold text-white">Partner colleges in Nepal</h2>
            <div className="mt-5 grid gap-3">
              {(university.partnerColleges || []).map((college: any) => (
                <Link key={college.slug} href={`/colleges/${college.slug}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 p-4 hover:bg-white/12">
                  <CardArt src={card3dAssets.collegeCampus} alt="" compact />
                  <span>
                    <span className="block font-semibold text-white">{college.name}</span>
                    <span className="mt-1 block text-sm text-slate-400">{college.city}</span>
                  </span>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-white">Programmes through Nepal partners</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {programmes.map((programme: any) => (
              <ProgrammeCard key={programme.slug} programme={programme} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
