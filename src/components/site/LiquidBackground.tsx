export function LiquidBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 liquid-bg">
      <div className="grid-overlay absolute inset-0" />
      <div className="pulse-soft absolute left-[9%] top-[18%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="pulse-soft absolute right-[8%] top-[10%] h-80 w-80 rounded-full bg-violet-400/12 blur-3xl" />
      <div className="absolute bottom-[12%] left-[42%] h-72 w-72 rounded-full bg-pink-300/8 blur-3xl" />
    </div>
  );
}
