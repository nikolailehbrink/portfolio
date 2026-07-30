import { gateway, generateText, Output, transcribe } from "ai";

import {
  KNOWLEDGE_LOG_MODEL,
  KNOWLEDGE_LOG_TRANSCRIPTION_MODEL,
} from "@/lib/ai";
import { knowledgeEntryDraftSchema, normalizeSourceUrl } from "./definitions";

const INSTRUCTIONS = `You turn Nikolai Lehbrink's raw notes into structured entries for the "Knowledge Log" on his personal website. The input is either a quickly typed message or an automatic transcript of a voice note, so expect filler words, false starts, self-corrections and transcription errors.

Rules:
- Preserve the original meaning exactly. Never add facts, examples, opinions, numbers or conclusions that are not in the input.
- If something in the input is unclear or garbled, keep it vague instead of guessing what was meant. Do not resolve ambiguity by inventing detail.
- Rewrite into clear, natural English in the first person ("I"), even when the input is in another language. Fix spelling, grammar and punctuation, drop filler words and repetitions.
- The content is rendered as plain text: no markdown, no headings, no bullet lists. Separate paragraphs with a blank line.
- Keep the author's voice: direct, conversational, concise. Do not make it sound like marketing copy or a textbook.
- Only extract a sourceUrl that literally appears in the input. Repair an obviously mangled transcription of a well-known domain (e.g. "github dot com slash foo" -> "https://github.com/foo") but never fabricate a path or a link.
- Pick exactly one type - the one that matches the author's intent, not just the topic. A link worth keeping is a resource even when something was learned from it. An open question is a question even when it sounds like an idea.
- Titles are specific, not generic: "Astro server islands bypass the CDN cache", not "A note about Astro".
- Reply with data only, no commentary.`;

/**
 * Transcribe a WhatsApp voice note. WhatsApp delivers OGG/Opus, which the
 * transcription model accepts directly, so the audio is passed through as bytes
 * without any conversion step.
 */
export async function transcribeVoiceNote(audio: Uint8Array) {
  const { text, language, durationInSeconds } = await transcribe({
    model: gateway.transcriptionModel(KNOWLEDGE_LOG_TRANSCRIPTION_MODEL),
    audio,
  });

  return { text: text.trim(), language, durationInSeconds };
}

/**
 * Turn a raw message or transcript into a structured entry. Also used for plain
 * text input, where the model mainly cleans up spelling and phrasing.
 */
export async function createKnowledgeEntryDraft(rawText: string) {
  const { output } = await generateText({
    model: KNOWLEDGE_LOG_MODEL,
    output: Output.object({
      schema: knowledgeEntryDraftSchema,
      name: "KnowledgeEntry",
      description:
        "A structured entry for the Knowledge Log, derived from a raw note.",
    }),
    instructions: INSTRUCTIONS,
    prompt: `Raw input:\n\n${rawText}`,
  });

  return { ...output, sourceUrl: normalizeSourceUrl(output.sourceUrl) };
}
