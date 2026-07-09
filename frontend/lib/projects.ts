import type { Project } from "@portfolio/shared";
import { API_URL } from "./api";

// Server-side reads. A failed fetch THROWS so a background revalidation keeps
// serving the last good page instead of caching an empty one (stale-on-error).
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Projects fetch failed (${res.status})`);
  const json = await res.json();
  return (json.data as Project[]) ?? [];
}

export async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_URL}/api/projects/${slug}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Project fetch failed (${res.status})`);
  const json = await res.json();
  return (json.data as Project) ?? null;
}

export function prettyCategory(category: string): string {
  return category.replace(/-/g, " ");
}
