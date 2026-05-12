export const card3dAssets = {
  collegeCampus: "/images/card-3d/01-college-campus.webp",
  foreignUniversityGlobe: "/images/card-3d/02-foreign-university-globe.webp",
  computingLaptop: "/images/card-3d/03-computing-laptop.webp",
  cyberSecurityShield: "/images/card-3d/04-cyber-security-shield.webp",
  aiNeuralBrain: "/images/card-3d/05-ai-neural-brain.webp",
  dataScienceCube: "/images/card-3d/06-data-science-cube.webp",
  businessBriefcase: "/images/card-3d/07-business-briefcase.webp",
  hospitalityTray: "/images/card-3d/08-hospitality-tray.webp",
  mbaStrategy: "/images/card-3d/09-mba-strategy.webp",
  referencingBooks: "/images/card-3d/10-referencing-books.webp",
  proofreadingDocument: "/images/card-3d/11-proofreading-document.webp",
  researchMicroscope: "/images/card-3d/12-research-microscope.webp",
  presentationPodium: "/images/card-3d/13-presentation-podium.webp",
  examPrepBooks: "/images/card-3d/14-exam-prep-books.webp",
  moduleRoadmap: "/images/card-3d/15-module-roadmap.webp",
  modulePlanningBoard: "/images/card-3d/16-module-planning-board.webp",
  contactSupportPhone: "/images/card-3d/17-contact-support-phone.webp",
  blogResourceNotebook: "/images/card-3d/18-blog-resource-notebook.webp",
  faqHelpOrb: "/images/card-3d/19-faq-help-orb.webp",
  nepalEducationRibbon: "/images/card-3d/20-nepal-education-ribbon.webp",
} as const;

export type Card3dAsset = (typeof card3dAssets)[keyof typeof card3dAssets];

const rotatingAssets = Object.values(card3dAssets);

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pick(seed: string, options: Card3dAsset[] = rotatingAssets) {
  return options[hashString(seed || "assignment-nepal") % options.length];
}

function textFor(record: any, fields: string[]) {
  return fields
    .map((field) => record?.[field])
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getProgrammeVisual(programme: any) {
  const text = textFor(programme, ["title", "discipline", "degreeLevel"]);
  if (text.includes("cyber") || text.includes("security") || text.includes("forensic") || text.includes("hacking")) return card3dAssets.cyberSecurityShield;
  if (text.includes("artificial") || text.includes("ai") || text.includes("machine learning")) return card3dAssets.aiNeuralBrain;
  if (text.includes("data")) return card3dAssets.dataScienceCube;
  if (text.includes("software") || text.includes("computing") || text.includes("computer") || text.includes("it")) return card3dAssets.computingLaptop;
  if (text.includes("hospitality") || text.includes("hotel")) return card3dAssets.hospitalityTray;
  if (text.includes("mba")) return card3dAssets.mbaStrategy;
  if (text.includes("business") || text.includes("management")) return card3dAssets.businessBriefcase;
  if (text.includes("research") || text.includes("msc")) return card3dAssets.researchMicroscope;
  return pick(programme?.slug || programme?.title, rotatingAssets);
}

export function getCollegeVisual(college: any) {
  const text = textFor(college, ["name", "description", "subjectTags"]);
  if (text.includes("cyber")) return card3dAssets.cyberSecurityShield;
  if (text.includes("ai") || text.includes("artificial")) return card3dAssets.aiNeuralBrain;
  if (text.includes("data")) return card3dAssets.dataScienceCube;
  if (text.includes("computing") || text.includes("software") || text.includes("it")) return card3dAssets.computingLaptop;
  if (text.includes("hospitality") || text.includes("hotel")) return card3dAssets.hospitalityTray;
  if (text.includes("business") || text.includes("mba")) return card3dAssets.businessBriefcase;
  return pick(college?.slug || college?.name, [
    card3dAssets.collegeCampus,
    card3dAssets.foreignUniversityGlobe,
    card3dAssets.moduleRoadmap,
    card3dAssets.nepalEducationRibbon,
  ]);
}

export function getUniversityVisual(university: any) {
  return pick(university?.slug || university?.name, [
    card3dAssets.foreignUniversityGlobe,
    card3dAssets.collegeCampus,
    card3dAssets.nepalEducationRibbon,
    card3dAssets.moduleRoadmap,
    card3dAssets.presentationPodium,
  ]);
}

export function getServiceVisual(service: any) {
  const text = textFor(service, ["title", "slug", "shortDescription"]);
  if (text.includes("brief") || text.includes("planning") || text.includes("module")) return card3dAssets.modulePlanningBoard;
  if (text.includes("reference") || text.includes("citation")) return card3dAssets.referencingBooks;
  if (text.includes("proof") || text.includes("edit")) return card3dAssets.proofreadingDocument;
  if (text.includes("research") || text.includes("proposal") || text.includes("dissertation")) return card3dAssets.researchMicroscope;
  if (text.includes("presentation")) return card3dAssets.presentationPodium;
  if (text.includes("exam")) return card3dAssets.examPrepBooks;
  if (text.includes("coding") || text.includes("programming")) return card3dAssets.computingLaptop;
  if (text.includes("data")) return card3dAssets.dataScienceCube;
  if (text.includes("feedback")) return card3dAssets.blogResourceNotebook;
  if (text.includes("tutoring") || text.includes("concept")) return card3dAssets.aiNeuralBrain;
  return pick(service?.slug || service?.title);
}

export function getBlogVisual(post: any) {
  const text = textFor(post, ["title", "category", "excerpt"]);
  if (text.includes("college")) return card3dAssets.collegeCampus;
  if (text.includes("programme") || text.includes("coursework")) return card3dAssets.moduleRoadmap;
  if (text.includes("reference") || text.includes("harvard")) return card3dAssets.referencingBooks;
  if (text.includes("research")) return card3dAssets.researchMicroscope;
  if (text.includes("presentation")) return card3dAssets.presentationPodium;
  if (text.includes("plagiarism") || text.includes("integrity")) return card3dAssets.cyberSecurityShield;
  if (text.includes("computing") || text.includes("cyber") || text.includes("ai")) return card3dAssets.computingLaptop;
  return pick(post?.slug || post?.title, [
    card3dAssets.blogResourceNotebook,
    card3dAssets.modulePlanningBoard,
    card3dAssets.faqHelpOrb,
    card3dAssets.nepalEducationRibbon,
  ]);
}

export function getSubjectVisual(subject: any) {
  const text = textFor(subject, ["name", "description"]);
  if (text.includes("cyber")) return card3dAssets.cyberSecurityShield;
  if (text.includes("ai") || text.includes("artificial") || text.includes("machine")) return card3dAssets.aiNeuralBrain;
  if (text.includes("data")) return card3dAssets.dataScienceCube;
  if (text.includes("computing") || text.includes("software") || text.includes("it")) return card3dAssets.computingLaptop;
  if (text.includes("hospitality")) return card3dAssets.hospitalityTray;
  if (text.includes("business") || text.includes("mba") || text.includes("management")) return card3dAssets.businessBriefcase;
  return pick(subject?.slug || subject?.name);
}
