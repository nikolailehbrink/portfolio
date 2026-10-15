import { z } from "zod";

import { KNOWLEDGE_ENTRY_TYPES } from "@/db/schema";

export const MAX_KNOWLEDGE_INPUT_CHARS = 8000;

/**
 * The shape the LLM has to produce from a raw message or voice transcript.
 * Constrained tightly on purpose: short fields keep the timeline scannable and
 * make it obvious when the model starts padding instead of summarizing.
 */
export const knowledgeEntryDraftSchema = z.object({
  type: z
    .enum(KNOWLEDGE_ENTRY_TYPES)
    .describe(
      "learning: something that was learned. resource: a link, article, repository or video worth keeping. idea: a product or project idea. insight: a thought or conclusion. question: something to investigate later.",
    ),
  title: z
    .string()
    .min(3)
    .max(80)
    .describe("A concise, specific headline without trailing punctuation."),
  content: z
    .string()
    .min(1)
    .describe(
      "The cleaned up entry in clear English, in the first person. Plain text only - no markdown, no headings, no bullet points. Use blank lines to separate paragraphs.",
    ),
  summary: z
    .string()
    .min(1)
    .max(200)
    .describe("One sentence that captures the essence of the entry."),
  tags: z
    .array(z.string().min(1).max(30))
    .max(5)
    .describe(
      "Topical tags in natural capitalization, e.g. 'React Router 7', 'SEO', 'Postgres'.",
    ),
  // Plain string rather than `z.url()`: the URL format keyword is rejected by
  // OpenAI's structured outputs, so the value is validated after generation
  // (see `normalizeSourceUrl`).
  sourceUrl: z
    .string()
    .nullable()
    .describe(
      "The single most relevant absolute http(s) URL mentioned in the input, or null if none was mentioned. Never invent a URL.",
    ),
});

/**
 * Keep only absolute http(s) URLs. Guards against the model returning a bare
 * domain, a placeholder or something that isn't a link at all - the value ends
 * up in an `href` on a public page.
 */
export function normalizeSourceUrl(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}
