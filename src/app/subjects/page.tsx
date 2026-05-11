import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSubjectAreas } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Modules and Subject Areas Directory",
  description:
    "Browse Computing, Cyber Security, Software Engineering, AI, Business, Hospitality, MBA, Data Science, and IT study-support areas.",
  path: "/subjects",
});

export default async function SubjectsPage() {
  const subjects = await getSubjectAreas();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeader as="h1" title="Modules / Subjects Directory" description="Find subject areas and programme links for ethical tutoring, module explanation, referencing support, and draft feedback." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject: any) => (
          <GlassCard key={subject.slug} as="article">
            <h2 className="text-2xl font-bold text-white">{subject.name}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{subject.description}</p>
            <Link href={`/subjects/${subject.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 hover:text-white">
              View programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
