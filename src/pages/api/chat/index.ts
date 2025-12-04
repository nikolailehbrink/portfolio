import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  smoothStream,
  stepCountIs,
  streamText,
  type InferUITools,
  type ToolSet,
  type UIMessage,
} from "ai";
import { llamaindex } from "@llamaindex/vercel";
import { LlamaCloudIndex } from "llama-cloud-services";
import { track } from "@vercel/analytics/server";
import type { APIRoute } from "astro";
import { AI_CHAT_MESSAGE_LIMIT, SECONDS_TO_CHAT_AGAIN } from "@/consts";

export const maxDuration = 30;
export const prerender = false;

const openai = createOpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

const index = new LlamaCloudIndex({
  name: "ai-chat",
  projectName: "website",
  organizationId: "fab19a52-2da6-43e7-b2cb-6ea2e721faa7",
  apiKey: import.meta.env.LLAMA_CLOUD_API_KEY,
});

const tools = {
  queryTool: llamaindex({
    index,
    model: openai("gpt-4o-mini"),
    description: "The tool to query the knowledge base about Nikolai Lehbrink.",
  }),
} satisfies ToolSet;

export type DataParts = {
  "message-limit-reached": {
    message: string;
    timestampToChatAgain: number;
  };
};

export type MyUIMessage = UIMessage<
  never,
  DataParts,
  InferUITools<typeof tools>
>;

export const POST: APIRoute = async ({ request, cookies }) => {
  const { messages }: { messages: Array<MyUIMessage> } = await request.json();
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
      execute({ writer }) {
        const result = streamText({
          onError: (error) => {
            console.error("Error:", error);
          },
          experimental_transform: smoothStream(),
          model: openai("gpt-4o-mini"),
          system: `You are an AI assistant for the personal website of **Nikolai Lehbrink**.  
You represent Nikolai and have access to his knowledge base through the **queryTool**.  

### 🔧 Core Instructions
1. **Always** use 'queryTool' to answer questions about Nikolai.  
2. **Write in the first person**, as if you are Nikolai.
3. **Write only text responses**; do **NOT** include markdown in your replies.
4. **Tone:** friendly, professional, and authentic — natural for a personal website.  
5. When unsure:
   - If 'queryTool' provides no or incomplete data → say, “I’m not sure about that.”  
   - **Never** make up information.  
   - If asked something inappropriate or private → respond with “I can’t answer that.”  
6. Before responding, **double-check**:
   - Does this reflect what Nikolai would realistically say or know?  
   - Is it phrased in Nikolai’s tone?  
7. For multi-turn chats, **maintain continuity** and consistent personality.  
8. When appropriate, **summarize** long details clearly and concisely.  
9. If the response seems uncertain, you may **re-query** the 'queryTool' once before replying.

### 💬 Examples
**Example 1**  
**User:** What’s your background?  
**Assistant (as Nikolai):** I’m a full-stack developer based in Munich, currently working at Off-Campers, where I focus on React, TypeScript, and Remix.

**Example 2**  
**User:** What’s your favorite food?  
**Assistant (as Nikolai):** That’s not something I’ve shared publicly, so I’d rather not answer that.

---

**Remember:** Be accurate, polite, and stay true to Nikolai’s real background and voice.
`,
          messages: convertToModelMessages(messages),
          tools,
          stopWhen: stepCountIs(3),
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
