import { Output, streamText } from "ai";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { CHAT_KNOWLEDGE_BASE, SUGGESTIONS_MODEL } from "@/lib/ai";
import { parseJsonRequest } from "@/lib/request";
import { suggestionsSchema } from "@/lib/suggestions-schema";

export const prerender = false;
export const maxDuration = 15;

const requestSchema = z.object({
  reply: z.string().min(1).max(8000),
  question: z.string().max(2000).optional(),
});

export const POST: APIRoute = async ({ request }) => {
  const parsed = await parseJsonRequest(request, requestSchema);
  if (parsed.response) {
    return parsed.response;
  }

  const { reply, question } = parsed.data;

  const result = streamText({
    model: SUGGESTIONS_MODEL,
    output: Output.object({ schema: suggestionsSchema }),
    prompt: `You write follow-up questions for visitors chatting with Nikolai Lehbrink's website assistant.

The assistant can only answer from the knowledge base below, or by searching Nikolai's blog posts. Don't invent natural-sounding questions from the topic - instead, surface concrete things the knowledge base (or blog) actually covers that are relevant here and haven't been said yet, phrased as a short question the visitor would ask.

Rules:
- Go deeper first. Prefer questions that drill into the topic the visitor just asked about, using concrete knowledge-base detail the reply left out (e.g. after "I studied Media Computer Science", the KB also has the focus areas, the years, and how the first 2018 student project got him into web dev). Only branch to a different topic once the knowledge base has nothing more to add on the current one.
- Every question MUST have a concrete answer in the knowledge base, or be clearly about Nikolai's blog/writing. If the knowledge base doesn't cover it, leave it out - even if it's the obvious next question (e.g. don't ask about chess openings if only "plays chess" is on record).
- Up to 3 questions; return fewer (or none) rather than padding with unanswerable ones.
- Keep each under 8 words, from the visitor's perspective, and don't repeat what was already answered.

### Knowledge Base
${CHAT_KNOWLEDGE_BASE}

### Recent exchange
Visitor asked: ${question ?? "(start of the conversation)"}
Assistant replied: ${reply}`,
  });

  return result.toTextStreamResponse();
};
