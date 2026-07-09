import { ExperienceModel } from "../models/experience";
import type { Experience, ExperienceInput } from "@portfolio/shared";

// Services are the only layer that touches Mongoose models.
export async function getExperiences(): Promise<Experience[]> {
  const docs = await ExperienceModel.find().sort({ order: 1 }).lean();
  return docs.map(toExperience);
}

export async function createExperience(input: ExperienceInput): Promise<Experience> {
  const doc = await ExperienceModel.create(input);
  return toExperience(doc.toObject());
}

export async function updateExperience(
  id: string,
  input: ExperienceInput,
): Promise<Experience | null> {
  const doc = await ExperienceModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).lean();
  return doc ? toExperience(doc) : null;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const res = await ExperienceModel.findByIdAndDelete(id);
  return Boolean(res);
}

// Map a Mongo document to the wire contract: _id → id, never leak _id.
function toExperience(doc: Record<string, unknown>): Experience {
  return {
    id: String(doc._id),
    org: doc.org as string,
    role: doc.role as string,
    kind: doc.kind as Experience["kind"],
    location: (doc.location as string | undefined) ?? undefined,
    startDate: doc.startDate as string,
    endDate: (doc.endDate as string | null) ?? null,
    order: (doc.order as number) ?? 0,
    highlights: (doc.highlights as string[]) ?? [],
  };
}
