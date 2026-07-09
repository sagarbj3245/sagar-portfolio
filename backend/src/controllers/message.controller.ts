import type { NextFunction, Request, Response } from "express";
import { ok, fail, type ContactMessageInput } from "@portfolio/shared";
import { createMessage, listMessages, deleteMessage } from "../services/message.service";
import { sendContactNotification } from "../services/email.service";

// Public: body is already validated by the `validate` middleware.
export async function submitMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const input = req.body as ContactMessageInput;
    const saved = await createMessage(input);

    // Email is best-effort — never fail the request if notification fails.
    void sendContactNotification(input).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("[email] notification failed:", err?.message ?? err);
    });

    res.status(201).json(ok({ id: saved.id }));
  } catch (err) {
    next(err);
  }
}

// Admin-only.
export async function listAllMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(ok(await listMessages()));
  } catch (err) {
    next(err);
  }
}

export async function removeMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await deleteMessage(String(req.params.id));
    if (!deleted) {
      res.status(404).json(fail("Message not found", "NOT_FOUND"));
      return;
    }
    res.json(ok({ deleted: true }));
  } catch (err) {
    next(err);
  }
}
