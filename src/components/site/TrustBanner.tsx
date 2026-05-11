import { ShieldCheck } from "lucide-react";

export function TrustBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="glass-panel glass-border rounded-[1.75rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-cyan-300/18 p-3 text-cyan-100">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Academic integrity comes first.</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">
                We guide, explain, review, and support, but we do not complete assessed work for students.
              </p>
            </div>
          </div>
          <a href="/academic-integrity" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-white/10">
            Read policy
          </a>
        </div>
      </div>
    </section>
  );
}
