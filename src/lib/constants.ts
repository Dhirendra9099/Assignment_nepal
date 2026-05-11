export const SITE_NAME = "Assignment Nepal";
export const SITE_URL =
  process.env.APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
export const CONTACT_EMAIL = "hello@assignmentnepal.com";
export const WHATSAPP_NUMBER = "+9779800000000";

export const MANDATORY_DISCLAIMER =
  "Assignment Nepal provides tutoring, study guidance, editing, feedback, referencing help, and academic support. We do not complete graded assessments, exams, coursework, or assignments for submission on behalf of students.";

export const ASSESSMENT_NOTE =
  "This programme appears to include coursework, projects, practicals, presentations, and/or written exams depending on the module. Confirm the latest assessment breakdown with the college.";

export const VERIFICATION_NOTE =
  "Programme and module information may change. Always verify with the official college or university before applying.";

export const IMAGE_PROMPTS = {
  hero:
    "Premium futuristic liquid-glass education-tech illustration for Assignment Nepal. A modern student workspace with laptop, books, assignment notes, floating glass panels, 3D orbs, soft gradients, subtle Nepal-inspired abstract shapes, glossy translucent materials, premium ed-tech mood, clean space for text, no university logos.",
  serviceIcons:
    "Set of cohesive 3D liquid-glass icons for tutoring, proofreading, referencing, study planning, module guidance, exam preparation, and research support. Glossy translucent objects, soft shadows, premium education-tech style, transparent background.",
  contact:
    "3D liquid-glass contact/support illustration with floating chat bubbles, smartphone, contact form panel, glass orbs, soft gradients, trustworthy student-support mood.",
  og:
    "Open Graph banner for Assignment Nepal. Premium liquid-glass design, floating 3D academic objects, text: Assignment Nepal - Academic Support for Students in Foreign-Affiliated Colleges, modern ed-tech style, no university logos.",
};

export const NAV_LINKS = [
  { href: "/colleges", label: "Colleges" },
  { href: "/foreign-universities", label: "Universities" },
  { href: "/programmes", label: "Programmes" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
