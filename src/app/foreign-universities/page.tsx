import { UniversityCard } from "@/components/cards/UniversityCard";
import { PageHero } from "@/components/site/PageHero";
import { showcaseAssets } from "@/lib/card-assets";
import { getForeignUniversities } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Foreign Universities Directory for Nepal Partner Colleges",
  description:
    "Browse foreign universities linked with Nepal-based colleges, partner colleges, programmes, subject areas, source URLs, and verification dates.",
  path: "/foreign-universities",
});

export default async function ForeignUniversitiesPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const params = (await searchParams) || {};
  const universities = await getForeignUniversities();
  const countries = Array.from(new Set(universities.map((university: any) => university.country))).sort();
  const query = (params.q || "").toLowerCase();
  const filtered = universities.filter((university: any) => {
    const haystack = `${university.name} ${university.country} ${(university.subjectAreas || []).join(" ")} ${(university.programmeTitles || []).join(" ")}`.toLowerCase();
    return (!query || haystack.includes(query)) && (!params.country || university.country === params.country);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <PageHero
        title="Foreign Universities Directory"
        description="Compare university partners represented through Nepal-based foreign-affiliated colleges. Always verify current partnership and programme status with official sources."
        image={showcaseAssets.hero}
        imageAlt="High-resolution 3D foreign university partner atlas visual for Assignment Nepal"
      />
      <form className="glass-panel mb-8 grid gap-3 rounded-[1.5rem] p-4 md:grid-cols-[1fr_260px_auto_auto]" action="/foreign-universities">
        <input name="q" defaultValue={params.q || ""} placeholder="Search universities, subject areas, programmes" className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white" />
        <select name="country" defaultValue={params.country || ""} className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white">
          <option value="">All countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <button className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950">Apply filters</button>
        <a href="/foreign-universities" className="rounded-full border border-white/14 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10">Reset</a>
      </form>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((university: any) => (
          <UniversityCard key={university.slug} university={university} />
        ))}
      </div>
    </section>
  );
}
