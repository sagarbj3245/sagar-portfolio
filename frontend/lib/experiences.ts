import type { Experience } from "@portfolio/shared";
import { apiFetch } from "./api";

// Server-side read, with retries for backend cold starts. A fetch that still
// fails THROWS so a background revalidation keeps serving the last good page
// instead of caching an empty one (stale-on-error).
export async function getExperiences(): Promise<Experience[]> {
  const res = await apiFetch("/api/experiences");
  const json = await res.json();
  return (json.data as Experience[]) ?? [];
}
