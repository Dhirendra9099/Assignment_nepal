"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Item = { label: string; href: string; type: string; description?: string };

export function SearchPanel({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items.slice(0, 5);
    return items
      .filter((item) => `${item.label} ${item.type} ${item.description || ""}`.toLowerCase().includes(value))
      .slice(0, 8);
  }, [items, query]);

  return (
    <div className="glass-panel glass-border mx-auto max-w-5xl rounded-[1.75rem] p-4 md:p-6">
      <label className="sr-only" htmlFor="global-search">
        Search colleges, universities, programmes, modules, or subjects
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-100" />
          <input
            id="global-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search colleges, universities, programmes, modules, subjects..."
            className="h-14 w-full rounded-full border border-white/14 bg-slate-950/45 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-cyan-200"
          />
        </div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {results.map((item) => (
          <Link key={`${item.type}-${item.href}`} href={item.href} className="rounded-2xl border border-white/10 bg-white/7 p-4 transition hover:bg-white/12">
            <span className="text-xs font-semibold uppercase text-cyan-100">{item.type}</span>
            <p className="mt-1 text-sm font-semibold text-white">{item.label}</p>
            {item.description ? <p className="mt-1 line-clamp-1 text-xs text-slate-400">{item.description}</p> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
