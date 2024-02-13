import type { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import { cn } from "@/lib/utils";

export default function ChatMessage(chatMessage: Message) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 text-pretty sm:gap-4",
        chatMessage.role === "user" && "flex-row-reverse",
      )}
    >
      <ChatAvatar role={chatMessage.role} />
      <p
        className={cn(
          "max-w-prose rounded-xl px-4 py-2",
          chatMessage.role === "assistant"
            ? "bg-neutral-950 sm:bg-neutral-900 lg:mr-32"
            : "bg-blue lg:ml-32",
        )}
      >
        {chatMessage.content}
      </p>
    </div>
  );
}
