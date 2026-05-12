import Image from "next/image";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { TrustBanner } from "@/components/site/TrustBanner";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { getServices } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ethical Academic Support Services in Nepal",
  description:
    "Tutoring, assignment brief explanation, planning, research guidance, referencing help, proofreading, draft feedback, presentations, coding concepts, data analysis, exam preparation, and research proposal guidance.",
  path: "/services",
});

const allowed = [
  "Explaining concepts",
  "Helping students understand requirements",
  "Helping create outlines",
  "Reviewing drafts",
  "Improving clarity",
  "Teaching referencing",
  "Giving feedback",
  "Helping with research direction",
  "Helping students learn",
];

const forbidden = [
  "Writing full assignments for submission",
  "Impersonation",
  "Completing exams or quizzes",
  "Fabricating references",
  "Fabricating data",
  "Guaranteeing grades",
  "Submitting work on behalf of students",
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="visual-split mb-10 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 p-5 md:grid-cols-[1fr_0.95fr] md:p-8">
          <div>
            <SectionHeader
              as="h1"
              title="Services"
              description="Liquid-glass academic support built around tutoring, study guidance, feedback, editing, referencing, and independent learning."
            />
          </div>
          <div className="depth-lift relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
            <Image
              src={card3dAssets.modulePlanningBoard}
              alt="3D lunar-inspired constellation artwork representing Assignment Nepal tutoring, proofreading, planning, referencing, and research guidance services"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="visual-feature-object"
              priority
            />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service: any) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <GlassCard>
            <CardArt src={card3dAssets.researchMicroscope} alt="" compact className="mb-4" />
            <h2 className="text-2xl font-bold text-white">Allowed support</h2>
            <ul className="mt-5 space-y-3">
              {allowed.map((item) => (
                <li key={item} className="rounded-2xl bg-emerald-300/10 px-4 py-3 text-sm text-emerald-50">{item}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <CardArt src={card3dAssets.cyberSecurityShield} alt="" compact className="mb-4" />
            <h2 className="text-2xl font-bold text-white">Not allowed</h2>
            <ul className="mt-5 space-y-3">
              {forbidden.map((item) => (
                <li key={item} className="rounded-2xl bg-red-300/10 px-4 py-3 text-sm text-red-50">{item}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
        <p className="mt-8 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">{MANDATORY_DISCLAIMER}</p>
      </section>
      <TrustBanner />
    </>
  );
}
