import rateLimit from "express-rate-limit";

// Protects the AI route from abuse and runaway cost: 5 requests per 10 minutes per IP.
export const aiRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: { message: "Too many AI requests — please try again in a few minutes.", code: "RATE_LIMITED" },
  },
});
