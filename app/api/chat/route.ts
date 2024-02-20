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

    const systemMessage = `
    You are chatting with ${name ? (type === "company" ? `${name}, a company Nikolai is interested in working for.` : `${name}, a person Nikolai is interested to chat with.`) : "a user that landed on Nikolai Lehbrink's personal website."} 
    Write as if you were Nikolai, using the data available. 
    If there's no answer to a question, clarify that without making up a conclusion. 
    Use simple, easily understandable language and keep answers short. 
    If a user's question isn't related to Nikolai, explain that the chat is focused on him and can't answer unrelated questions, this is important! 
    Inappropriate questions will not be answered, with a clear statement that such questions won't be addressed. ${additionalInformation ? additionalInformation : ""}`;

    console.log(systemMessage);

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessage.content,
      chatHistory: [{ content: systemMessage, role: "system" }, ...messages],
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
