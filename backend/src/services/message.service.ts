import { MessageModel } from "../models/message";
import type { ContactMessageInput } from "@portfolio/shared";

export interface StoredMessage extends ContactMessageInput {
  id: string;
  createdAt: string;
}

export async function createMessage(input: ContactMessageInput): Promise<{ id: string }> {
  const doc = await MessageModel.create(input);
  return { id: String(doc._id) };
}

export async function listMessages(): Promise<StoredMessage[]> {
  const docs = await ScopedFind();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name as string,
    email: doc.email as string,
    message: doc.message as string,
    createdAt: (doc.createdAt as Date)?.toISOString?.() ?? "",
  }));
}

export async function deleteMessage(id: string): Promise<boolean> {
  const res = await MessageModel.findByIdAndDelete(id);
  return Boolean(res);
}

async function ScopedFind(): Promise<Record<string, unknown>[]> {
  return MessageModel.find().sort({ createdAt: -1 }).lean();
}
