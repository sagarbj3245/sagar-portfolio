import { Router } from "express";
import { ok } from "@portfolio/shared";
import { healthRouter } from "./health";
import { experienceRouter } from "./experience";
import { messageRouter } from "./messages";
import { projectRouter } from "./projects";
import { authRouter } from "./auth";
import { aiRouter } from "./ai";

// Root API router. Feature routers (projects, messages, ai, auth) mount here in later stories.
export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json(ok({ name: "sagar-portfolio-api", status: "ok" }));
});

apiRouter.use("/health", healthRouter);
apiRouter.use("/experiences", experienceRouter);
apiRouter.use("/messages", messageRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/ai", aiRouter);
