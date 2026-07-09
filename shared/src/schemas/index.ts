// Canonical Zod schemas shared by the API validation boundary and the RHF forms.
// The inferred types are the wire contract both sides compile against.
import { z } from "zod";
import { ExperienceKind, ProjectCategory } from "../enums/index";

/** Experience / education timeline entry. */
export const experienceSchema = z.object({
  id: z.string(),
  org: z.string(),
  role: z.string(),
  kind: z.enum(ExperienceKind),
  location: z.string().optional(),
  startDate: z.string(), // display label, e.g. "Jun 2026"
  endDate: z.string().nullable(), // null → "Present"
  order: z.number(),
  highlights: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;

/** Input for creating/updating an experience (no server-assigned id). */
export const experienceInputSchema = experienceSchema.omit({ id: true });
export type ExperienceInput = z.infer<typeof experienceInputSchema>;

/** Contact form input — one Zod schema for both API validation and the RHF form. */
export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

/** Portfolio project. Slug is the public route identifier. */
export const projectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.enum(ProjectCategory),
  summary: z.string(),
  description: z.string(),
  techTags: z.array(z.string()),
  coverImage: z.string(),
  liveUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  order: z.number(),
});

export type Project = z.infer<typeof projectSchema>;

/** Input for creating/updating a project (no server-assigned id). */
export const projectInputSchema = projectSchema.omit({ id: true });
export type ProjectInput = z.infer<typeof projectInputSchema>;

/** AI draft-message input. */
export const aiDraftSchema = z.object({
  intent: z
    .string()
    .min(3, "Describe your message in a few words")
    .max(500, "That's a bit long"),
  name: z.string().max(100).optional(),
});
export type AiDraftInput = z.infer<typeof aiDraftSchema>;

/** Admin login input. */
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;
