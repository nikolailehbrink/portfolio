import { cn } from "@/lib/utils";
import type { ChatPayload } from "@/types/sanity";
import type { Message } from "ai";
import type { ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import ChatAvatar from "./ChatAvatar";

export default forwardRef(function ChatMessage(
  {
    children,
    content,
    role,
    logo,
    name,
  }: Pick<Message, "content" | "role"> &
    Partial<Pick<ChatPayload, "logo" | "name">> & { children?: ReactNode },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const isAssistant = role === "assistant";
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start gap-2 text-pretty sm:gap-4",
        role === "user" && "flex-row-reverse",
      )}
    >
      <ChatAvatar role={role} logo={logo} name={name} />
      <div
        className={cn(
          "max-w-prose rounded-lg px-4 py-2",
          isAssistant
            ? "bg-neutral-950 sm:bg-neutral-900 lg:mr-32"
            : "bg-sky-500 lg:ml-32",
        )}
      >
        <p className={cn(isAssistant && "text-muted-foreground")}>{content}</p>
        {children}
      </div>
    </div>
  );
});
