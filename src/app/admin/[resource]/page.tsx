import { notFound } from "next/navigation";
import { AdminResourceManager } from "@/components/admin/AdminResourceManager";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminResource } from "@/lib/admin-config";

export default async function AdminResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource: resourceSlug } = await params;
  const resource = getAdminResource(resourceSlug);
  if (!resource) notFound();
  return (
    <AdminShell>
      <AdminResourceManager resource={resource} />
    </AdminShell>
  );
}
