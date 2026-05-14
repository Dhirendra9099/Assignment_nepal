import { createHmac, timingSafeEqual } from "crypto";

import { requiredEnv } from "./config";

function mediaSecret() {
  return requiredEnv("CRON_SECRET");
}

export function mediaSignature(fileId: string) {
  return createHmac("sha256", mediaSecret()).update(fileId).digest("hex");
}

export function isValidMediaSignature(fileId: string, signature: string | null) {
  if (!signature) return false;

  const expected = mediaSignature(fileId);
  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(signatureBuffer, expectedBuffer);
}

function productionBaseUrl() {
  const configured = process.env.APP_URL;
  if (configured) return configured.replace(/\/$/, "");

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (productionUrl) return `https://${productionUrl}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export function mediaDeliveryUrl(fileId: string) {
  const signature = mediaSignature(fileId);
  return `${productionBaseUrl()}/api/social-media/${encodeURIComponent(fileId)}?sig=${signature}`;
}
