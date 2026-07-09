import { Schema, model } from "mongoose";
import { ProjectCategory } from "@portfolio/shared";

// Portfolio project. Backend owns this collection.
// `slug` is unique and is the public route identifier — never expose _id in URLs.
const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, enum: Object.values(ProjectCategory), required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    techTags: { type: [String], default: [] },
    coverImage: { type: String, required: true },
    liveUrl: { type: String, default: null },
    githubUrl: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ProjectModel = model("Project", projectSchema);
