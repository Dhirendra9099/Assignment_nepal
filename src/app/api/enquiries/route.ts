import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizePlainText } from "@/lib/sanitize";
import { sendAdminNotification } from "@/lib/email";
import { enquirySchema } from "@/lib/validation";
import { MANDATORY_DISCLAIMER } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "local";
  const limited = rateLimit(`enquiry:${ip}`, 6, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete all required fields and consent checkboxes." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ message: "Thanks. Your enquiry has been received." });
  }

  let enquiry;
  try {
    enquiry = await prisma.enquiry.create({
      data: {
        fullName: sanitizePlainText(data.fullName, 120),
        email: data.email.toLowerCase(),
        phone: sanitizePlainText(data.phone || "", 24),
        collegeName: sanitizePlainText(data.collegeName || "", 160),
        programmeName: sanitizePlainText(data.programmeName || "", 180),
        subject: sanitizePlainText(data.subject || "", 180),
        supportType: sanitizePlainText(data.supportType, 120),
        message: sanitizePlainText(data.message, 3000),
        preferredContactMethod: sanitizePlainText(data.preferredContactMethod || "", 80),
        consentToContact: data.consentToContact,
        consentToPrivacyPolicy: data.consentToPrivacyPolicy,
        academicIntegrityAccepted: data.academicIntegrityAccepted,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Database is not configured. Please set DATABASE_URL and run the Prisma setup before accepting enquiries." },
      { status: 503 },
    );
  }

  await sendAdminNotification({
    subject: `New Assignment Nepal enquiry: ${enquiry.supportType}`,
    replyTo: enquiry.email,
    text: [
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || "Not provided"}`,
      `College: ${enquiry.collegeName || "Not provided"}`,
      `Programme: ${enquiry.programmeName || "Not provided"}`,
      `Subject: ${enquiry.subject || "Not provided"}`,
      `Support type: ${enquiry.supportType}`,
      `Message: ${enquiry.message}`,
      "",
      MANDATORY_DISCLAIMER,
    ].join("\n"),
  });

  return NextResponse.json({
    message: "Thanks. Your enquiry has been received. We will respond with ethical study-support options.",
  });
}
