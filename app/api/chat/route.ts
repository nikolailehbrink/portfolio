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
import type { SanityChat } from "@/types/sanity/sanityChat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fallbackModel = "gpt-3.5-turbo";
const model = process.env.OPENAI_MODEL
  ? Object.keys(ALL_AVAILABLE_OPENAI_MODELS).includes(process.env.OPENAI_MODEL)
    ? (process.env.OPENAI_MODEL as keyof typeof ALL_AVAILABLE_OPENAI_MODELS)
    : fallbackModel
  : fallbackModel;

let tokens = 0;

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const { messages, name, type, additionalInformation } = json as {
      messages: ChatMessage[];
    } & Partial<Pick<SanityChat, "name" | "type" | "additionalInformation">>;
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

    if (messages.length === 0) {
      tokens = 0;
    }

    const llm = new OpenAI({
      model,
      temperature: 0,
      maxTokens: 1024,
    });

    const chatEngine = await createChatEngine(llm);

    const system = `You are chatting with ${name ? name + ". Refer to the name in the conversation if it is appropriate." : "a user that landed on my personal website"}. ${type === "company" ? `${name} is a company that I want to work for.` : `${name} is a single person, that I want to chat with.`} Write as if you were me, Nikolai Lehbrink with the data you have on me. If there is no answer to a question, don't come up with a conclusion yourself but make it clear, that you don't have an answer to that question. You should not use highly intellectual language, but rather a language that is easy to understand for everyone. Try to answer the questions in a short way. If the user asks for something that is not related to me, make it clear that you can't answer the question and refer to the chat being about me. If the question is inappropriate, don't answer it and make it clear that you won't answer it. ${additionalInformation ? additionalInformation : ""}`;

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

export async function GET() {
  return NextResponse.json(tokens);
}
