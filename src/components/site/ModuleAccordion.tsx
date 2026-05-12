import { CardArt } from "@/components/ui/CardArt";
import { Badge } from "@/components/ui/Badge";
import { getProgrammeVisual } from "@/lib/card-assets";

const support = ["Concept explanation", "Reading guidance", "Referencing help", "Draft feedback", "Presentation support"];

export function ModuleAccordion({ modules }: { modules: any[] }) {
  const groups = modules.reduce<Record<string, any[]>>((acc, moduleItem) => {
    const key = `${moduleItem.yearOrLevel || "Level to verify"}${moduleItem.semester ? ` - ${moduleItem.semester}` : ""}`;
    acc[key] = acc[key] || [];
    acc[key].push(moduleItem);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([group, items]) => (
        <details key={group} className="glass-panel rounded-[1.25rem] p-4" open>
          <summary className="cursor-pointer text-lg font-bold text-white">{group}</summary>
          <div className="mt-4 grid gap-4">
            {items.map((moduleItem) => (
              <div key={`${group}-${moduleItem.slug}`} className="rounded-2xl border border-white/10 bg-white/7 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <CardArt src={getProgrammeVisual(moduleItem)} alt="" compact />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white">{moduleItem.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{moduleItem.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {moduleItem.code ? <Badge>{moduleItem.code}</Badge> : null}
                    {moduleItem.credits ? <Badge>{moduleItem.credits} credits</Badge> : null}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {support.map((item) => (
                    <span key={item} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
