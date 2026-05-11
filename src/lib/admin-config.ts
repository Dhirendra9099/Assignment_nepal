export type AdminField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "boolean" | "date" | "number" | "email" | "select";
  required?: boolean;
  options?: string[];
};

export type AdminResource = {
  slug: string;
  label: string;
  model: string;
  titleField: string;
  searchFields: string[];
  fields: AdminField[];
};

const statusOptions = ["DRAFT", "PUBLISHED", "ARCHIVED", "REQUIRES_VERIFICATION"];
const enquiryStatusOptions = ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED", "SPAM"];

export const adminResources: AdminResource[] = [
  {
    slug: "colleges",
    label: "Colleges",
    model: "college",
    titleField: "name",
    searchFields: ["name", "city", "description"],
    fields: [
      { name: "name", label: "College name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Overview", type: "textarea", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "address", label: "Address", type: "text" },
      { name: "country", label: "Country", type: "text" },
      { name: "websiteUrl", label: "Website URL", type: "text" },
      { name: "featuredImage", label: "Featured image", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "isFeatured", label: "Featured", type: "boolean" },
      { name: "sourceUrl", label: "Source URL", type: "text" },
      { name: "lastVerifiedAt", label: "Last verified", type: "date" },
    ],
  },
  {
    slug: "foreign-universities",
    label: "Foreign Universities",
    model: "foreignUniversity",
    titleField: "name",
    searchFields: ["name", "country", "overview"],
    fields: [
      { name: "name", label: "University name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "officialWebsite", label: "Official website", type: "text" },
      { name: "overview", label: "Overview", type: "textarea" },
      { name: "sourceUrl", label: "Source URL", type: "text" },
      { name: "lastVerifiedAt", label: "Last verified", type: "date" },
    ],
  },
  {
    slug: "subject-areas",
    label: "Subject Areas",
    model: "subjectArea",
    titleField: "name",
    searchFields: ["name", "description"],
    fields: [
      { name: "name", label: "Subject name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    slug: "programmes",
    label: "Programmes",
    model: "programme",
    titleField: "title",
    searchFields: ["title", "degreeLevel", "discipline", "overview"],
    fields: [
      { name: "title", label: "Programme title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "collegeId", label: "College ID", type: "text", required: true },
      { name: "foreignUniversityId", label: "Foreign university ID", type: "text", required: true },
      { name: "subjectAreaId", label: "Subject area ID", type: "text", required: true },
      { name: "degreeLevel", label: "Degree level", type: "text", required: true },
      { name: "discipline", label: "Discipline", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text" },
      { name: "intakeInfo", label: "Intake info", type: "textarea" },
      { name: "overview", label: "Overview", type: "textarea", required: true },
      { name: "assessmentStyleNotes", label: "Assessment notes", type: "textarea" },
      { name: "careerNotes", label: "Career notes", type: "textarea" },
      { name: "sourceUrl", label: "Source URL", type: "text" },
      { name: "lastVerifiedAt", label: "Last verified", type: "date" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "isFeatured", label: "Featured", type: "boolean" },
    ],
  },
  {
    slug: "modules",
    label: "Modules",
    model: "module",
    titleField: "title",
    searchFields: ["title", "code", "description"],
    fields: [
      { name: "programmeId", label: "Programme ID", type: "text", required: true },
      { name: "title", label: "Module title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "code", label: "Code", type: "text" },
      { name: "yearOrLevel", label: "Year / level", type: "text", required: true },
      { name: "semester", label: "Semester", type: "text" },
      { name: "credits", label: "Credits", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "sourceUrl", label: "Source URL", type: "text" },
      { name: "lastVerifiedAt", label: "Last verified", type: "date" },
    ],
  },
  {
    slug: "services",
    label: "Services",
    model: "service",
    titleField: "title",
    searchFields: ["title", "shortDescription", "fullDescription"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "shortDescription", label: "Short description", type: "textarea", required: true },
      { name: "fullDescription", label: "Full description", type: "textarea", required: true },
      { name: "allowedScope", label: "Allowed scope", type: "textarea", required: true },
      { name: "forbiddenScope", label: "Forbidden scope", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "text" },
      { name: "isActive", label: "Active", type: "boolean" },
    ],
  },
  {
    slug: "blog-posts",
    label: "Blog Posts",
    model: "blogPost",
    titleField: "title",
    searchFields: ["title", "excerpt", "content", "category"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "featuredImage", label: "Featured image", type: "text" },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea" },
      { name: "publishedAt", label: "Published at", type: "date" },
    ],
  },
  {
    slug: "faqs",
    label: "FAQs",
    model: "fAQ",
    titleField: "question",
    searchFields: ["question", "answer", "category"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "order", label: "Order", type: "number" },
      { name: "isPublished", label: "Published", type: "boolean" },
    ],
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    model: "testimonial",
    titleField: "name",
    searchFields: ["name", "role", "content"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "rating", label: "Rating", type: "number" },
      { name: "isPublished", label: "Published", type: "boolean" },
    ],
  },
  {
    slug: "enquiries",
    label: "Enquiries",
    model: "enquiry",
    titleField: "fullName",
    searchFields: ["fullName", "email", "message", "supportType"],
    fields: [
      { name: "status", label: "Status", type: "select", options: enquiryStatusOptions },
      { name: "adminNotes", label: "Admin notes", type: "textarea" },
    ],
  },
  {
    slug: "correction-requests",
    label: "Correction Requests",
    model: "correctionRequest",
    titleField: "pageUrl",
    searchFields: ["pageUrl", "requesterEmail", "correctionDetails"],
    fields: [
      { name: "status", label: "Status", type: "select", options: enquiryStatusOptions },
      { name: "adminNotes", label: "Admin notes", type: "textarea" },
    ],
  },
  {
    slug: "seo-pages",
    label: "SEO Metadata",
    model: "seoPage",
    titleField: "path",
    searchFields: ["path", "metaTitle", "metaDescription"],
    fields: [
      { name: "path", label: "Path", type: "text", required: true },
      { name: "metaTitle", label: "Meta title", type: "text", required: true },
      { name: "metaDescription", label: "Meta description", type: "textarea", required: true },
      { name: "ogTitle", label: "OG title", type: "text" },
      { name: "ogDescription", label: "OG description", type: "textarea" },
      { name: "ogImage", label: "OG image", type: "text" },
      { name: "canonicalUrl", label: "Canonical URL", type: "text" },
    ],
  },
  {
    slug: "policy-pages",
    label: "Policy Pages",
    model: "policyPage",
    titleField: "title",
    searchFields: ["title", "content"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "version", label: "Version", type: "text", required: true },
      { name: "publishedAt", label: "Published at", type: "date" },
    ],
  },
];

export function getAdminResource(slug: string) {
  return adminResources.find((resource) => resource.slug === slug);
}
