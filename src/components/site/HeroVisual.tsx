import { BookOpen, FileText, Laptop, MapPinned, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[520px] md:h-[560px]" aria-label="Liquid glass education illustration">
      <div className="floating-ribbon float-soft absolute left-8 top-14 h-24 w-72 rotate-[-12deg] rounded-full" />
      <div className="floating-ribbon float-soft-delay absolute right-4 top-36 h-20 w-64 rotate-[18deg] rounded-full" />
      <div className="glass-sphere float-soft absolute right-12 top-8 h-24 w-24 rounded-full" />
      <div className="glass-sphere float-soft-delay absolute bottom-20 left-0 h-16 w-16 rounded-full" />

      <div className="glass-panel glass-border absolute left-6 top-28 w-[82%] rounded-[2rem] p-5 shadow-2xl md:left-12 md:top-36">
        <div className="rounded-[1.5rem] border border-white/12 bg-slate-950/55 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <Laptop className="h-5 w-5" />
              Study workspace
            </div>
            <Sparkles className="h-5 w-5 text-pink-200" />
          </div>
          <div className="grid gap-3">
            <div className="h-20 rounded-2xl bg-gradient-to-r from-cyan-300/24 to-violet-300/18" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-xl bg-white/10" />
              <div className="h-16 rounded-xl bg-white/8" />
              <div className="h-16 rounded-xl bg-cyan-200/12" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel absolute bottom-24 right-3 w-52 rounded-3xl p-4">
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

      <div className="glass-panel absolute bottom-6 left-12 w-60 rounded-3xl p-4">
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

      <div className="glass-panel absolute right-12 top-4 rounded-3xl p-3 text-cyan-100">
        <MapPinned className="h-7 w-7" />
      </div>
    </div>
  );
}
