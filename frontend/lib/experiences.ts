import type { Experience } from "@portfolio/shared";
import { API_URL } from "./api";

// Server-side read. A failed fetch THROWS so a background revalidation keeps
// serving the last good page instead of caching an empty one (stale-on-error).
export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${API_URL}/api/experiences`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Experiences fetch failed (${res.status})`);
  const json = await res.json();
  return (json.data as Experience[]) ?? [];
}
