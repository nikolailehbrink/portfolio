"use client";

import ChatInput from "./ChatInput";
import { useChat } from "ai/react";
import ChatMessages from "./ChatMessages";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import ChatExamples from "./ChatExamples";
import { useState } from "react";

export default function Chat() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [tokenLimitReached, setTokenLimitReached] = useState(false);

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    setInput,
  } = useChat({
    onError: (e) => {
      if (JSON.parse(e.message) === "Token limit reached") {
        setTokenLimitReached(true);
        return;
      }
      toast.error("An error occurred");
    },
    body: { name },
  });

  const lastMessage = messages[messages.length - 1];

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;
  const isGenerating = isLoading && !isPending;

  const showReload = !isLoading && isLastMessageFromAssistant;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col overflow-hidden sm:rounded-xl sm:bg-neutral-950 sm:p-4 sm:pr-0">
      <ChatMessages
        messages={messages}
        isPending={isPending}
        tokenLimitReached={tokenLimitReached}
      />
      {messages.length < 3 && <ChatExamples setInput={setInput} />}
      {!tokenLimitReached && (
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
