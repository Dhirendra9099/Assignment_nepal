import { SubjectCard } from "@/components/cards/SubjectCard";
import { PageHero } from "@/components/site/PageHero";
import { showcaseAssets } from "@/lib/card-assets";
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
      <PageHero
        title="Modules / Subjects Directory"
        description="Find subject areas and programme links for ethical tutoring, module explanation, referencing support, and draft feedback."
        image={showcaseAssets.programmes}
        imageAlt="High-resolution 3D module and subject roadmap visual for Assignment Nepal"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject: any) => (
          <SubjectCard key={subject.slug} subject={subject} />
        ))}
      </div>
    </section>
  );
}
