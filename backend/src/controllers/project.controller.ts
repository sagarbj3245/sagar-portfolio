import type { NextFunction, Request, Response } from "express";
import { ok, fail, type ProjectInput } from "@portfolio/shared";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

function isDuplicateSlug(err: unknown): boolean {
  return (
    typeof err === "object" && err !== null && (err as { code?: number }).code === 11000
  );
}

export async function listProjects(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(ok(await getProjects()));
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = String(req.params.slug);
    const project = await getProjectBySlug(slug);
    if (!project) {
      res.status(404).json(fail(`Project not found: ${slug}`, "NOT_FOUND"));
      return;
    }
    res.json(ok(project));
  } catch (err) {
    next(err);
  }
}

export async function addProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await createProject(req.body as ProjectInput);
    res.status(201).json(ok(project));
  } catch (err) {
    if (isDuplicateSlug(err)) {
      res.status(409).json(fail("A project with that slug already exists", "SLUG_TAKEN"));
      return;
    }
    next(err);
  }
}

export async function editProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await updateProject(String(req.params.id), req.body as ProjectInput);
    if (!project) {
      res.status(404).json(fail("Project not found", "NOT_FOUND"));
      return;
    }
    res.json(ok(project));
  } catch (err) {
    if (isDuplicateSlug(err)) {
      res.status(409).json(fail("A project with that slug already exists", "SLUG_TAKEN"));
      return;
    }
    next(err);
  }
}

export async function removeProject(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await deleteProject(String(req.params.id));
    if (!deleted) {
      res.status(404).json(fail("Project not found", "NOT_FOUND"));
      return;
    }
    res.json(ok({ deleted: true }));
  } catch (err) {
    next(err);
  }
}
