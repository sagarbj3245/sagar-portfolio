import OpenAI from "openai";
import { env } from "../config/env";

const SYSTEM_PROMPT =
  "You help visitors write a short, professional message to Sagar B J, a full-stack developer, through his portfolio contact form. Given the visitor's rough intent, write a concise, friendly, first-person message of 2 to 4 sentences that they can send as-is. Do not add a greeting like 'Dear Sagar' or a signature — return only the message body.";

export async function draftMessage(intent: string, name?: string): Promise<string> {
  if (!env.openaiApiKey) {
    throw new Error("AI drafting is not available right now.");
  }

  const client = new OpenAI({ apiKey: env.openaiApiKey });

  const completion = await client.chat.completions.create({
    model: env.aiModel,
    temperature: 0.7,
    max_tokens: 220,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Rough intent: ${intent}${name ? `\nMy name: ${name}` : ""}`,
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}
