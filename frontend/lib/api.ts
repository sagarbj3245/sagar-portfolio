import type { ApiResponse } from "@portfolio/shared";

// Base URL of the Express API (non-secret; AD-7). Real fetch/React Query
// wrappers arrive with the data stories (Story 2.x+).
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type { ApiResponse };
