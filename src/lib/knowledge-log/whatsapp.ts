import { createHmac, timingSafeEqual } from "node:crypto";

import {
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_ALLOWED_NUMBER,
  WHATSAPP_APP_SECRET,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_VERIFY_TOKEN,
} from "astro:env/server";
import { z } from "astro/zod";

const GRAPH_API_VERSION = "v23.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// A voice note long enough to exceed this is almost certainly not a quick note -
// and transcription is billed per minute, so cap the download.
const MAX_AUDIO_BYTES = 16 * 1024 * 1024;

/**
 * Read the WhatsApp configuration once per request. Returns `null` when the
 * integration is not configured so the webhook can answer 503 instead of
 * throwing at import time (which would break every build without the secrets).
 */
export function getWhatsappConfig() {
  if (
    !WHATSAPP_VERIFY_TOKEN ||
    !WHATSAPP_APP_SECRET ||
    !WHATSAPP_ACCESS_TOKEN ||
    !WHATSAPP_PHONE_NUMBER_ID ||
    !WHATSAPP_ALLOWED_NUMBER
  ) {
    return null;
  }

  return {
    verifyToken: WHATSAPP_VERIFY_TOKEN,
    appSecret: WHATSAPP_APP_SECRET,
    accessToken: WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: WHATSAPP_PHONE_NUMBER_ID,
    allowedNumber: WHATSAPP_ALLOWED_NUMBER.replace(/\D/g, ""),
  };
}

export type WhatsappConfig = NonNullable<ReturnType<typeof getWhatsappConfig>>;

/**
 * Verify Meta's `X-Hub-Signature-256` header against the raw request body. This
 * is what proves a request actually came from WhatsApp - the sender number in
 * the payload is attacker-controlled without it.
 */
export function isValidSignature(
  rawBody: string,
  header: string | null,
  appSecret: string,
) {
  if (!header?.startsWith("sha256=")) {
    return false;
  }

  const expected = createHmac("sha256", appSecret).update(rawBody).digest();
  const received = Buffer.from(header.slice("sha256=".length), "hex");

  // timingSafeEqual throws on length mismatch, so guard before comparing.
  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

// Only the fields we act on are modelled; the loose objects keep unknown message
// types (reactions, statuses, images) from failing validation - they are filtered
// out later instead.
const messageSchema = z.looseObject({
  id: z.string(),
  from: z.string(),
  timestamp: z.string().optional(),
  type: z.string(),
  text: z.object({ body: z.string() }).optional(),
  audio: z.object({ id: z.string(), voice: z.boolean().optional() }).optional(),
});

export const webhookPayloadSchema = z.object({
  object: z.string(),
  entry: z
    .array(
      z.object({
        changes: z
          .array(
            z.object({
              field: z.string().optional(),
              value: z.looseObject({
                messages: z.array(messageSchema).optional(),
              }),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

export type WhatsappMessage = z.infer<typeof messageSchema>;

/** Flatten the nested webhook envelope into the messages it carries. */
export function extractMessages(
  payload: z.infer<typeof webhookPayloadSchema>,
): Array<WhatsappMessage> {
  return (payload.entry ?? []).flatMap((entry) =>
    (entry.changes ?? []).flatMap((change) => change.value.messages ?? []),
  );
}

/**
 * Download a media file. Two hops by design: the media id resolves to a
 * short-lived, authenticated URL, which then has to be fetched with the same
 * bearer token.
 */
export async function downloadMedia(mediaId: string, config: WhatsappConfig) {
  const headers = { Authorization: `Bearer ${config.accessToken}` };

  const metaResponse = await fetch(`${GRAPH_API_BASE}/${mediaId}`, { headers });
  if (!metaResponse.ok) {
    throw new Error(
      `Failed to resolve media ${mediaId}: ${metaResponse.status}`,
    );
  }

  const { url, file_size: fileSize } = (await metaResponse.json()) as {
    url: string;
    file_size?: number;
  };

  if (fileSize && fileSize > MAX_AUDIO_BYTES) {
    throw new Error(`Media ${mediaId} is too large (${fileSize} bytes)`);
  }

  const fileResponse = await fetch(url, { headers });
  if (!fileResponse.ok) {
    throw new Error(
      `Failed to download media ${mediaId}: ${fileResponse.status}`,
    );
  }

  const buffer = await fileResponse.arrayBuffer();
  if (buffer.byteLength > MAX_AUDIO_BYTES) {
    throw new Error(
      `Media ${mediaId} is too large (${buffer.byteLength} bytes)`,
    );
  }

  return new Uint8Array(buffer);
}

/**
 * Send a confirmation back into the chat. Failures are logged and swallowed: the
 * entry is already saved at that point, and a non-2xx webhook response would
 * make WhatsApp redeliver the message.
 */
export async function sendTextMessage(
  to: string,
  body: string,
  config: WhatsappConfig,
) {
  try {
    const response = await fetch(
      `${GRAPH_API_BASE}/${config.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body, preview_url: false },
        }),
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to send WhatsApp reply: ${response.status} ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("Failed to send WhatsApp reply:", error);
  }
}
