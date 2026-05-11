import { prisma } from "./prisma";
import {
  blogPosts,
  colleges,
  faqs,
  foreignUniversities,
  getBlogPostBySlug,
  getCollegeBySlug,
  getProgrammeBySlug,
  getServiceBySlug,
  getSubjectBySlug,
  getUniversityBySlug,
  policyPages,
  programmes,
  services,
  subjectAreas,
  testimonials,
} from "./sample-data";

function dbEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

async function safeDb<T>(query: () => Promise<any>, fallback: T): Promise<any> {
  if (!dbEnabled()) return fallback;
  try {
    return await query();
  } catch (error) {
    console.warn("Using sample data fallback:", error instanceof Error ? error.message : error);
    return fallback;
  }
}

const programmeInclude = {
  college: true,
  foreignUniversity: true,
  subjectArea: true,
  modules: { orderBy: [{ yearOrLevel: "asc" as const }, { semester: "asc" as const }, { title: "asc" as const }] },
};

const collegeInclude = {
  affiliations: { include: { foreignUniversity: true } },
  programmes: { include: { subjectArea: true, foreignUniversity: true }, orderBy: { title: "asc" as const } },
};

const universityInclude = {
  affiliations: { include: { college: true } },
  programmes: { include: { college: true, subjectArea: true }, orderBy: { title: "asc" as const } },
};

export type CollegeView = (typeof colleges)[number];
export type ProgrammeView = (typeof programmes)[number] & {
  college?: { name: string; slug: string; city?: string };
  foreignUniversity?: { name: string; slug: string; country?: string };
  subjectArea?: { name: string; slug: string };
};

function mapCollege(college: Awaited<ReturnType<typeof prisma.college.findMany>>[number] & {
  affiliations?: { foreignUniversity: { name: string } }[];
  programmes?: { title: string; subjectArea?: { name: string } }[];
}) {
  return {
    ...college,
    universityNames: Array.from(new Set(college.affiliations?.map((item) => item.foreignUniversity.name) || [])),
    subjectTags: Array.from(new Set(college.programmes?.map((item) => item.subjectArea?.name).filter(Boolean) as string[])),
    topProgrammes: college.programmes?.slice(0, 4).map((programme) => programme.title) || [],
  };
}

function mapUniversity(university: Awaited<ReturnType<typeof prisma.foreignUniversity.findMany>>[number] & {
  affiliations?: { college: { name: string; slug: string; city: string } }[];
  programmes?: { title: string; subjectArea?: { name: string }; college?: { name: string; slug: string } }[];
}) {
  return {
    ...university,
    partnerColleges: university.affiliations?.map((item) => item.college) || [],
    programmeTitles: Array.from(new Set(university.programmes?.map((programme) => programme.title) || [])),
    subjectAreas: Array.from(new Set(university.programmes?.map((programme) => programme.subjectArea?.name).filter(Boolean) as string[])),
  };
}

export async function getColleges(): Promise<any[]> {
  return safeDb(
    async () => {
      const rows = await prisma.college.findMany({
        where: { status: { not: "ARCHIVED" } },
        include: collegeInclude,
        orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
      });
      return rows.map(mapCollege);
    },
    colleges,
  );
}

export async function getFeaturedColleges(): Promise<any[]> {
  const rows = await getColleges();
  return rows.filter((college) => college.isFeatured).slice(0, 6);
}

export async function getCollege(slug: string): Promise<any | null> {
  return safeDb(
    async () => {
      const row = await prisma.college.findUnique({ where: { slug }, include: collegeInclude });
      return row ? mapCollege(row) : null;
    },
    getCollegeBySlug(slug) || null,
  );
}

export async function getForeignUniversities(): Promise<any[]> {
  return safeDb(
    async () => {
      const rows = await prisma.foreignUniversity.findMany({
        include: universityInclude,
        orderBy: [{ country: "asc" }, { name: "asc" }],
      });
      return rows.map(mapUniversity);
    },
    foreignUniversities.map((university) => ({
      ...university,
      partnerColleges: colleges.filter((college) => college.universityNames.includes(university.name)),
      programmeTitles: programmes.filter((programme) => programme.universitySlug === university.slug).map((programme) => programme.title),
      subjectAreas: Array.from(
        new Set(
          programmes
            .filter((programme) => programme.universitySlug === university.slug)
            .map((programme) => subjectAreas.find((subject) => subject.slug === programme.subjectSlug)?.name)
            .filter(Boolean) as string[],
        ),
      ),
    })),
  );
}

export async function getForeignUniversity(slug: string): Promise<any | null> {
  const universities = await getForeignUniversities();
  return universities.find((university) => university.slug === slug) || getUniversityBySlug(slug) || null;
}

export async function getProgrammes(): Promise<any[]> {
  return safeDb(
    async () => {
      return prisma.programme.findMany({
        where: { status: { not: "ARCHIVED" } },
        include: programmeInclude,
        orderBy: [{ isFeatured: "desc" }, { title: "asc" }],
      });
    },
    programmes.map((programme) => ({
      ...programme,
      college: colleges.find((college) => college.slug === programme.collegeSlug),
      foreignUniversity: foreignUniversities.find((university) => university.slug === programme.universitySlug),
      subjectArea: subjectAreas.find((subject) => subject.slug === programme.subjectSlug),
    })),
  );
}

export async function getFeaturedProgrammes(): Promise<any[]> {
  const rows = await getProgrammes();
  return rows.filter((programme) => programme.isFeatured).slice(0, 6);
}

export async function getProgramme(slug: string): Promise<any | null> {
  return safeDb(
    async () => {
      return prisma.programme.findUnique({ where: { slug }, include: programmeInclude });
    },
    (() => {
      const programme = getProgrammeBySlug(slug);
      if (!programme) return null;
      return {
        ...programme,
        college: colleges.find((college) => college.slug === programme.collegeSlug),
        foreignUniversity: foreignUniversities.find((university) => university.slug === programme.universitySlug),
        subjectArea: subjectAreas.find((subject) => subject.slug === programme.subjectSlug),
      };
    })(),
  );
}

export async function getSubjectAreas(): Promise<any[]> {
  return safeDb(
    async () => prisma.subjectArea.findMany({ orderBy: { name: "asc" } }),
    subjectAreas,
  );
}

export async function getSubject(slug: string): Promise<any | null> {
  const subject = await safeDb(
    async () =>
      prisma.subjectArea.findUnique({
        where: { slug },
        include: { programmes: { include: { college: true, foreignUniversity: true } } },
      }),
    null,
  );

  if (subject) return subject;

  const fallback = getSubjectBySlug(slug);
  if (!fallback) return null;
  return {
    ...fallback,
    programmes: programmes
      .filter((programme) => programme.subjectSlug === slug)
      .map((programme) => ({
        ...programme,
        college: colleges.find((college) => college.slug === programme.collegeSlug),
        foreignUniversity: foreignUniversities.find((university) => university.slug === programme.universitySlug),
      })),
  };
}

export async function getServices(): Promise<any[]> {
  return safeDb(
    async () => prisma.service.findMany({ where: { isActive: true }, orderBy: { title: "asc" } }),
    services,
  );
}

export async function getService(slug: string): Promise<any | null> {
  return safeDb(
    async () => prisma.service.findUnique({ where: { slug } }),
    getServiceBySlug(slug) || null,
  );
}

export async function getBlogPosts(): Promise<any[]> {
  return safeDb(
    async () =>
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      }),
    blogPosts,
  );
}

export async function getBlogPost(slug: string): Promise<any | null> {
  return safeDb(
    async () => prisma.blogPost.findUnique({ where: { slug } }),
    getBlogPostBySlug(slug) || null,
  );
}

export async function getFaqs(): Promise<any[]> {
  return safeDb(
    async () => prisma.fAQ.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
    faqs,
  );
}

export async function getTestimonials(): Promise<any[]> {
  return safeDb(
    async () => prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { createdAt: "asc" } }),
    testimonials,
  );
}

export async function getPolicy(slug: string): Promise<any | null> {
  return safeDb(
    async () => prisma.policyPage.findUnique({ where: { slug } }),
    policyPages.find((page) => page.slug === slug) || null,
  );
}
