import type { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

export default forwardRef(function ChatMessage(
  { content, role }: Pick<Message, "content" | "role">,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start gap-2 text-pretty sm:gap-4",
        role === "user" && "flex-row-reverse",
      )}
    >
      <ChatAvatar role={role} />
      <p
        className={cn(
          "max-w-prose rounded-lg px-4 py-2",
          role === "assistant"
            ? "bg-neutral-950 sm:bg-neutral-900 lg:mr-32"
            : "bg-blue lg:ml-32",
        )}
      >
        {content}
      </p>
    </div>
  );
});
