import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { adminResources } from "@/lib/admin-config";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();
  const counts = await Promise.all(
    adminResources.map(async (resource) => {
      try {
        const count = await (prisma as any)[resource.model].count();
        return { label: resource.label, slug: resource.slug, count };
      } catch {
        return { label: resource.label, slug: resource.slug, count: 0 };
      }
    }),
  );

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-4xl font-black text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">Signed in as {admin?.name} ({admin?.role}). Manage content, source verification, enquiries, and policy pages.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {counts.map((item) => (
          <GlassCard key={item.slug}>
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-4xl font-black text-white">{item.count}</p>
            <a href={`/admin/${item.slug}`} className="mt-5 inline-flex text-sm font-semibold text-cyan-100 hover:text-white">
              Manage
            </a>
          </GlassCard>
        ))}
      </div>
    </AdminShell>
  );
}
