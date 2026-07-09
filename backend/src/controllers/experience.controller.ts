import type { NextFunction, Request, Response } from "express";
import { ok, fail, type ExperienceInput } from "@portfolio/shared";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experience.service";

// Controllers handle request/response only; business logic lives in services.
export async function listExperiences(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(ok(await getExperiences()));
  } catch (err) {
    next(err);
  }
}

export async function addExperience(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(ok(await createExperience(req.body as ExperienceInput)));
  } catch (err) {
    next(err);
  }
}

export async function editExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await updateExperience(String(req.params.id), req.body as ExperienceInput);
    if (!updated) {
      res.status(404).json(fail("Experience not found", "NOT_FOUND"));
      return;
    }
    res.json(ok(updated));
  } catch (err) {
    next(err);
  }
}

export async function removeExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await deleteExperience(String(req.params.id));
    if (!deleted) {
      res.status(404).json(fail("Experience not found", "NOT_FOUND"));
      return;
    }
    res.json(ok({ deleted: true }));
  } catch (err) {
    next(err);
  }
}
