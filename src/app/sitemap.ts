import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { colleges, foreignUniversities, programmes, services, blogPosts, subjectAreas } from "@/lib/sample-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/colleges",
    "/foreign-universities",
    "/programmes",
    "/subjects",
    "/services",
    "/blog",
    "/faq",
    "/contact",
    "/about",
    "/academic-integrity",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/correction-request",
  ];

  const dynamicPaths = [
    ...colleges.map((item) => `/colleges/${item.slug}`),
    ...foreignUniversities.map((item) => `/foreign-universities/${item.slug}`),
    ...programmes.map((item) => `/programmes/${item.slug}`),
    ...subjectAreas.map((item) => `/subjects/${item.slug}`),
    ...services.map((item) => `/services/${item.slug}`),
    ...blogPosts.map((item) => `/blog/${item.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
