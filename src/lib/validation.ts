import { z } from "zod";

const phoneRegex = /^[+0-9()\-\s]{7,24}$/;

export const enquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().regex(phoneRegex).max(24).optional().or(z.literal("")),
  collegeName: z.string().max(160).optional().or(z.literal("")),
  programmeName: z.string().max(180).optional().or(z.literal("")),
  subject: z.string().max(180).optional().or(z.literal("")),
  supportType: z.string().min(2).max(120),
  message: z.string().min(10).max(3000),
  preferredContactMethod: z.string().max(80).optional().or(z.literal("")),
  consentToContact: z.literal(true),
  consentToPrivacyPolicy: z.literal(true),
  academicIntegrityAccepted: z.literal(true),
  website: z.string().max(0).optional(),
});

export const correctionRequestSchema = z.object({
  pageType: z.string().min(2).max(100),
  pageUrl: z.string().min(2).max(500),
  requesterName: z.string().min(2).max(120),
  requesterEmail: z.string().email().max(160),
  correctionDetails: z.string().min(10).max(4000),
  sourceUrl: z.string().url().max(500).optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type CorrectionRequestInput = z.infer<typeof correctionRequestSchema>;
