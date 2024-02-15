import { StreamingTextResponse } from "ai";
import { encoding_for_model } from "tiktoken";

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
    const encoding = encoding_for_model("gpt-3.5-turbo");
    const json = await request.json();

    const { messages, name } = json as {
      messages: ChatMessage[];
      name: string | undefined;
    };
    const tokens = encoding.encode(messages.map((m) => m.content).join(" "));
    if (tokens.length > 512) {
      return NextResponse.json("Token limit reached", { status: 400 });
    }
    console.log(tokens.length);
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
      // model: process.env.MODEL ?? "gpt-3.5-turbo",
      model: "gpt-3.5-turbo",
      maxTokens: 512,
    });

    const chatEngine = await createChatEngine(llm);

    const system = `You are chatting with ${name ?? "a user that landed on my personal website"}. Write as if you were me, Nikolai Lehbrink with the data you have on me. Any questions that are outside of the bounds of my personal data should be answered for example with "I don't know".`;

    console.log(system);

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessage.content,
      chatHistory: [{ content: system, role: "system" }, ...messages],
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
