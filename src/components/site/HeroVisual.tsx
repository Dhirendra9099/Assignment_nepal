import Image from "next/image";
import { BookOpen, FileText, MapPinned, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="scene-3d relative mx-auto h-[430px] w-full max-w-[620px] md:h-[620px]" aria-label="3D academic orbit illustration">
      <div className="lunar-orbit absolute left-1/2 top-[44%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 md:h-[34rem] md:w-[34rem]" />
      <div className="hero-image-frame depth-lift absolute left-1/2 top-14 w-[92%] -translate-x-1/2 overflow-hidden rounded-[2rem] md:top-16 md:rounded-[2.6rem]">
        <Image
          src="/images/lunar-inspired/academic-orbit-hero.png"
          alt="3D academic orbit artwork for Assignment Nepal with moon-like sphere, learning panels, and programme tags"
          width={1600}
          height={1200}
          priority
          className="h-auto w-full"
        />
      </div>

      <div className="kinetic-panel glass-panel glass-border float-soft absolute left-1 top-8 rounded-3xl p-4 md:left-8 md:top-18">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
          <Sparkles className="h-4 w-4 text-pink-100" />
          Study orbit
        </div>
      </div>

      <div className="kinetic-panel glass-panel absolute bottom-28 right-0 w-52 rounded-3xl p-4 md:right-3">
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

      <div className="kinetic-panel glass-panel absolute bottom-6 left-3 w-60 rounded-3xl p-4 md:left-12">
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

      <div className="kinetic-panel glass-panel absolute right-8 top-2 rounded-3xl p-3 text-cyan-100 md:right-12">
        <MapPinned className="h-7 w-7" />
      </div>
    </div>
  );
}
