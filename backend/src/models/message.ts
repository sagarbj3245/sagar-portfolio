import { Schema, model } from "mongoose";

// Contact message. Backend owns this collection.
const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export const MessageModel = model("Message", messageSchema);
