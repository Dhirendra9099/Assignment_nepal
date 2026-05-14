import { Readable } from "stream";

import { NextResponse } from "next/server";

import { driveClient } from "@/lib/social/drive";
import { isValidMediaSignature } from "@/lib/social/media-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ fileId: string }> };

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function responseHeaders(metadata: { mimeType?: string | null; size?: string | null; name?: string | null }) {
  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  headers.set("Content-Type", metadata.mimeType || "application/octet-stream");
  if (metadata.size) headers.set("Content-Length", metadata.size);
  if (metadata.name) headers.set("Content-Disposition", `inline; filename="${metadata.name.replace(/"/g, "")}"`);
  return headers;
}

async function getMetadata(fileId: string) {
  const drive = driveClient();
  const metadata = await drive.files.get({
    fileId,
    fields: "id,name,mimeType,size",
    supportsAllDrives: true,
  });

  return metadata.data;
}

export async function HEAD(request: Request, context: RouteContext) {
  const { fileId } = await context.params;
  const signature = new URL(request.url).searchParams.get("sig");
  if (!isValidMediaSignature(fileId, signature)) return unauthorized();

  const metadata = await getMetadata(fileId);
  return new Response(null, { status: 200, headers: responseHeaders(metadata) });
}

export async function GET(request: Request, context: RouteContext) {
  const { fileId } = await context.params;
  const signature = new URL(request.url).searchParams.get("sig");
  if (!isValidMediaSignature(fileId, signature)) return unauthorized();

  const drive = driveClient();
  const metadata = await getMetadata(fileId);
  const range = request.headers.get("range") || undefined;
  const file = await drive.files.get(
    {
      fileId,
      alt: "media",
      supportsAllDrives: true,
    },
    {
      responseType: "stream",
      headers: range ? { Range: range } : undefined,
    },
  );

  const headers = responseHeaders(metadata);
  const contentRange = file.headers?.["content-range"];
  if (contentRange) headers.set("Content-Range", String(contentRange));
  if (range) headers.set("Accept-Ranges", "bytes");

  return new Response(Readable.toWeb(file.data as Readable) as ReadableStream, {
    status: file.status || (range ? 206 : 200),
    headers,
  });
}
