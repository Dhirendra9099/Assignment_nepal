import { JsonLd } from "@/components/site/JsonLd";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { card3dAssets } from "@/lib/card-assets";
import { getFaqs } from "@/lib/repository";
import { createMetadata, faqSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Assignment Nepal, academic integrity, tutoring, proofreading, referencing help, and directory verification.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();
  const art = [card3dAssets.faqHelpOrb, card3dAssets.cyberSecurityShield, card3dAssets.modulePlanningBoard, card3dAssets.referencingBooks];
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <JsonLd data={faqSchema(faqs)} />
      <SectionHeader as="h1" title="FAQ" description="Clear answers about what Assignment Nepal can and cannot do." />
      <div className="space-y-4">
        {faqs.map((faq: any, index: number) => (
          <GlassCard key={faq.question} className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center">
            <CardArt src={art[index % art.length]} alt="" compact />
            <div>
              <h2 className="text-xl font-bold text-white">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
