import { StreamingTextResponse } from "ai";
import type { ChatMessage } from "llamaindex";
import { OpenAI } from "llamaindex";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createChatEngine } from "./engine";
import { LlamaIndexStream } from "./llamaindex-stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      model: (process.env.MODEL as any) ?? "gpt-3.5-turbo",
      maxTokens: 512,
    });

    const chatEngine = await createChatEngine(llm);

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessage.content,
      chatHistory: messages,
      stream: true,
    });

    // Transform LlamaIndex stream to Vercel/AI format
    const { stream } = LlamaIndexStream(response);

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
