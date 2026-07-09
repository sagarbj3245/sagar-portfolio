import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ok, fail, type LoginInput } from "@portfolio/shared";
import { env } from "../config/env";

const COOKIE = "token";

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  };
}

export function login(req: Request, res: Response) {
  const { username, password } = req.body as LoginInput;
  const valid =
    !!env.adminPassword && username === env.adminUser && password === env.adminPassword;

  if (!valid) {
    res.status(401).json(fail("Invalid username or password", "INVALID_CREDENTIALS"));
    return;
  }

  const token = jwt.sign({ sub: username, role: "admin" }, env.jwtSecret, { expiresIn: "7d" });
  res.cookie(COOKIE, token, cookieOptions());
  res.json(ok({ user: username }));
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE, { path: "/" });
  res.json(ok({ ok: true }));
}

export function me(_req: Request, res: Response) {
  res.json(ok({ authenticated: true }));
}
