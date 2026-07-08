import "dotenv/config";

// Central config surface (AD-7: secrets read from env only, never hardcoded).
// Only PORT is needed for the Story 1.1 scaffold; DB/auth/LLM keys arrive in later stories.
export const env = {
  port: Number(process.env.PORT ?? 5000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
} as const;
