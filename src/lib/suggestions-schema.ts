import { z } from "zod";

// Shared by the suggestions endpoint (to generate) and the chat client (so
// `useObject` can parse the streamed partial object).
export const suggestionsSchema = z.object({
  questions: z
    .array(z.string())
    .max(3)
    .describe(
      "Up to 3 short follow-up questions from the visitor's perspective - only ones answerable from the knowledge base or blog. Fewer is fine; omit any that aren't grounded.",
    ),
});
