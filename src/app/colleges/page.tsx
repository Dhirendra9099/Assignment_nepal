import { CollegeCard } from "@/components/cards/CollegeCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getColleges } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Foreign-Affiliated Colleges in Nepal Directory",
  description:
    "Search and compare foreign-affiliated colleges in Nepal by city, university partner, country, subject area, degree level, programme type, and featured status.",
  path: "/colleges",
});

export default async function CollegesPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const params = (await searchParams) || {};
  const colleges = await getColleges();
  const cities = Array.from(new Set(colleges.map((college: any) => college.city))).sort();
  const partners = Array.from(new Set(colleges.flatMap((college: any) => college.universityNames || []))).sort();
  const subjects = Array.from(new Set(colleges.flatMap((college: any) => college.subjectTags || []))).sort();
  const query = (params.q || "").toLowerCase();

  const filtered = colleges.filter((college: any) => {
    const haystack = `${college.name} ${college.city} ${(college.universityNames || []).join(" ")} ${(college.subjectTags || []).join(" ")} ${(college.topProgrammes || []).join(" ")}`.toLowerCase();
    return (
      (!query || haystack.includes(query)) &&
      (!params.city || college.city === params.city) &&
      (!params.university || (college.universityNames || []).includes(params.university)) &&
      (!params.subject || (college.subjectTags || []).includes(params.subject)) &&
      (!params.featured || String(college.isFeatured) === params.featured)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeader
        as="h1"
        title="Colleges Directory"
        description="Search foreign-affiliated colleges in Nepal and verify current programme details with official college or university sources before applying."
      />
      <form className="glass-panel mb-8 grid gap-3 rounded-[1.5rem] p-4 md:grid-cols-5" action="/colleges">
        <input name="q" defaultValue={params.q || ""} placeholder="Search colleges, programmes, modules" className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white md:col-span-2" />
        <Select name="city" value={params.city} label="All cities" options={cities} />
        <Select name="university" value={params.university} label="All universities" options={partners} />
        <Select name="subject" value={params.subject} label="All subjects" options={subjects} />
        <select name="featured" defaultValue={params.featured || ""} className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white">
          <option value="">Featured status</option>
          <option value="true">Featured only</option>
          <option value="false">Non-featured</option>
        </select>
        <button className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 md:col-span-4">Apply filters</button>
        <a href="/colleges" className="rounded-full border border-white/14 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10">
          Reset
        </a>
      </form>
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge>{filtered.length} colleges</Badge>
        <Badge>City filter</Badge>
        <Badge>University partner filter</Badge>
        <Badge>Subject filter</Badge>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((college: any) => (
          <CollegeCard key={college.slug} college={college} />
        ))}
      </div>
    </section>
  );
}

function Select({ name, value, label, options }: { name: string; value?: string; label: string; options: string[] }) {
  return (
    <select name={name} defaultValue={value || ""} className="h-12 rounded-2xl border border-white/14 bg-slate-950/65 px-4 text-sm text-white">
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
