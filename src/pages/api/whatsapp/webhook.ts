import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { knowledgeEntry, type KnowledgeEntryMetadata } from "@/db/schema";
import {
  createKnowledgeEntryDraft,
  transcribeVoiceNote,
} from "@/lib/knowledge-log/ai";
import { MAX_KNOWLEDGE_INPUT_CHARS } from "@/lib/knowledge-log/definitions";
import { invalidateKnowledgeEntriesCache } from "@/lib/knowledge-log/queries";
import {
  downloadMedia,
  extractMessages,
  getWhatsappConfig,
  isValidSignature,
  sendTextMessage,
  webhookPayloadSchema,
  type WhatsappConfig,
  type WhatsappMessage,
} from "@/lib/knowledge-log/whatsapp";

// Transcription plus a structured generation call; well under the limit, but the
// default would be tight for a two minute voice note.
export const maxDuration = 60;
export const prerender = false;

/**
 * Meta's webhook handshake: called once when the callback URL is registered, and
 * again whenever the subscription is re-verified.
 */
export const GET: APIRoute = ({ url }) => {
  const config = getWhatsappConfig();
  if (!config) {
    return new Response("Not configured", { status: 503 });
  }

  const params = url.searchParams;
  if (
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === config.verifyToken
  ) {
    return new Response(params.get("hub.challenge") ?? "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
};

export const POST: APIRoute = async ({ request, site, url }) => {
  const config = getWhatsappConfig();
  if (!config) {
    return new Response("Not configured", { status: 503 });
  }

  // The signature covers the raw bytes, so the body must be read as text before
  // it is parsed.
  const rawBody = await request.text();
  if (
    !isValidSignature(
      rawBody,
      request.headers.get("x-hub-signature-256"),
      config.appSecret,
    )
  ) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const parsed = webhookPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response("Invalid payload", { status: 400 });
  }

  const messages = extractMessages(parsed.data);
  const knowledgeLogUrl = new URL("/knowledge-log/", site ?? url.origin).href;

  for (const message of messages) {
    // The entire authorization model: anything from another number is dropped
    // without being read, transcribed or sent to a model.
    if (message.from.replace(/\D/g, "") !== config.allowedNumber) {
      console.warn("Rejected Knowledge Log message from unauthorized sender.");
      continue;
    }

    try {
      await processMessage(message, config, knowledgeLogUrl);
    } catch (error) {
      console.error("Failed to process Knowledge Log message:", error);
      await sendTextMessage(
        message.from,
        "Couldn't save that one - something went wrong on my end. Try sending it again.",
        config,
      );
    }
  }

  // Always acknowledge a signed webhook. A non-2xx makes WhatsApp redeliver the
  // same message, which would re-run the (billed) AI pipeline.
  return new Response(null, { status: 200 });
};

async function processMessage(
  message: WhatsappMessage,
  config: WhatsappConfig,
  knowledgeLogUrl: string,
) {
  // WhatsApp redelivers until it gets a 2xx, so bail out before any AI work if
  // this message was already turned into an entry.
  const [existing] = await db
    .select({ id: knowledgeEntry.id })
    .from(knowledgeEntry)
    .where(eq(knowledgeEntry.sourceMessageId, message.id))
    .limit(1);

  if (existing) {
    return;
  }

  const input = await resolveInput(message, config);
  if (!input) {
    await sendTextMessage(
      message.from,
      "I can only turn text messages and voice notes into log entries.",
      config,
    );
    return;
  }

  if (!input.text) {
    await sendTextMessage(
      message.from,
      "That came through empty - nothing to log.",
      config,
    );
    return;
  }

  const draft = await createKnowledgeEntryDraft(
    input.text.slice(0, MAX_KNOWLEDGE_INPUT_CHARS),
  );

  const metadata: KnowledgeEntryMetadata = {
    source: "whatsapp",
    inputType: input.inputType,
    originalText: input.text,
    transcriptLanguage: input.language,
    audioDurationInSeconds: input.durationInSeconds,
  };

  const createdAt = message.timestamp
    ? new Date(Number(message.timestamp) * 1000)
    : new Date();

  const [entry] = await db
    .insert(knowledgeEntry)
    .values({
      ...draft,
      tags: draft.tags,
      createdAt,
      publishedAt: new Date(),
      metadata,
      sourceMessageId: message.id,
    })
    // A concurrent redelivery can slip past the check above; the unique index
    // makes the insert itself idempotent.
    .onConflictDoNothing({ target: knowledgeEntry.sourceMessageId })
    .returning();

  if (!entry) {
    return;
  }

  invalidateKnowledgeEntriesCache();

  await sendTextMessage(
    message.from,
    `Logged as ${entry.type}: "${entry.title}"${
      entry.tags.length ? `\nTags: ${entry.tags.join(", ")}` : ""
    }\n${knowledgeLogUrl}`,
    config,
  );
}

type ResolvedInput = {
  text: string;
  inputType: KnowledgeEntryMetadata["inputType"];
  language?: string;
  durationInSeconds?: number;
};

/** Normalize a supported message into plain text, transcribing audio if needed. */
async function resolveInput(
  message: WhatsappMessage,
  config: WhatsappConfig,
): Promise<ResolvedInput | null> {
  if (message.type === "text" && message.text) {
    return { text: message.text.body.trim(), inputType: "text" };
  }

  if (message.type === "audio" && message.audio) {
    const audio = await downloadMedia(message.audio.id, config);
    const { text, language, durationInSeconds } =
      await transcribeVoiceNote(audio);
    return { text, inputType: "audio", language, durationInSeconds };
  }

  return null;
}
