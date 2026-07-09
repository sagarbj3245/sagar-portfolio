import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
