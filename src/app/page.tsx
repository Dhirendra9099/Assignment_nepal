import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { UniversityCard } from "@/components/cards/UniversityCard";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroVisual } from "@/components/site/HeroVisual";
import { JsonLd } from "@/components/site/JsonLd";
import { SearchPanel } from "@/components/site/SearchPanel";
import { TrustBanner } from "@/components/site/TrustBanner";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { getBlogPosts, getFeaturedColleges, getForeignUniversities, getProgrammes, getServices, getSubjectAreas, getTestimonials } from "@/lib/repository";
import { createMetadata, organizationSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Assignment Nepal | Academic Support for Foreign-Affiliated College Students",
  description:
    "Explore foreign-affiliated colleges, programmes, modules, and ethical academic support through tutoring, draft feedback, proofreading, referencing help, and study guidance.",
});

const whyChoose = [
  "Nepal-focused support",
  "Foreign-affiliated programme awareness",
  "Module-based guidance",
  "Referencing and formatting help",
  "Friendly academic mentors",
  "Ethical academic integrity policy",
  "Fast response",
  "Mobile-first support",
];

export default async function Home() {
  const [featuredColleges, universities, programmes, subjectAreas, services, posts, testimonials] = await Promise.all([
    getFeaturedColleges(),
    getForeignUniversities(),
    getProgrammes(),
    getSubjectAreas(),
    getServices(),
    getBlogPosts(),
    getTestimonials(),
  ]);

  const searchItems = [
    ...featuredColleges.map((college: any) => ({ label: college.name, href: `/colleges/${college.slug}`, type: "College", description: college.city })),
    ...universities.map((university: any) => ({ label: university.name, href: `/foreign-universities/${university.slug}`, type: "University", description: university.country })),
    ...programmes.map((programme: any) => ({ label: programme.title, href: `/programmes/${programme.slug}`, type: "Programme", description: programme.discipline })),
    ...subjectAreas.map((subject: any) => ({ label: subject.name, href: `/subjects/${subject.slug}`, type: "Subject", description: subject.description })),
    ...programmes.flatMap((programme: any) =>
      (programme.modules || []).slice(0, 3).map((moduleItem: any) => ({
        label: moduleItem.title,
        href: `/programmes/${programme.slug}`,
        type: "Module",
        description: programme.title,
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <section className="relative overflow-hidden px-4 pb-16 pt-16 md:px-6 md:pb-24 md:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] text-white md:text-6xl">
              Academic Support for Students in Foreign-Affiliated Colleges in Nepal
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Explore colleges, programmes, subjects, and module structures, and get ethical support through tutoring, feedback,
              proofreading, referencing help, and study guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/colleges">Explore Colleges</LinkButton>
              <LinkButton href="/contact" variant="secondary">
                Get Study Guidance
              </LinkButton>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-medium text-cyan-100">
              <ShieldCheck className="h-4 w-4" />
              We support learning. We do not complete assessed work for submission.
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="px-4 py-8 md:px-6">
        <SearchPanel items={searchItems} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader
          title="Featured foreign-affiliated colleges"
          description="Research Nepal-based colleges, their foreign university partners, subject areas, source notes, and verification status before making study decisions."
        >
          <LinkButton href="/colleges" variant="secondary">
            View directory <ArrowRight className="ml-2 h-4 w-4" />
          </LinkButton>
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredColleges.slice(0, 6).map((college: any) => (
            <CollegeCard key={college.slug} college={college} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader
          title="Foreign university partners"
          description="Browse foreign universities connected to listed Nepal partner colleges and compare the subject areas available through local delivery."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {universities.slice(0, 6).map((university: any) => (
            <UniversityCard key={university.slug} university={university} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader title="Popular subject areas" description="Find module guidance and study-support options by subject area." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {subjectAreas.slice(0, 10).map((subject: any) => (
            <a key={subject.slug} href={`/subjects/${subject.slug}`} className="glass-panel rounded-3xl p-5 transition hover:-translate-y-1 hover:bg-white/12">
              <h3 className="text-lg font-bold text-white">{subject.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{subject.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader
          title="How Assignment Nepal helps"
          description="Every service is designed to improve your own learning, writing, planning, referencing, and confidence while respecting academic integrity."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 9).map((service: any) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Why choose us</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Assignment Nepal is built for students navigating foreign-affiliated college expectations in Nepal, with careful support that keeps ownership of work with the student.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <GlassCard key={item} className="flex items-center gap-3 rounded-2xl p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-200" />
                <span className="text-sm font-semibold text-white">{item}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <TrustBanner />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader title="Student feedback" description="Sample testimonials are written as modest learning-support examples, without promised outcome claims." />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial: any) => (
            <GlassCard key={testimonial.name} as="article">
              <p className="text-sm leading-7 text-slate-200">"{testimonial.content}"</p>
              <p className="mt-5 text-sm font-bold text-white">{testimonial.name}</p>
              <p className="text-xs text-slate-400">{testimonial.role}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeader title="Blog and resources" description="Practical guides for college research, referencing, coursework planning, academic integrity, presentations, and study skills.">
          <LinkButton href="/blog" variant="secondary">
            Read resources
          </LinkButton>
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((post: any) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="glass-panel glass-border rounded-[2rem] p-8 text-center md:p-12">
          <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
            Need help understanding your module or assignment brief?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
          <div className="mt-8">
            <LinkButton href="/contact">Contact Assignment Nepal</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
