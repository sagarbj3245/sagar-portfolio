import { Router } from "express";
import { projectInputSchema } from "@portfolio/shared";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  listProjects,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "../controllers/project.controller";

export const projectRouter = Router();

// Public reads.
projectRouter.get("/", listProjects);
projectRouter.get("/:slug", getProject);

// Admin-only writes.
projectRouter.post("/", requireAuth, validate(projectInputSchema), addProject);
projectRouter.put("/:id", requireAuth, validate(projectInputSchema), editProject);
projectRouter.delete("/:id", requireAuth, removeProject);
