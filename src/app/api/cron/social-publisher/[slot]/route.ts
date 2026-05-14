import { NextResponse } from "next/server";

import { isCampaignSlot } from "@/lib/social/config";
import { runSocialPublisherSlot } from "@/lib/social/scheduler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request, context: { params: Promise<{ slot: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slot } = await context.params;
  if (!isCampaignSlot(slot)) {
    return NextResponse.json({ ok: false, error: `Unknown social publisher slot: ${slot}` }, { status: 400 });
  }

  try {
    const result = await runSocialPublisherSlot(slot);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Social publisher cron failed", { slot, error: message });
    return NextResponse.json({ ok: false, slot, error: message }, { status: 500 });
  }
}
