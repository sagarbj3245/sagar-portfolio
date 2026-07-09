import { Schema, model } from "mongoose";
import { ExperienceKind } from "@portfolio/shared";

// Experience / education entry. Backend owns this collection.
const experienceSchema = new Schema(
  {
    org: { type: String, required: true },
    role: { type: String, required: true },
    kind: { type: String, enum: Object.values(ExperienceKind), required: true },
    location: { type: String },
    startDate: { type: String, required: true }, // display label, e.g. "Jun 2026"
    endDate: { type: String, default: null }, // null → "Present"
    order: { type: Number, default: 0 },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const ExperienceModel = model("Experience", experienceSchema);
