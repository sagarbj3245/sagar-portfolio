import type { ApiResponse } from "@portfolio/shared";

// Base URLs from env — non-secret client config.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

// Server-side fetch with retries: rides out the free-tier backend's cold
// starts (~60s) during builds and ISR revalidations.
export async function apiFetch(path: string, revalidate = 60): Promise<Response> {
  const attempts = 4;
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
      if (res.ok || res.status === 404) return res;
      lastError = new Error(`API ${path} responded ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 20_000));
  }
  throw lastError instanceof Error ? lastError : new Error(`API ${path} unreachable`);
}

export type { ApiResponse };
