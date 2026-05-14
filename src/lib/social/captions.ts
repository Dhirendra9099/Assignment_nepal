import type { CampaignAssetType } from "./types";

const baseTags = [
  "#AssignmentNepal",
  "#AcademicSupport",
  "#StudySupport",
  "#ResearchSupport",
  "#DissertationHelp",
  "#NepalStudents",
];

const collegeTags = [
  "#AssignmentNepal",
  "#AcademicSupportNepal",
  "#NepaliStudents",
  "#KathmanduStudents",
  "#CollegeStudentsNepal",
  "#ResearchSupport",
  "#ReferencingSupport",
  "#StudyInNepal",
];

const collegeNames: Record<string, string> = {
  "islington-college": "Islington College",
  "softwarica-college": "Softwarica College",
  "the-british-college": "The British College",
  "king-s-college": "King's College",
  "ismt-college": "ISMT College",
  "herald-college": "Herald College",
  "nami-college": "NAMI College",
  "westminster-college": "Westminster College",
  pcps: "PCPS",
  "ace-international-business-school": "Ace International Business School",
};

const ismtThemes = [
  "module reports",
  "research planning",
  "project documentation",
  "presentation review",
  "referencing and citation",
  "final submission polish",
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

function assetSeed(name: string) {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function collegeCampaignCaption(name: string) {
  const lower = name.toLowerCase();
  const seed = assetSeed(name);

  if (lower.startsWith("college-campaign-ismt-")) {
    const focus = ismtThemes[seed % ismtThemes.length];
    return `ISMT students: get clear, ethical academic guidance for ${focus}.\n\nAssignment Nepal supports IT, computer science, cyber security, computing, and MBA students with structure, editing, source use, referencing, presentations, and deadline-focused review.\n\n#ISMTCollege #ISMTStudents ${collegeTags.join(" ")}`;
  }

  const collegeSlug =
    lower.match(/^college-campaign-(?:overview|rest)-\d+-(.+)\.(?:jpe?g|png|webp)$/)?.[1] ?? "";
  const college = collegeNames[collegeSlug] ?? titleFromSlug(collegeSlug);
  const collegeHash = college.replace(/[^A-Za-z0-9]/g, "");

  return `For ${college} students: plan stronger assignments, reports, research papers, citations, and presentations with independent academic guidance.\n\nAssignment Nepal helps with structure, editing, referencing, slides, research workflow, and deadline-focused review for students in Nepal.\n\n#${collegeHash} ${collegeTags.join(" ")}`;
}

export function captionForAsset(type: CampaignAssetType, name: string): string {
  if (name.startsWith("college-campaign-")) {
    return collegeCampaignCaption(name);
  }

  const copy = typeCopy[type];
  const seed = assetSeed(name);
  const headline = copy[seed % copy.length];
  return `${headline}\n\nGet genuine, plagiarism-free, high-quality academic support for assignments, theses, dissertations, research papers, and website projects. Contact Assignment Nepal today.\n\n${baseTags.join(" ")}`;
}
