import { z } from "zod";

// Shared by the suggestions endpoint (to generate) and the chat client (so
// `useObject` can parse the streamed partial object).
export const suggestionsSchema = z.object({
  questions: z
    .array(z.string())
    .length(3)
    .describe("Three short follow-up questions from the visitor's perspective"),
});
