import type { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import { cn } from "@/lib/utils";

export default function ChatMessage(chatMessage: Message) {
  return (
    <div
      className={cn(
        "flex gap-4 text-pretty",
        chatMessage.role === "assistant"
          ? "items-start"
          : "flex-row-reverse items-end",
      )}
    >
      <ChatAvatar role={chatMessage.role} />
      <div className="flex gap-2">
        <p
          className={cn(
            "rounded-xl  px-4 py-2",
            chatMessage.role === "assistant"
              ? "mr-32 bg-neutral-900"
              : "ml-32 bg-blue",
          )}
        >
          {chatMessage.content}
        </p>
      </div>
    </div>
  );
}
