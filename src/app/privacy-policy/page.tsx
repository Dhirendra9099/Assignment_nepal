import { PolicyPage } from "@/components/site/PolicyPage";
import { getPolicy } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Assignment Nepal collects, uses, protects, and responds to correction or deletion requests for enquiry data.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const policy = await getPolicy("privacy-policy");
  return <PolicyPage title={policy?.title || "Privacy Policy"} content={policy?.content || ""} />;
}
