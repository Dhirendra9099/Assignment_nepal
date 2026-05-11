import { PolicyPage } from "@/components/site/PolicyPage";
import { getPolicy } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Academic Integrity Policy",
  description: "Assignment Nepal supports learning and does not complete assessed work, exams, coursework, or assignments for submission.",
  path: "/academic-integrity",
});

export default async function AcademicIntegrityPage() {
  const policy = await getPolicy("academic-integrity");
  return <PolicyPage title={policy?.title || "Academic Integrity Policy"} content={policy?.content || ""} />;
}
