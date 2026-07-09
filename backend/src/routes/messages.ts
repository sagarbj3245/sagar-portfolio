import { Router } from "express";
import { contactMessageSchema } from "@portfolio/shared";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  submitMessage,
  listAllMessages,
  removeMessage,
} from "../controllers/message.controller";

export const messageRouter = Router();

// Public: submit a contact message.
messageRouter.post("/", validate(contactMessageSchema), submitMessage);

// Admin-only: inbox.
messageRouter.get("/", requireAuth, listAllMessages);
messageRouter.delete("/:id", requireAuth, removeMessage);
