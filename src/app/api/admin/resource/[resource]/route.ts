import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAdminResource } from "@/lib/admin-config";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml, sanitizePlainText } from "@/lib/sanitize";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource: resourceSlug } = await params;
  const resource = getAdminResource(resourceSlug);
  if (!resource) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const query = request.nextUrl.searchParams.get("q") || "";
  const delegate = (prisma as any)[resource.model];
  const where = query
    ? {
        OR: resource.searchFields.map((field) => ({
          [field]: { contains: query, mode: "insensitive" },
        })),
      }
    : undefined;
  const items = await delegate.findMany({
    where,
    take: 100,
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const admin = await getAdminSession();
  if (!admin || admin.role === "SUPPORT") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { resource: resourceSlug } = await params;
  const resource = getAdminResource(resourceSlug);
  if (!resource) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const raw = await request.json();
  const data = normalizeData(resource, raw);
  const title = data.name || data.title || data.question || data.path;
  if ("slug" in data && !data.slug && title) data.slug = slugify(String(title));
  if (resource.model === "module" && !data.slug && data.title) data.slug = slugify(String(data.title));

  const delegate = (prisma as any)[resource.model];
  const item = await delegate.create({ data });
  return NextResponse.json({ item });
}

function normalizeData(resource: NonNullable<ReturnType<typeof getAdminResource>>, raw: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const field of resource.fields) {
    const value = raw[field.name];
    if (value === undefined) continue;
    if (field.type === "boolean") data[field.name] = value === true || value === "true" || value === "on";
    else if (field.type === "number") data[field.name] = value === "" || value === null ? null : Number(value);
    else if (field.type === "date") data[field.name] = value ? new Date(String(value)) : null;
    else if (field.type === "textarea") data[field.name] = sanitizeHtml(String(value || ""));
    else data[field.name] = sanitizePlainText(String(value || ""), 5000);
  }
  return data;
}
