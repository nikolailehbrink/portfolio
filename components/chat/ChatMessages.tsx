import type { UseChatHelpers } from "ai/react";
import SpinnerAlt from "@/assets/icons/unicons/spinner-alt.svg";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { gsap, useGSAP } from "@/lib/gsap";

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

  const messageRef = useRef<HTMLDivElement>(null);

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, lastMessage]);

  useGSAP(
    () => {
      gsap.to("p", {
        text: "Hi! This is Nikolai in a digital form. I wanted to do a kind of different about me section and I thought it would be cool if you can ask anything you want to know about me. So, go ahead and ask me anything! This AI will respond with data from me which it is trained on!",
        duration: 8,
      });
    },
    { scope: messageRef },
  );

  return (
    <div className="mx-auto my-8 w-full max-w-screen-lg flex-1 overflow-auto rounded-xl scrollbar-thin sm:bg-neutral-950">
      <div className="space-y-4 sm:p-8" ref={scrollableChatContainerRef}>
        <div ref={messageRef}>
          <ChatMessage content="Hi!" role="assistant" id="12344" />
        </div>
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
