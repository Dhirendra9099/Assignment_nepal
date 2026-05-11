export function LiquidBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 liquid-bg">
      <div className="grid-overlay absolute inset-0" />
      <div className="pulse-soft absolute left-[-10%] top-[14%] h-44 w-[46rem] rotate-[-18deg] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="pulse-soft absolute right-[-12%] top-[8%] h-48 w-[50rem] rotate-[16deg] rounded-full bg-violet-400/12 blur-3xl" />
      <div className="absolute bottom-[10%] left-[24%] h-44 w-[54rem] rotate-[-7deg] rounded-full bg-pink-300/8 blur-3xl" />
    </div>
  );
}
