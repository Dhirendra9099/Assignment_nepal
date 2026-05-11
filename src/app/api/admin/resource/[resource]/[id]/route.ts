import { NextRequest, NextResponse } from "next/server";
import { getAdminResource } from "@/lib/admin-config";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml, sanitizePlainText } from "@/lib/sanitize";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource: resourceSlug, id } = await params;
  const resource = getAdminResource(resourceSlug);
  if (!resource) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const raw = await request.json();
  const data: Record<string, unknown> = {};
  for (const field of resource.fields) {
    if (!(field.name in raw)) continue;
    const value = raw[field.name];
    if (field.type === "boolean") data[field.name] = value === true || value === "true" || value === "on";
    else if (field.type === "number") data[field.name] = value === "" || value === null ? null : Number(value);
    else if (field.type === "date") data[field.name] = value ? new Date(String(value)) : null;
    else if (field.type === "textarea") data[field.name] = sanitizeHtml(String(value || ""));
    else data[field.name] = sanitizePlainText(String(value || ""), 5000);
  }

  const delegate = (prisma as any)[resource.model];
  const item = await delegate.update({ where: { id }, data });
  return NextResponse.json({ item });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const admin = await getAdminSession();
  if (!admin || admin.role === "SUPPORT") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { resource: resourceSlug, id } = await params;
  const resource = getAdminResource(resourceSlug);
  if (!resource) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const delegate = (prisma as any)[resource.model];
  await delegate.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
