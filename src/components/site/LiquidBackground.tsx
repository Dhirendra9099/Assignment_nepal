export function LiquidBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 liquid-bg">
      <div className="grid-overlay absolute inset-0" />
      <div className="ambient-ribbon pulse-soft absolute left-[-12%] top-[14%] h-40 w-[54rem] rotate-[-18deg]" />
      <div className="ambient-ribbon pulse-soft absolute right-[-18%] top-[8%] h-44 w-[58rem] rotate-[16deg]" />
      <div className="ambient-ribbon absolute bottom-[10%] left-[18%] h-40 w-[58rem] rotate-[-7deg]" />
    </div>
  );
}
