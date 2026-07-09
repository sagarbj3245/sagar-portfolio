import type { ApiResponse } from "@portfolio/shared";

// Base URLs from env — non-secret client config.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export type { ApiResponse };
