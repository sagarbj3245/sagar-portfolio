import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { fail } from "@portfolio/shared";
import { env } from "../config/env";

// Gate for admin-only routes: verifies the signed JWT from the httpOnly cookie.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = (req as Request & { cookies?: Record<string, string> }).cookies?.token;
  if (!token) {
    res.status(401).json(fail("Not authenticated", "UNAUTHORIZED"));
    return;
  }
  try {
    jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    res.status(401).json(fail("Invalid or expired session", "UNAUTHORIZED"));
  }
}
