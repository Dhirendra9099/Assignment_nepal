import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizePlainText } from "@/lib/sanitize";
import { sendAdminNotification } from "@/lib/email";
import { correctionRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "local";
  const limited = rateLimit(`correction:${ip}`, 6, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = correctionRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide the page, correction details, and a valid email." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ message: "Thanks. Your correction request has been received." });
  }

  let correction;
  try {
    correction = await prisma.correctionRequest.create({
      data: {
        pageType: sanitizePlainText(data.pageType, 100),
        pageUrl: sanitizePlainText(data.pageUrl, 500),
        requesterName: sanitizePlainText(data.requesterName, 120),
        requesterEmail: data.requesterEmail.toLowerCase(),
        correctionDetails: sanitizePlainText(data.correctionDetails, 4000),
        sourceUrl: sanitizePlainText(data.sourceUrl || "", 500),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Database is not configured. Please set DATABASE_URL and run the Prisma setup before accepting correction requests." },
      { status: 503 },
    );
  }

  await sendAdminNotification({
    subject: `Correction request: ${correction.pageType}`,
    replyTo: correction.requesterEmail,
    text: [
      `Requester: ${correction.requesterName}`,
      `Email: ${correction.requesterEmail}`,
      `Page: ${correction.pageUrl}`,
      `Source: ${correction.sourceUrl || "Not provided"}`,
      `Details: ${correction.correctionDetails}`,
    ].join("\n"),
  });

  return NextResponse.json({
    message: "Thanks. Your correction request has been received and will be reviewed before any update is published.",
  });
}
