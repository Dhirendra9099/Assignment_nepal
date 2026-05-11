import { PolicyPage } from "@/components/site/PolicyPage";
import { getPolicy } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "No Ghostwriting / Disclaimer Policy",
  description: "Assignment Nepal does not provide ghostwriting, assessed-work completion, unauthorized exam support, impersonation, fabricated data, or promised outcomes.",
  path: "/disclaimer",
});

export default async function DisclaimerPage() {
  const policy = await getPolicy("disclaimer");
  return <PolicyPage title={policy?.title || "No Ghostwriting / Disclaimer Policy"} content={policy?.content || ""} />;
}
