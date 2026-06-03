import { Output, streamText } from "ai";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { SUGGESTIONS_MODEL } from "@/lib/ai";
import { parseJsonRequest } from "@/lib/request";
import { suggestionsSchema } from "@/lib/suggestions-schema";

export const prerender = false;
export const maxDuration = 15;

const requestSchema = z.object({
  text: z.string().min(1).max(8000),
});

export const POST: APIRoute = async ({ request }) => {
  const parsed = await parseJsonRequest(request, requestSchema);
  if (parsed.response) {
    return parsed.response;
  }

  const result = streamText({
    model: SUGGESTIONS_MODEL,
    output: Output.object({ schema: suggestionsSchema }),
    prompt: `Based on this reply from Nikolai's website assistant, suggest 3 short, natural follow-up questions a visitor might ask next. Phrase them from the visitor's perspective, keep each under 8 words, and don't repeat what was already answered.\n\nReply:\n${parsed.data.text}`,
  });

  return result.toTextStreamResponse();
};
