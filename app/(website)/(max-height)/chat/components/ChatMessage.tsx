import type { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import { cn } from "@/lib/utils";
import type { ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import type { SanityChat } from "@/types/sanity/sanityChat";

export default forwardRef(function ChatMessage(
  {
    children,
    content,
    role,
    logo,
    name,
  }: Pick<Message, "content" | "role"> &
    Partial<Pick<SanityChat, "logo" | "name">> & { children?: ReactNode },
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
      <ChatAvatar role={role} logo={logo} name={name} />
      <div
        className={cn(
          "max-w-prose rounded-lg px-4 py-2",
          role === "assistant"
            ? "bg-neutral-950 sm:bg-neutral-900 lg:mr-32"
            : "bg-blue lg:ml-32",
        )}
      >
        <p>{content}</p>
        {children}
      </div>
    </div>
  );
});
