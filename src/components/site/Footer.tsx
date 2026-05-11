import Link from "next/link";
import { Mail, MapPin, Share2 } from "lucide-react";
import { CONTACT_EMAIL, MANDATORY_DISCLAIMER, WHATSAPP_NUMBER } from "@/lib/constants";

const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/academic-integrity", label: "Academic Integrity Policy" },
  { href: "/disclaimer", label: "No Ghostwriting / Disclaimer" },
  { href: "/correction-request", label: "Correction Request" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.3fr_0.8fr_0.8fr] md:px-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Assignment Nepal</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-200" /> {CONTACT_EMAIL}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-200" /> Kathmandu, Nepal</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-cyan-100">Policies</h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-cyan-100">Connect</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">WhatsApp: {WHATSAPP_NUMBER}</p>
          <div className="mt-5 flex gap-3">
            {["FB", "IG", "IN"].map((label) => (
              <a key={label} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/8 text-slate-100 hover:bg-white/14" aria-label={`${label} social link`}>
                <span className="sr-only">{label}</span>
                <Share2 className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Assignment Nepal. Ethical academic support and information directory.
      </div>
    </footer>
  );
}
