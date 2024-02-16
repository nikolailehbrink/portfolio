import type { UseChatHelpers } from "ai/react";
import Refresh from "@/assets/icons/unicons/refresh.svg";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "../ui/button";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Link from "next/link";

export default function ChatMessages({
  messages,
  isPending,
  tokenLimitReached,
}: Pick<UseChatHelpers, "messages"> & {
  isPending: boolean;
  tokenLimitReached: boolean;
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
      {(messages.length !== 0 || !tokenLimitReached) && (
        <ChatMessage ref={initialMessageRef} content="Hi!" role="assistant" />
      )}
      {messages.map((m) => (
        <ChatMessage key={m.id} {...m} />
      ))}
      {isPending && !tokenLimitReached && (
        <div className="mt-4 flex items-center justify-center">
          <Refresh className="size-7 animate-spin direction-reverse" />
        </div>
      )}
      {tokenLimitReached && (
        <div className="flex flex-col gap-4">
          <ChatMessage
            role="assistant"
            content={`Thank you for chatting with me. I think it is the right time to contact the "real me" or you can try again tomorrow!`}
          />
          <Button asChild className="self-center">
            <Link href="/#contact">
              <CommentCheck className="w-6" />
              Contact me
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
