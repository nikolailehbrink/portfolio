import type { UseChatHelpers } from "ai/react";
import Refresh from "@/assets/icons/unicons/refresh.svg";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ChatMessages({
  messages,
  isPending,
}: Pick<UseChatHelpers, "messages"> & {
  isPending: boolean;
}) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const initialMessageRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];

  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  };

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
    { scope: initialMessageRef },
  );

  return (
    <div
      className="flex-1 space-y-4 overflow-auto pr-4 scrollbar-thin "
      ref={scrollableContainerRef}
    >
      <ChatMessage ref={initialMessageRef} content="Hi!" role="assistant" />
      {messages.map((m) => (
        <ChatMessage key={m.id} {...m} />
      ))}
      {isPending && (
        <div className="mt-4 flex items-center justify-center">
          <Refresh className="size-7 animate-spin direction-reverse" />
        </div>
      )}
    </div>
  );
}
