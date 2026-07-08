import express from "express";
import { apiRouter } from "./routes/index";

// Assembles the Express application. Core middleware (logging, validation,
// error handling) and the DB connection are added in Story 1.2.
export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/api", apiRouter);

  return app;
}
