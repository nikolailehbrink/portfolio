import { createGateway } from "@ai-sdk/gateway";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  smoothStream,
  streamText,
  type UIMessage,
} from "ai";
import { track } from "@vercel/analytics/server";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import {
  AI_CHAT_MESSAGE_LIMIT,
  MAX_CHAT_INPUT_CHARS,
  MAX_CHAT_MESSAGES,
  SECONDS_TO_CHAT_AGAIN,
} from "@/consts";

// Validate the shape and size of the incoming body before doing any (billed)
// LLM work. The endpoint is public, so this is the first line of abuse defense.
const chatRequestSchema = z.object({
  messages: z.array(z.unknown()).min(1).max(MAX_CHAT_MESSAGES),
});

export const maxDuration = 30;
export const prerender = false;

const gateway = createGateway({
  apiKey: import.meta.env.AI_GATEWAY_API_KEY,
});

const knowledgeBase = import.meta.env.CHAT_KNOWLEDGE_BASE;

export type DataParts = {
  "message-limit-reached": {
    message: string;
    timestampToChatAgain: number;
  };
};

export type MyUIMessage = UIMessage<never, DataParts>;

export const POST: APIRoute = async ({ request, cookies }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Invalid request body", { status: 400 });
  }

  // Cap the raw payload size to limit token cost / abuse on this public endpoint.
  if (JSON.stringify(parsed.data.messages).length > MAX_CHAT_INPUT_CHARS) {
    return new Response("Message payload too large", { status: 413 });
  }

  const messages = parsed.data.messages as Array<MyUIMessage>;
  const messageCount = cookies.get("message_count")?.number();
  await track("submit-ai-message");

  if (messageCount !== undefined && messageCount >= AI_CHAT_MESSAGE_LIMIT) {
    return new Response("Message limit reached", { status: 403 });
  }

  try {
    const newMessageCount = messageCount ? messageCount + 1 : 1;
    const messageLimitReached = newMessageCount >= AI_CHAT_MESSAGE_LIMIT;

    const cookieOptions = {
      maxAge: SECONDS_TO_CHAT_AGAIN,
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax" as const,
      path: "/",
    };

    cookies.set("message_count", String(newMessageCount), cookieOptions);

    const resetAt = Date.now() + SECONDS_TO_CHAT_AGAIN * 1000;
    if (messageLimitReached) {
      cookies.set("message_reset_at", String(resetAt), cookieOptions);
    }

    const stream = createUIMessageStream<MyUIMessage>({
      async execute({ writer }) {
        const result = streamText({
          onError: (error) => {
            console.error("Error:", error);
          },
          experimental_transform: smoothStream(),
          model: gateway("openai/gpt-5.4-mini"),
          system: `You are an AI assistant for the personal website of **Nikolai Lehbrink**.
You represent Nikolai and answer based on the knowledge base provided below.

### Core Instructions
1. **Write in the first person**, as if you are Nikolai.
2. **Write only text responses**; do **NOT** include markdown in your replies.
3. **Tone:** friendly, professional, and authentic — natural for a personal website.
4. When unsure:
   - If the knowledge base has no or incomplete data → say, “I’m not sure about that.”
   - **Never** make up information.
   - If asked something inappropriate or private → respond with “I can’t answer that.”
5. Before responding, **double-check**:
   - Does this reflect what Nikolai would realistically say or know?
   - Is it phrased in Nikolai’s tone?
6. For multi-turn chats, **maintain continuity** and consistent personality.
7. When appropriate, **summarize** long details clearly and concisely.

### Examples
**User:** What’s your background?
**Assistant (as Nikolai):** I’m a full-stack developer based in Munich, currently working at Off-Campers, where I focus on React, TypeScript, and Remix.

**User:** What’s your favorite food?
**Assistant (as Nikolai):** That’s not something I’ve shared publicly, so I’d rather not answer that.

---

**Remember:** Be accurate, polite, and stay true to Nikolai’s real background and voice.

### Knowledge Base
${knowledgeBase}
`,
          messages: await convertToModelMessages(messages),
          onFinish() {
            if (messageLimitReached) {
              writer.write({
                type: "data-message-limit-reached",
                data: {
                  message: "Message limit reached",
                  timestampToChatAgain: resetAt,
                },
                transient: true, // Won't be added to message history
              });
            }
          },
        });
        writer.merge(result.toUIMessageStream());
      },
    });
    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
