import { Router } from "express";
import { aiDraftSchema } from "@portfolio/shared";
import { validate } from "../middleware/validate";
import { aiRateLimit } from "../middleware/rate-limit";
import { generateDraft } from "../controllers/ai.controller";

export const aiRouter = Router();

// POST /api/ai/draft → generate a polished contact message from a rough intent.
aiRouter.post("/draft", aiRateLimit, validate(aiDraftSchema), generateDraft);
