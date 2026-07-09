import type { Experience } from "@portfolio/shared";
import { API_URL } from "./api";

// Server-side fetch of experience/education entries. Fails soft to an empty list so the page still renders.
export async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_URL}/api/experiences`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as Experience[]) ?? [];
  } catch {
    return [];
  }
}
