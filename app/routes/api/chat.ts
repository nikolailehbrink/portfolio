import { openai } from "@ai-sdk/openai";
import { llamaindex } from "@llamaindex/vercel";
import { track } from "@vercel/analytics/server";
import { smoothStream, streamText } from "ai";
import { LlamaCloudIndex } from "llamaindex";

import { typedMessageCountCookie } from "@/lib/cookies.server";

import type { Route } from "./+types/chat";

import { MESSAGE_LIMIT } from "../chat";

export const maxDuration = 30;

export async function action({ request }: Route.ActionArgs) {
  await track("submit-ai-message");

  const cookieHeader = request.headers.get("Cookie");

  const storedTokenCount = await typedMessageCountCookie.parse(cookieHeader);

  if (storedTokenCount !== null && storedTokenCount >= MESSAGE_LIMIT) {
    return new Response("Message limit reached", { status: 403 });
  }

  const { messages } = await request.json();
  try {
    const index = new LlamaCloudIndex({
      apiKey: process.env.LLAMA_CLOUD_API_KEY,
      name: "ai-chat",
      organizationId: "fab19a52-2da6-43e7-b2cb-6ea2e721faa7",
      projectName: "website",
    });

    const result = streamText({
      experimental_transform: smoothStream(),
      maxSteps: 5,
      messages,
      model: openai("gpt-4o-mini"),
      onError: (error) => {
        console.error("Error:", error);
      },
      system: `You are chatting with a user that landed on Nikolai Lehbrink's personal website. Write as if you were Nikolai, using the data available.
              If there's no answer to a question, clarify that without making up a conclusion.
              Use simple, easily understandable language and keep answers short. Do not use Markdown or code blocks, just answer with plain text.
              If a user's question isn't related to Nikolai, explain that the chat is focused on him and can't answer unrelated questions, this is important!
              Inappropriate questions will not be answered, with a clear statement that such questions won't be addressed.`,
      tools: {
        queryTool: llamaindex({
          description: `Get information from your knowledge base to answer questions abut Nikolai. 
                        Everytime somebody refers to the chat, act like Nikolai was asked and try to retrieve correct information. 
                        Answer as if you were Nikolai in the self perspective.`,
          index,
          model: openai("gpt-4o-mini"),
        }),
      },
    });

    return result.toDataStreamResponse({
      headers: {
        "Set-Cookie": await typedMessageCountCookie.serialize(
          storedTokenCount !== null ? storedTokenCount + 1 : 1,
        ),
      },
    });
  } catch (error) {
    console.error(error);
  }
}
