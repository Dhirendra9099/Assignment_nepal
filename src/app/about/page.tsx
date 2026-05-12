import { CheckCircle2 } from "lucide-react";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { card3dAssets } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Assignment Nepal",
  description: "Assignment Nepal is an ethical academic-support and information platform for students in Nepal studying foreign-affiliated programmes.",
  path: "/about",
});

const principles = [
  { text: "Students remain the author of their own work.", art: card3dAssets.cyberSecurityShield },
  { text: "Support is focused on understanding, planning, feedback, proofreading, referencing, and study skills.", art: card3dAssets.modulePlanningBoard },
  { text: "College and module data is source-aware and correction-friendly.", art: card3dAssets.collegeCampus },
  { text: "Services are designed for Nepalese students navigating foreign-affiliated programme expectations.", art: card3dAssets.nepalEducationRibbon },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">About Assignment Nepal</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
        Assignment Nepal is a premium education-tech directory and ethical academic-support platform for Nepalese students studying at foreign-affiliated colleges. We help students understand programmes, modules, briefs, referencing, research expectations, and academic planning.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {principles.map((item) => (
          <GlassCard key={item.text} className="flex items-center gap-4">
            <CardArt src={item.art} alt="" compact />
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
              <p className="text-sm leading-7 text-slate-200">{item.text}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      <p className="mt-10 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">{MANDATORY_DISCLAIMER}</p>
    </section>
  );
}
