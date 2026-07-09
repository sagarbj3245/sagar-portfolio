import type { NextFunction, Request, Response } from "express";
import { fail } from "@portfolio/shared";

/** A typed, intentional error carrying an HTTP status and a stable code. */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/** 404 for any unmatched route — returns the standard error envelope. */
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json(fail(`Not found: ${req.method} ${req.path}`, "NOT_FOUND"));
}

/** Central error handler — maps every error to the {error:{message,code}} envelope. */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(fail(err.message, err.code));
    return;
  }
  // eslint-disable-next-line no-console
  console.error("Unhandled error:", err);
  res.status(500).json(fail("Internal Server Error", "INTERNAL"));
}
