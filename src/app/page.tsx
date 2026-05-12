import Image from "next/image";
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
import { CardArt } from "@/components/ui/CardArt";
import { card3dAssets, getSubjectVisual, showcaseAssets } from "@/lib/card-assets";
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

const whyChooseArt = [
  card3dAssets.nepalEducationRibbon,
  card3dAssets.foreignUniversityGlobe,
  card3dAssets.moduleRoadmap,
  card3dAssets.referencingBooks,
  card3dAssets.aiNeuralBrain,
  card3dAssets.cyberSecurityShield,
  card3dAssets.contactSupportPhone,
  card3dAssets.computingLaptop,
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
      <section className="atlas-hero relative overflow-hidden px-4 pb-12 pt-12 md:px-6 md:pb-20 md:pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="atlas-grid absolute inset-0" />
          <div className="atlas-ribbon atlas-ribbon-one" />
          <div className="atlas-ribbon atlas-ribbon-two" />
        </div>
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 min-w-0">
            <div className="hero-identity mb-7">
              <span>Assignment Nepal</span>
              <span>Foreign-affiliated college support</span>
            </div>
            <h1 className="hero-title max-w-4xl text-[clamp(2.35rem,4.8vw,4.9rem)] font-black leading-[0.98] text-white">
              Academic Support for Students in Foreign-Affiliated Colleges in Nepal
            </h1>
            <p className="hero-subtitle mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
              Explore colleges, programmes, subjects, and module structures, and get ethical support through tutoring, feedback,
              proofreading, referencing help, and study guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/colleges" className="w-full sm:w-auto">Explore Colleges</LinkButton>
              <LinkButton href="/contact" variant="secondary" className="w-full sm:w-auto">
                Get Study Guidance
              </LinkButton>
            </div>
            <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-medium text-cyan-100 sm:text-sm">
              <ShieldCheck className="h-4 w-4" />
              We support learning. We do not complete assessed work for submission.
            </div>
            <div className="hero-stat-row mt-8">
              <div>
                <strong>23+</strong>
                <span>sample college entries</span>
              </div>
              <div>
                <strong>Module-led</strong>
                <span>study guidance</span>
              </div>
              <div>
                <strong>Integrity</strong>
                <span>visible in every enquiry</span>
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 pb-10 md:px-6">
        <SearchPanel items={searchItems} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.95fr_0.95fr]">
          <VisualFeature
            image={showcaseAssets.colleges}
            title="College research atlas"
            text="Compare colleges, university partners, cities, programmes, and verification notes through a cleaner research-first interface."
          />
          <VisualFeature
            image={showcaseAssets.services}
            title="Ethical support cockpit"
            text="Explore tutoring, planning, referencing, proofreading, and draft feedback through a premium glass education interface."
          />
          <VisualFeature
            image={showcaseAssets.resources}
            title="Academic resource hub"
            text="Read practical guides for study skills, module planning, referencing, academic integrity, and career decisions."
          />
        </div>
      </section>

      <section className="showcase-band mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="section-kicker">Designed for learning ownership</div>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,5.8rem)] font-black leading-[0.93] text-white">
              A premium study interface for students who need clarity, not shortcuts.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            The directory, service pages, policies, and enquiry flow all point students toward concept explanation, planning,
            feedback, proofreading, referencing help, and research guidance while keeping assessed work under the student&apos;s own control.
          </p>
        </div>
        <div className="showcase-panorama mt-12 overflow-hidden">
          <Image
            src={showcaseAssets.programmes}
            alt="3D module atlas artwork for Assignment Nepal college and programme discovery"
            width={1400}
            height={900}
            className="h-auto w-full"
          />
        </div>
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
              <div className="subject-mini-art mb-4">
                <Image
                  src={getSubjectVisual(subject)}
                  alt={`3D ${subject.name} subject visual`}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                  className="subject-mini-object"
                />
              </div>
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
        <div className="visual-split mb-8 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
            <Image
              src={showcaseAssets.services}
              alt="3D constellation artwork for Assignment Nepal academic support services"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="visual-feature-object"
              loading="eager"
            />
          </div>
          <div>
            <p className="section-kicker">Ethical support cockpit</p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-white md:text-4xl">
              Guidance that improves your own work, not a shortcut around learning.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The service flow is built around explanation, planning, research direction, proofreading, feedback, and referencing support, with academic integrity visible at every step.
            </p>
          </div>
        </div>
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
            {whyChoose.map((item, index) => (
              <GlassCard key={item} className="flex items-center gap-3 rounded-2xl p-4">
                <CardArt src={whyChooseArt[index % whyChooseArt.length]} alt="" compact />
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
              <CardArt src={card3dAssets.faqHelpOrb} alt="" compact className="mb-4" />
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
        <div className="cta-showcase glass-panel glass-border overflow-hidden rounded-[2rem] md:grid md:grid-cols-[1fr_0.85fr]">
          <div className="p-8 md:p-12">
            <h2 className="max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
              Need help understanding your module or assignment brief?
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
            <div className="mt-8">
              <LinkButton href="/contact">Contact Assignment Nepal</LinkButton>
            </div>
          </div>
          <div className="relative min-h-[18rem] border-t border-white/10 md:border-l md:border-t-0">
            <Image
              src={showcaseAssets.contact}
              alt="3D liquid-glass contact support panel for Assignment Nepal"
              fill
              sizes="(min-width: 768px) 38vw, 100vw"
              className="visual-feature-object"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function VisualFeature({ image, title, text }: { image: string; title: string; text: string }) {
  return (
    <article className="visual-feature depth-lift">
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="visual-feature-object" loading="eager" />
      <div className="visual-feature-copy">
        <h2 className="text-xl font-black leading-tight text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
      </div>
    </article>
  );
}
