import { Router } from "express";
import { experienceInputSchema } from "@portfolio/shared";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  listExperiences,
  addExperience,
  editExperience,
  removeExperience,
} from "../controllers/experience.controller";

export const experienceRouter = Router();

// Public read.
experienceRouter.get("/", listExperiences);

// Admin-only writes.
experienceRouter.post("/", requireAuth, validate(experienceInputSchema), addExperience);
experienceRouter.put("/:id", requireAuth, validate(experienceInputSchema), editExperience);
experienceRouter.delete("/:id", requireAuth, removeExperience);
