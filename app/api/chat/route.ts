import type { OpenAIStreamCallbacks } from "ai";
import { StreamingTextResponse } from "ai";
import { encoding_for_model } from "tiktoken";

import type { ChatMessage } from "llamaindex";
import { ALL_AVAILABLE_OPENAI_MODELS } from "llamaindex";
import { OpenAI } from "llamaindex";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createChatEngine } from "./engine";
import { LlamaIndexStream } from "./llamaindex-stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fallbackModel = "gpt-3.5-turbo";
const model = process.env.MODEL
  ? Object.keys(ALL_AVAILABLE_OPENAI_MODELS).includes(process.env.MODEL)
    ? (process.env.MODEL as keyof typeof ALL_AVAILABLE_OPENAI_MODELS)
    : fallbackModel
  : fallbackModel;

export let tokens = 0;

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const { messages, name } = json as {
      messages: ChatMessage[];
      name: string | undefined;
    };
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== "user") {
      return NextResponse.json(
        {
          error:
            "messages are required in the request body and the last message must be from the user",
        },
        { status: 400 },
      );
    }

    const llm = new OpenAI({
      model,
      maxTokens: 512,
    });

    const chatEngine = await createChatEngine(llm);

    const system = `You are chatting with ${name ?? "a user that landed on my personal website"}. Write as if you were me, Nikolai Lehbrink with the data you have on me. Any questions that are outside of the bounds of my personal data should be answered for example with "I don't know".`;

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessage.content,
      chatHistory: [{ content: system, role: "system" }, ...messages],
      stream: true,
    });

    const encoding = encoding_for_model(model);

    const streamCallbacks: OpenAIStreamCallbacks = {
      onToken: (content) => {
        // We call encode for every message as some people experienced
        // regression when tiktoken called with the full completion
        const tokenList = encoding.encode(content);
        tokens += tokenList.length;
      },
      onFinal: () => {
        encoding.free();
      },
    };

    // Transform LlamaIndex stream to Vercel/AI format
    const { stream } = LlamaIndexStream(response, {
      callbacks: streamCallbacks,
    });

    // Return a StreamingTextResponse, which can be consumed by the Vercel/AI client
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
