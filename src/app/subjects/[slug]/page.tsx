import { notFound } from "next/navigation";
import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { getServices, getSubject } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = await getSubject(slug);
  if (!subject) return {};
  return createMetadata({
    title: `${subject.name} Module Guidance and Programmes in Nepal`,
    description: `Explore ${subject.name} programmes, modules, tutoring, draft feedback, referencing help, and study guidance for Nepal students.`,
    path: `/subjects/${subject.slug}`,
  });
}

export default async function SubjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = await getSubject(slug);
  if (!subject) notFound();
  const services = await getServices();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <Badge>Subject area</Badge>
      <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{subject.name}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{subject.description}</p>
      <div className="mt-8">
        <LinkButton href="/contact">Get module guidance</LinkButton>
      </div>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-white">Related programmes</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(subject.programmes || []).map((programme: any) => (
            <ProgrammeCard key={programme.slug} programme={programme} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-white">Support available</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service: any) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </section>
  );
}
