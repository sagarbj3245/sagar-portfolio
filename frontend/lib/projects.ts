import type { Project } from "@portfolio/shared";
import { API_URL } from "./api";

// Server-side reads. Fail soft.
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as Project[]) ?? [];
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data as Project) ?? null;
  } catch {
    return null;
  }
}

export function prettyCategory(category: string): string {
  return category.replace(/-/g, " ");
}
