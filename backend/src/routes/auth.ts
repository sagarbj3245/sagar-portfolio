import { Router } from "express";
import { loginSchema } from "@portfolio/shared";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { login, logout, me } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/me", requireAuth, me);
