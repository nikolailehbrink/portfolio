import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import Robot from "@/assets/icons/unicons/robot.svg";
import { Button } from "@/components/ui/button";
import { getDateDifferenceInHours } from "@/lib/helpers";
import type { ChatPayload } from "@/types/sanity";
import type { UseChatHelpers } from "ai/react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import CustomChatMessage from "./CustomChatMessage";

export default function ChatMessages({
  messages,
  setMessages,
  isPending,
  setChatTokenCount,
  isChatTokenLimitReached,
  isPersistentTokenLimitReached,
  isTokenLimitReached,
  dateToChatAgain,
  logo,
  name,
}: Pick<UseChatHelpers, "messages" | "setMessages"> &
  Partial<Pick<ChatPayload, "logo" | "name">> & {
    setChatTokenCount: Dispatch<SetStateAction<number>>;
    isPending: boolean;
    isChatTokenLimitReached: boolean;
    isPersistentTokenLimitReached: boolean;
    isTokenLimitReached: boolean;
    dateToChatAgain: Date;
  }) {
  const hoursToChatAgain = getDateDifferenceInHours(dateToChatAgain);

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
      className="flex-1 space-y-4 overflow-auto pr-4 scrollbar-thin"
      ref={scrollableContainerRef}
    >
      {(messages.length !== 0 || !isTokenLimitReached) && (
        <CustomChatMessage text="Hi! This is the digital Nikolai with a little note: Sometimes I can produce incorrect output so if something doesn't add up, I can only advise to contact the „real me“. Now that that is out of the way: Feel free to ask me any questions!" />
      )}
      {messages.map((m) => (
        <ChatMessage key={m.id} {...m} name={name} logo={logo} />
      ))}
      {isPending && !isTokenLimitReached && (
        <ChatMessage role="assistant" content="">
          <div className="flex h-6 items-center gap-[3px]">
            <span className="sr-only">Loading...</span>
            <div
              className="size-[6px] animate-pulse rounded-full bg-neutral-300
                delay-300 [animation-delay:-0.3s]"
            ></div>
            <div
              className="size-[6px] animate-pulse rounded-full bg-neutral-300
                [animation-delay:-0.15s]"
            ></div>
            <div className="size-[6px] animate-pulse rounded-full bg-neutral-300"></div>
          </div>
        </ChatMessage>
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
            }).format(dateToChatAgain)}
          </p>
        </div>
      )}
    </div>
  );
}
