import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { fail } from "@portfolio/shared";

// Zod validation at the API boundary. Rejects invalid input with the
// standard error envelope before it reaches a controller/service.
export function validate(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join("; ");
      res.status(400).json(fail(message, "VALIDATION_ERROR"));
      return;
    }
    req.body = result.data;
    next();
  };
}
