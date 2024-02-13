import type { UseChatHelpers } from "ai/react";
import SpinnerAlt from "@/assets/icons/unicons/spinner-alt.svg";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessages({
  messages,
  isLoading,
}: Pick<UseChatHelpers, "messages" | "isLoading" | "reload" | "stop">) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, lastMessage]);

  return (
    <div className="my-8 flex-1 overflow-auto rounded-xl bg-neutral-950 scrollbar-thin">
      <div className="space-y-4 p-8" ref={scrollableChatContainerRef}>
        <ChatMessage
          content="Hi, ich bin Nikolai und stehe dir gerne zur Verfügung. Wie kann ich dir helfen?"
          role="assistant"
          id="12344"
        />
        {messages.map((m) => (
          <ChatMessage key={m.id} {...m} />
        ))}
        {isPending && (
          <div className="flex items-center justify-center pt-10">
            <SpinnerAlt className="size-7 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
