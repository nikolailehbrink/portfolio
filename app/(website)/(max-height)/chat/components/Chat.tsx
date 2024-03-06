"use client";

import ChatInput from "./ChatInput";
import { useChat } from "ai/react";
import ChatMessages from "./ChatMessages";
import { toast } from "sonner";
import ChatExamples from "./ChatExamples";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { chatToken } from "@/lib/atoms";
import { isDev } from "@/lib/utils";
import type { SanityChat } from "@/types/sanity/sanityChat";

const CHAT_TOKEN_LIMIT = isDev ? 512 : 1024;
const PERSISTENT_TOKEN_LIMIT = isDev ? 2048 : 4096;
const TIME_TO_WAIT = 1000 * 60 * 60 * 24 * 3;

export default function Chat({
  customChat,
}: {
  customChat: SanityChat | null;
}) {
  const [persistentToken, setPersistentToken] = useAtom(chatToken);

  const [chatTokenCount, setChatTokenCount] = useState(0);

  const isChatTokenLimitReached = chatTokenCount > CHAT_TOKEN_LIMIT;
  const isPersistentTokenLimitReached =
    persistentToken.count > PERSISTENT_TOKEN_LIMIT;

  const isTokenLimitReached =
    isChatTokenLimitReached || isPersistentTokenLimitReached;

  const dateToChatAgain = new Date(persistentToken.date + TIME_TO_WAIT);

  const {
    messages,
    setMessages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    setInput,
  } = useChat({
    onError: (e) => {
      console.log(e);
      toast.error("An error occurred");
    },
    onFinish: async () => {
      try {
        const response = await fetch("/api/chat");
        const token = (await response.json()) as number;
        setPersistentToken({
          count: persistentToken.count + token,
          date: Date.now(),
        });
        setChatTokenCount(token);
      } catch (e) {
        console.log(e);
        toast.error("An error occurred");
      }
    },
    body: {
      name: customChat?.name,
      type: customChat?.type,
      additionalInformation: customChat?.additionalInformation,
    },
  });

  useEffect(() => {
    if (
      isPersistentTokenLimitReached &&
      persistentToken.date < Date.now() - TIME_TO_WAIT
    ) {
      setPersistentToken({ count: 0, date: Date.now() });
    }
  }, [isPersistentTokenLimitReached, persistentToken.date, setPersistentToken]);

  const lastMessage = messages[messages.length - 1];

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;
  const isGenerating = isLoading && !isPending;

  const showReload = !isLoading && isLastMessageFromAssistant;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col overflow-hidden sm:rounded-xl sm:bg-neutral-950 sm:p-4 sm:pr-0">
      <ChatMessages
        logo={customChat?.logo}
        messages={messages}
        isPending={isPending}
        isPersistentTokenLimitReached={isPersistentTokenLimitReached}
        isChatTokenLimitReached={isChatTokenLimitReached}
        isTokenLimitReached={isTokenLimitReached}
        setMessages={setMessages}
        setChatTokenCount={setChatTokenCount}
        dateToChatAgain={dateToChatAgain}
      />
      {messages.length < 3 && !isTokenLimitReached && (
        <ChatExamples setInput={setInput} examples={customChat?.examples} />
      )}
      {!isTokenLimitReached && (
        <ChatInput
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
          stop={stop}
          showReload={showReload}
          reload={reload}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}
