import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { PageHero } from "@/components/site/PageHero";
import { showcaseAssets } from "@/lib/card-assets";
import { getProgrammes } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Programmes Directory | Foreign-Affiliated Degrees in Nepal",
  description:
    "Search BSc Computing, Cyber Security, Software Engineering, Business, Hospitality, MBA, MSc IT, and Data Science programmes in Nepal.",
  path: "/programmes",
});

export default async function ProgrammesPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const params = (await searchParams) || {};
  const programmes = await getProgrammes();
  const levels = Array.from(new Set(programmes.map((programme: any) => programme.degreeLevel))).sort();
  const disciplines = Array.from(new Set(programmes.map((programme: any) => programme.discipline))).sort();
  const query = (params.q || "").toLowerCase();
  const filtered = programmes.filter((programme: any) => {
    const haystack = `${programme.title} ${programme.degreeLevel} ${programme.discipline} ${programme.college?.name || ""} ${programme.foreignUniversity?.name || ""}`.toLowerCase();
    return (
      (!query || haystack.includes(query)) &&
      (!params.level || programme.degreeLevel === params.level) &&
      (!params.discipline || programme.discipline === params.discipline)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <PageHero
        title="Programmes Directory"
        description="Compare programme structures, subject areas, module examples, assessment-style notes, and ethical study-support options."
        image={showcaseAssets.programmes}
        imageAlt="High-resolution 3D curriculum roadmap visual for Assignment Nepal programmes"
      />
      <form className="glass-panel mb-8 grid gap-3 rounded-[1.5rem] p-4 md:grid-cols-[1fr_220px_260px_auto_auto]" action="/programmes">
        <input name="q" defaultValue={params.q || ""} placeholder="Search programmes, colleges, universities" className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white" />
        <select name="level" defaultValue={params.level || ""} className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white">
          <option value="">All levels</option>
          {levels.map((level) => <option key={level} value={level}>{level}</option>)}
        </select>
        <select name="discipline" defaultValue={params.discipline || ""} className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white">
          <option value="">All disciplines</option>
          {disciplines.map((discipline) => <option key={discipline} value={discipline}>{discipline}</option>)}
        </select>
        <button className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950">Apply</button>
        <a href="/programmes" className="rounded-full border border-white/14 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10">Reset</a>
      </form>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((programme: any) => (
          <ProgrammeCard key={programme.slug} programme={programme} />
        ))}
      </div>
    </section>
  );
}
