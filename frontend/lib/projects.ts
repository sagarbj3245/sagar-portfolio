import type { Project } from "@portfolio/shared";
import { apiFetch } from "./api";

// Server-side reads, with retries for backend cold starts. A fetch that still
// fails THROWS so a background revalidation keeps serving the last good page
// instead of caching an empty one (stale-on-error).
export async function getProjects(): Promise<Project[]> {
  const res = await apiFetch("/api/projects");
  const json = await res.json();
  return (json.data as Project[]) ?? [];
}

export async function getProject(slug: string): Promise<Project | null> {
  const res = await apiFetch(`/api/projects/${slug}`);
  if (res.status === 404) return null;
  const json = await res.json();
  return (json.data as Project) ?? null;
}

export function prettyCategory(category: string): string {
  return category.replace(/-/g, " ");
}
