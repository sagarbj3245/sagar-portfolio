import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index";
import { env } from "./config/env";
import { requestLogger } from "./middleware/logger";
import { errorHandler, notFoundHandler } from "./middleware/error";

// Assembles the Express application. The DB connection is opened in server.ts.
export function createApp() {
  const app = express();

  // Behind Render's proxy in production — needed for correct client IPs (rate limiting).
  app.set("trust proxy", 1);

  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(cookieParser());
  app.use(requestLogger);
  app.use(express.json());

  app.use("/api", apiRouter);

  // Order matters: unmatched routes → 404, then the central error handler last.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
