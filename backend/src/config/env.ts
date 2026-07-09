import "dotenv/config";

// Central config surface.
export const env = {
  port: Number(process.env.PORT ?? 5000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/sagar_portfolio",

  // Admin auth. Credentials compared directly against env.
  adminUser: process.env.ADMIN_USER ?? "admin",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  isProd: process.env.NODE_ENV === "production",

  // Contact-form email notification (optional — form still stores messages without it).
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  contactTo: process.env.CONTACT_TO ?? "sagarbj001@gmail.com",

  // AI draft assist.
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  aiModel: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
} as const;
