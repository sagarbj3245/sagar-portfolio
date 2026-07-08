import { Router } from "express";
import { ok } from "@portfolio/shared";

// Root API router. Feature routers (projects, experiences, messages, ai, auth)
// mount here in later stories.
export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json(ok({ name: "sagar-portfolio-api", status: "scaffold" }));
});
