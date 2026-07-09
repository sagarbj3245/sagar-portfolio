import type { NextFunction, Request, Response } from "express";
import { ok, fail, type AiDraftInput } from "@portfolio/shared";
import { draftMessage } from "../services/ai.service";

export async function generateDraft(req: Request, res: Response, _next: NextFunction) {
  try {
    const { intent, name } = req.body as AiDraftInput;
    const draft = await draftMessage(intent, name);
    res.json(ok({ draft }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[ai] draft failed:", (err as Error)?.message ?? err);
    res
      .status(503)
      .json(fail("AI drafting is unavailable right now — please type your message.", "AI_UNAVAILABLE"));
  }
}
