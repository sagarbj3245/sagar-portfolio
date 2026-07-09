import { ProjectModel } from "../models/project";
import type { Project, ProjectInput } from "@portfolio/shared";

export async function getProjects(): Promise<Project[]> {
  const docs = await ProjectModel.find().sort({ order: 1 }).lean();
  return docs.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const doc = await ProjectModel.findOne({ slug }).lean();
  return doc ? toProject(doc) : null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const doc = await ProjectModel.create(input);
  return toProject(doc.toObject());
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project | null> {
  const doc = await ProjectModel.findByIdAndUpdate(id, input, { new: true, runValidators: true }).lean();
  return doc ? toProject(doc) : null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const res = await ProjectModel.findByIdAndDelete(id);
  return Boolean(res);
}

// Map a Mongo document to the wire contract: _id → id.
function toProject(doc: Record<string, unknown>): Project {
  return {
    id: String(doc._id),
    slug: doc.slug as string,
    title: doc.title as string,
    category: doc.category as Project["category"],
    summary: doc.summary as string,
    description: doc.description as string,
    techTags: (doc.techTags as string[]) ?? [],
    coverImage: doc.coverImage as string,
    liveUrl: (doc.liveUrl as string | null) ?? null,
    githubUrl: (doc.githubUrl as string | null) ?? null,
    order: (doc.order as number) ?? 0,
  };
}
