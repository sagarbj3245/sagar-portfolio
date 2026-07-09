import { Router } from "express";
import { ok } from "@portfolio/shared";

export const healthRouter = Router();

// GET /api/health → liveness check in the standard envelope.
healthRouter.get("/", (_req, res) => {
  res.json(ok({ status: "ok" }));
});
