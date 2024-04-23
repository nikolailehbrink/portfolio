"use client";

import { persistentToken } from "@/lib/atoms";
import { isDev } from "@/lib/utils";
import type { ChatPayload } from "@/types/sanity";
import { useChat } from "ai/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatExamples from "./ChatExamples";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const CHAT_TOKEN_LIMIT = isDev ? 512 : 1024;
const PERSISTENT_TOKEN_LIMIT = isDev ? 2048 : 4096;
const TIME_TO_WAIT = 1000 * 60 * 60 * 24 * 3;

export default function Chat({
  customChat,
}: {
  customChat: ChatPayload | null;
}) {
  const [persistentTokenCount, setPersistentTokenCount] =
    useAtom(persistentToken);

  const [chatTokenCount, setChatTokenCount] = useState(0);

  const isChatTokenLimitReached = chatTokenCount > CHAT_TOKEN_LIMIT;
  const isPersistentTokenLimitReached =
    persistentTokenCount.count > PERSISTENT_TOKEN_LIMIT;

  const isTokenLimitReached =
    isChatTokenLimitReached || isPersistentTokenLimitReached;

  const dateToChatAgain = new Date(persistentTokenCount.date + TIME_TO_WAIT);

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

        if (token) {
          setPersistentTokenCount({
            count: persistentTokenCount.count + token,
            date: Date.now(),
          });
          setChatTokenCount((prev) => prev + token);
        }
      } catch (e) {
        console.log(e);
        toast.error("An error occurred");
      }
    },
    body: {
      name: customChat?.name,
      type: customChat?.type,
      additionalData: customChat?.addtionalData,
    },
  });

  useEffect(() => {
    if (
      isPersistentTokenLimitReached &&
      persistentTokenCount.date < Date.now() - TIME_TO_WAIT
    ) {
      setPersistentTokenCount({ count: 0, date: Date.now() });
    }
  }, [
    isPersistentTokenLimitReached,
    persistentTokenCount.date,
    setPersistentTokenCount,
  ]);

  const lastMessage = messages[messages.length - 1];

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;
  const isGenerating = isLoading && !isPending;

  const showReload = !isLoading && isLastMessageFromAssistant;

  return (
    <div
      className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col
        overflow-hidden sm:rounded-lg sm:bg-neutral-950 sm:p-4 sm:pr-0"
    >
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
        <ChatExamples
          setInput={setInput}
          examples={customChat?.messageTemplates}
        />
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
