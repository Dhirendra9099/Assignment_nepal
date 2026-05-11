import { PolicyPage } from "@/components/site/PolicyPage";
import { getPolicy } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Acceptable use, prohibited use, academic integrity obligations, user responsibility, and limitations for Assignment Nepal.",
  path: "/terms",
});

export default async function TermsPage() {
  const policy = await getPolicy("terms");
  return <PolicyPage title={policy?.title || "Terms of Service"} content={policy?.content || ""} />;
}
