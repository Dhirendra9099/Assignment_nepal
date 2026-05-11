import { JsonLd } from "@/components/site/JsonLd";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFaqs } from "@/lib/repository";
import { createMetadata, faqSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Assignment Nepal, academic integrity, tutoring, proofreading, referencing help, and directory verification.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <JsonLd data={faqSchema(faqs)} />
      <SectionHeader as="h1" title="FAQ" description="Clear answers about what Assignment Nepal can and cannot do." />
      <div className="space-y-4">
        {faqs.map((faq: any) => (
          <GlassCard key={faq.question}>
            <h2 className="text-xl font-bold text-white">{faq.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
