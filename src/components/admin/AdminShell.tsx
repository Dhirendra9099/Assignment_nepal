import Link from "next/link";
import { adminResources } from "@/lib/admin-config";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[280px_1fr] md:px-6">
      <aside className="glass-panel h-max rounded-[1.5rem] p-4">
        <Link href="/admin" className="block rounded-2xl px-3 py-3 text-lg font-black text-white hover:bg-white/10">
          Admin Dashboard
        </Link>
        <nav className="mt-3 grid gap-1">
          {adminResources.map((resource) => (
            <Link key={resource.slug} href={`/admin/${resource.slug}`} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">
              {resource.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}
