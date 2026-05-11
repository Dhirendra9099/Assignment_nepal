import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {
  blogPosts,
  colleges,
  faqs,
  foreignUniversities,
  policyPages,
  programmes,
  services,
  subjectAreas,
  testimonials,
} from "../src/lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeMe123!", 12);

  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "assignmentnepal63@gmail.com" },
    update: { passwordHash, role: "SUPER_ADMIN" },
    create: {
      name: "Assignment Nepal Admin",
      email: process.env.ADMIN_EMAIL || "assignmentnepal63@gmail.com",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  for (const subject of subjectAreas) {
    await prisma.subjectArea.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject,
    });
  }

  for (const university of foreignUniversities) {
    await prisma.foreignUniversity.upsert({
      where: { slug: university.slug },
      update: {
        ...university,
        lastVerifiedAt: university.lastVerifiedAt ? new Date(university.lastVerifiedAt) : null,
      },
      create: {
        ...university,
        lastVerifiedAt: university.lastVerifiedAt ? new Date(university.lastVerifiedAt) : null,
      },
    });
  }

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { slug: college.slug },
      update: {
        name: college.name,
        description: college.description,
        city: college.city,
        address: college.address,
        country: college.country,
        websiteUrl: college.websiteUrl,
        featuredImage: college.featuredImage,
        status: college.status as never,
        isFeatured: college.isFeatured,
        sourceUrl: college.sourceUrl,
        lastVerifiedAt: college.lastVerifiedAt ? new Date(college.lastVerifiedAt) : null,
      },
      create: {
        name: college.name,
        slug: college.slug,
        description: college.description,
        city: college.city,
        address: college.address,
        country: college.country,
        websiteUrl: college.websiteUrl,
        featuredImage: college.featuredImage,
        status: college.status as never,
        isFeatured: college.isFeatured,
        sourceUrl: college.sourceUrl,
        lastVerifiedAt: college.lastVerifiedAt ? new Date(college.lastVerifiedAt) : null,
      },
    });
  }

  for (const college of colleges) {
    const collegeRecord = await prisma.college.findUniqueOrThrow({ where: { slug: college.slug } });
    const partnerNames =
      college.slug === "the-british-college"
        ? [...college.universityNames, "UWE Bristol"]
        : college.universityNames;

    for (const universityName of partnerNames) {
      const university = await prisma.foreignUniversity.findFirstOrThrow({
        where: { name: universityName },
      });
      await prisma.affiliation.upsert({
        where: {
          collegeId_foreignUniversityId_affiliationType: {
            collegeId: collegeRecord.id,
            foreignUniversityId: university.id,
            affiliationType: "Academic partner",
          },
        },
        update: {
          notes: college.note,
          sourceUrl: college.sourceUrl,
          lastVerifiedAt: college.lastVerifiedAt ? new Date(college.lastVerifiedAt) : null,
        },
        create: {
          collegeId: collegeRecord.id,
          foreignUniversityId: university.id,
          affiliationType: "Academic partner",
          notes: college.note,
          sourceUrl: college.sourceUrl,
          lastVerifiedAt: college.lastVerifiedAt ? new Date(college.lastVerifiedAt) : null,
        },
      });
    }
  }

  for (const programme of programmes) {
    const college = await prisma.college.findUniqueOrThrow({ where: { slug: programme.collegeSlug } });
    const university = await prisma.foreignUniversity.findUniqueOrThrow({
      where: { slug: programme.universitySlug },
    });
    const subject = await prisma.subjectArea.findUniqueOrThrow({
      where: { slug: programme.subjectSlug },
    });

    const savedProgramme = await prisma.programme.upsert({
      where: { slug: programme.slug },
      update: {
        collegeId: college.id,
        foreignUniversityId: university.id,
        subjectAreaId: subject.id,
        title: programme.title,
        degreeLevel: programme.degreeLevel,
        discipline: programme.discipline,
        duration: programme.duration,
        intakeInfo: programme.intakeInfo,
        overview: programme.overview,
        assessmentStyleNotes: programme.assessmentStyleNotes,
        careerNotes: programme.careerNotes,
        sourceUrl: programme.sourceUrl,
        lastVerifiedAt: programme.lastVerifiedAt ? new Date(programme.lastVerifiedAt) : null,
        status: programme.status as never,
        isFeatured: programme.isFeatured,
      },
      create: {
        collegeId: college.id,
        foreignUniversityId: university.id,
        subjectAreaId: subject.id,
        title: programme.title,
        slug: programme.slug,
        degreeLevel: programme.degreeLevel,
        discipline: programme.discipline,
        duration: programme.duration,
        intakeInfo: programme.intakeInfo,
        overview: programme.overview,
        assessmentStyleNotes: programme.assessmentStyleNotes,
        careerNotes: programme.careerNotes,
        sourceUrl: programme.sourceUrl,
        lastVerifiedAt: programme.lastVerifiedAt ? new Date(programme.lastVerifiedAt) : null,
        status: programme.status as never,
        isFeatured: programme.isFeatured,
      },
    });

    for (const moduleItem of programme.modules) {
      await prisma.module.upsert({
        where: {
          programmeId_slug: {
            programmeId: savedProgramme.id,
            slug: moduleItem.slug,
          },
        },
        update: {
          title: moduleItem.title,
          code: moduleItem.code,
          yearOrLevel: moduleItem.yearOrLevel,
          semester: moduleItem.semester,
          credits: moduleItem.credits,
          description: moduleItem.description,
          sourceUrl: moduleItem.sourceUrl,
          lastVerifiedAt: moduleItem.lastVerifiedAt ? new Date(moduleItem.lastVerifiedAt) : null,
        },
        create: {
          programmeId: savedProgramme.id,
          title: moduleItem.title,
          slug: moduleItem.slug,
          code: moduleItem.code,
          yearOrLevel: moduleItem.yearOrLevel,
          semester: moduleItem.semester,
          credits: moduleItem.credits,
          description: moduleItem.description,
          sourceUrl: moduleItem.sourceUrl,
          lastVerifiedAt: moduleItem.lastVerifiedAt ? new Date(moduleItem.lastVerifiedAt) : null,
        },
      });
    }
  }

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        status: post.status as never,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      },
      create: {
        ...post,
        status: post.status as never,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      },
    });
  }

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: `${faq.order}` },
      update: faq,
      create: {
        id: `${faq.order}`,
        ...faq,
      },
    });
  }

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  for (const page of policyPages) {
    await prisma.policyPage.upsert({
      where: { slug: page.slug },
      update: {
        ...page,
        publishedAt: new Date("2026-01-20"),
      },
      create: {
        ...page,
        publishedAt: new Date("2026-01-20"),
      },
    });
  }

  await prisma.seoPage.upsert({
    where: { path: "/" },
    update: {
      metaTitle: "Assignment Nepal | Ethical Academic Support and Foreign-Affiliated College Directory",
      metaDescription:
        "Explore foreign-affiliated colleges, universities, programmes, modules, and ethical academic support services for students in Nepal.",
    },
    create: {
      path: "/",
      metaTitle: "Assignment Nepal | Ethical Academic Support and Foreign-Affiliated College Directory",
      metaDescription:
        "Explore foreign-affiliated colleges, universities, programmes, modules, and ethical academic support services for students in Nepal.",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
