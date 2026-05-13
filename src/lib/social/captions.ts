import type { CampaignAssetType } from "./types";

const baseTags = [
  "#AssignmentNepal",
  "#AcademicSupport",
  "#StudySupport",
  "#ResearchSupport",
  "#DissertationHelp",
  "#NepalStudents",
];

const typeCopy: Record<CampaignAssetType, string[]> = {
  poster: [
    "Need structured guidance for assignments, reports, research papers, theses, or dissertations?",
    "Get clear academic support with planning, editing, referencing, formatting, and review.",
    "Your success, our priority. Professional academic support for students in Nepal.",
  ],
  banner: [
    "Quality assignments. On time. Every time.",
    "Assignment Nepal supports students with academic planning, editing, research guidance, and presentation support.",
    "A reliable academic partner for college and university students in Nepal.",
  ],
  animated_ad: [
    "Make your academic work clearer, stronger, and deadline-ready.",
    "Get support for assignments, theses, dissertations, research papers, reports, and website projects.",
    "Original guidance, professional workflow, and quality you can trust.",
  ],
};

export function captionForAsset(type: CampaignAssetType, name: string): string {
  const copy = typeCopy[type];
  const seed = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const headline = copy[seed % copy.length];
  return `${headline}\n\nGet genuine, plagiarism-free, high-quality academic support for assignments, theses, dissertations, research papers, and website projects. Contact Assignment Nepal today.\n\n${baseTags.join(" ")}`;
}
