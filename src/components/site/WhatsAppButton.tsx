import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Assignment Nepal, I need ethical study guidance.")}`;
  return (
    <a
      href={href}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,0.3)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
      aria-label="Contact Assignment Nepal on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
