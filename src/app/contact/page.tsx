import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
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
          <div className="depth-lift mt-7 overflow-hidden rounded-[2rem] border border-white/12 bg-white/6">
            <Image
              src="/images/contact-support.svg"
              alt="3D liquid-glass contact support visual with phone, enquiry form, and chat panels"
              width={1000}
              height={760}
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="mt-8 grid gap-4">
            <GlassCard className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-cyan-200" />
              <div><p className="font-semibold text-white">Email</p><p className="text-sm text-slate-300">{CONTACT_EMAIL}</p></div>
            </GlassCard>
            <GlassCard className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-5 w-5 text-cyan-200" />
              <div><p className="font-semibold text-white">WhatsApp</p><p className="text-sm text-slate-300">{WHATSAPP_NUMBER}</p></div>
            </GlassCard>
            <GlassCard className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-cyan-200" />
              <div><p className="font-semibold text-white">Location</p><p className="text-sm text-slate-300">Kathmandu, Nepal</p></div>
            </GlassCard>
          </div>
          <p className="mt-6 rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/8 p-5 text-sm leading-7 text-cyan-50">{MANDATORY_DISCLAIMER}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
