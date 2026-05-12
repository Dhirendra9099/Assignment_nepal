import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CardArt } from "@/components/ui/CardArt";
import { GlassCard } from "@/components/ui/GlassCard";
import { card3dAssets, showcaseAssets } from "@/lib/card-assets";
import { CONTACT_EMAIL, MANDATORY_DISCLAIMER, WHATSAPP_NUMBER } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Assignment Nepal",
  description:
    "Send an ethical study-support enquiry for tutoring, assignment planning, draft feedback, proofreading, referencing help, research guidance, or module support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">Contact Assignment Nepal</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Tell us what module, subject, brief, draft, reference style, or study challenge you want to understand. We will respond with ethical support options.
          </p>
          <div className="contact-hero-stage depth-lift mt-7 overflow-hidden rounded-[2rem] border border-white/12 bg-white/6">
            <Image
              src={showcaseAssets.contact}
              alt="High-resolution 3D liquid-glass contact support panel for Assignment Nepal"
              width={1586}
              height={992}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="mt-8 grid gap-4">
            <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CardArt src={card3dAssets.blogResourceNotebook} alt="" compact />
              <div className="flex min-w-0 items-center gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                <div className="min-w-0"><p className="font-semibold text-white">Email</p><p className="break-words text-sm text-slate-300">{CONTACT_EMAIL}</p></div>
              </div>
            </GlassCard>
            <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CardArt src={card3dAssets.contactSupportPhone} alt="" compact />
              <div className="flex min-w-0 items-center gap-3">
                <MessageCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                <div className="min-w-0"><p className="font-semibold text-white">WhatsApp</p><p className="break-words text-sm text-slate-300">{WHATSAPP_NUMBER}</p></div>
              </div>
            </GlassCard>
            <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CardArt src={card3dAssets.nepalEducationRibbon} alt="" compact />
              <div className="flex min-w-0 items-center gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                <div className="min-w-0"><p className="font-semibold text-white">Location</p><p className="text-sm text-slate-300">Kathmandu, Nepal</p></div>
              </div>
            </GlassCard>
          </div>
          <p className="mt-6 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">{MANDATORY_DISCLAIMER}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
