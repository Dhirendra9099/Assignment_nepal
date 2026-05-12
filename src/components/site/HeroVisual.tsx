import Image from "next/image";
import { BookOpen, FileText, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { card3dAssets, showcaseAssets } from "@/lib/card-assets";

export function HeroVisual() {
  return (
    <div className="hero-studio scene-3d relative mx-auto w-full max-w-[680px]" aria-label="3D academic guidance interface">
      <div className="hero-studio-frame depth-lift">
        <Image
          src={showcaseAssets.hero}
          alt="High-resolution 3D liquid-glass academic atlas for Assignment Nepal"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 96vw"
          className="hero-studio-image"
        />
        <div className="hero-studio-glass" />
      </div>

      <div className="hero-studio-card hero-studio-card-one">
        <Image src={card3dAssets.collegeCampus} alt="" fill sizes="210px" className="hero-diorama-image" />
      </div>
      <div className="hero-studio-card hero-studio-card-two">
        <Image src={card3dAssets.referencingBooks} alt="" fill sizes="210px" className="hero-diorama-image" />
      </div>
      <div className="hero-studio-card hero-studio-card-three">
        <Image src={card3dAssets.cyberSecurityShield} alt="" fill sizes="210px" className="hero-diorama-image" />
      </div>

      <div className="kinetic-panel hero-chip hero-chip-top glass-panel glass-border float-soft">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
          <Sparkles className="h-4 w-4 text-pink-100" />
          Verified study atlas
        </div>
      </div>

      <div className="kinetic-panel hero-guidance-panel glass-panel">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <BookOpen className="h-4 w-4 text-cyan-200" />
          Module guidance
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-white/40" />
          <div className="h-2 w-4/5 rounded-full bg-white/25" />
          <div className="h-2 w-2/3 rounded-full bg-cyan-200/45" />
        </div>
      </div>

      <div className="kinetic-panel hero-feedback-panel glass-panel">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-cyan-300/20 p-3 text-cyan-100">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Draft feedback</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Review your own work with integrity.</p>
          </div>
        </div>
      </div>

      <div className="kinetic-panel hero-integrity-panel glass-panel">
        <ShieldCheck className="h-5 w-5 text-emerald-200" />
        <span>Integrity-first</span>
      </div>

      <div className="kinetic-panel hero-map-pin glass-panel">
        <MapPinned className="h-7 w-7" />
      </div>
    </div>
  );
}
