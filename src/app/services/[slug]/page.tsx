import { notFound } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { card3dAssets, getServiceVisual } from "@/lib/card-assets";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";
import { getService } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return createMetadata({
    title: `${service.title} in Nepal`,
    description: `${service.shortDescription} Ethical academic support that helps students improve their own work.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const serviceVisual = getServiceVisual(service);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <Badge>Ethical service scope</Badge>
      <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">{service.title}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{service.fullDescription}</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <CardArt src={serviceVisual} alt="" compact className="mb-4" />
          <div className="flex items-center gap-3 text-emerald-100">
            <CheckCircle2 className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Allowed</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{service.allowedScope}</p>
        </GlassCard>
        <GlassCard>
          <CardArt src={card3dAssets.cyberSecurityShield} alt="" compact className="mb-4" />
          <div className="flex items-center gap-3 text-red-100">
            <XCircle className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Not allowed</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{service.forbiddenScope}</p>
        </GlassCard>
      </div>

      <p className="mt-8 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">{MANDATORY_DISCLAIMER}</p>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-white">Enquire about {service.title}</h2>
        <div className="mt-6">
          <ContactForm defaultSupportType={service.title} />
        </div>
      </section>
    </section>
  );
}
