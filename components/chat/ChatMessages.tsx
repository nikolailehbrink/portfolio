import type { UseChatHelpers } from "ai/react";
import Refresh from "@/assets/icons/unicons/refresh.svg";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { Button } from "../ui/button";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import Robot from "@/assets/icons/unicons/robot.svg";

import Link from "next/link";
import CustomChatMessage from "./CustomChatMessage";
import { getDateDifferenceInHours } from "@/lib/utils";

export default function ChatMessages({
  messages,
  setMessages,
  isPending,
  setChatTokenCount,
  isChatTokenLimitReached,
  isPersistentTokenLimitReached,
  isTokenLimitReached,
  timeToChatAgain,
}: Pick<UseChatHelpers, "messages" | "setMessages"> & {
  setChatTokenCount: Dispatch<SetStateAction<number>>;
  isPending: boolean;
  isChatTokenLimitReached: boolean;
  isPersistentTokenLimitReached: boolean;
  isTokenLimitReached: boolean;
  timeToChatAgain: Date;
}) {
  const hoursToChatAgain = getDateDifferenceInHours(timeToChatAgain);

  const scrollableContainerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      className="flex-1 space-y-4 overflow-auto pr-4 scrollbar-thin "
      ref={scrollableContainerRef}
    >
      {(messages.length !== 0 || !isTokenLimitReached) && (
        <CustomChatMessage text="Hi! This is the digital Nikolai with a little note: Sometimes I can produce incorrect output so if something doesn't add up, I can only advise to contact the „real me“. Now that that is out of the way: Feel free to ask me any questions!" />
      )}
      {messages.map((m) => (
        <ChatMessage key={m.id} {...m} />
      ))}
      {isPending && !isTokenLimitReached && (
        <div className="mt-4 flex items-center justify-center">
          <Refresh className="size-7 animate-spin direction-reverse" />
        </div>
      )}
      {isChatTokenLimitReached && !isPersistentTokenLimitReached && (
        <div className="flex flex-col gap-4">
          <CustomChatMessage text="Thanks for chatting! The limit for this chat has been reached. To continue, please start a new chat. Feel free to also visit my blog or contact me directly if you have any questions!">
            <div className="flex flex-wrap gap-2">
              {/* Has to be mt-2 here, because of gsap animation and animating from display none */}
              <Button
                className="mt-2"
                onClick={() => {
                  setChatTokenCount(0);
                  setMessages([]);
                }}
              >
                <Robot className="w-6" />
                New chat
              </Button>
              <Button className="mt-2" asChild variant={"secondary"}>
                <Link href="/#contact">
                  <CommentCheck className="w-6" />
                  Contact
                </Link>
              </Button>
              <Button className="mt-2" asChild variant={"outline"}>
                <Link href="/blog">
                  <Newspaper className="w-6" />
                  Blog
                </Link>
              </Button>
            </div>
          </CustomChatMessage>
        </div>
      )}
      {isPersistentTokenLimitReached && (
        <div className="flex flex-col gap-3">
          <CustomChatMessage text="Looks like we had some good conversations, but now it's time for the real me to take over. Why not drop a message?">
            <Button className="mt-2" asChild variant={"secondary"}>
              <Link href="/#contact">
                <CommentCheck className="w-6" />
                Contact
              </Link>
            </Button>
          </CustomChatMessage>
          <p className="self-center text-sm">
            Or come back in{" "}
            {hoursToChatAgain +
              " " +
              `${hoursToChatAgain === 1 ? "hour" : "hours"}`}{" "}
            on{" "}
            {Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(timeToChatAgain)}
          </p>
        </div>
      )}
    </div>
  );
}
