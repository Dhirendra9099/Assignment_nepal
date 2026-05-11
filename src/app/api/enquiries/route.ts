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

  const enquiryData = {
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
  };

  const emailSent =
    request.headers.get("x-assignment-nepal-notification") === "formsubmit" ||
    (await sendAdminNotification({
      subject: `New Assignment Nepal enquiry: ${enquiryData.supportType}`,
      replyTo: enquiryData.email,
      text: [
        `Name: ${enquiryData.fullName}`,
        `Email: ${enquiryData.email}`,
        `Phone: ${enquiryData.phone || "Not provided"}`,
        `College: ${enquiryData.collegeName || "Not provided"}`,
        `Programme: ${enquiryData.programmeName || "Not provided"}`,
        `Subject: ${enquiryData.subject || "Not provided"}`,
        `Support type: ${enquiryData.supportType}`,
        `Preferred contact method: ${enquiryData.preferredContactMethod || "Not provided"}`,
        `Message: ${enquiryData.message}`,
        "",
        MANDATORY_DISCLAIMER,
      ].join("\n"),
    }));

  let dbSaved = false;
  if (process.env.DATABASE_URL) {
    try {
      await prisma.enquiry.create({ data: enquiryData });
      dbSaved = true;
    } catch {
      console.info("Enquiry was not saved because the database is unavailable.");
    }
  } else {
    console.info("Enquiry database storage skipped because DATABASE_URL is not configured.");
  }

  if (!emailSent && !dbSaved) {
    return NextResponse.json(
      { error: "Email is not configured yet. Please try again after Assignment Nepal enables email notifications." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    message: "Thanks. Your enquiry has been received. We will respond with ethical study-support options.",
  });
}
