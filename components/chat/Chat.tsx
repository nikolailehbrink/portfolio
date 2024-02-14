"use client";

import ChatInput from "./ChatInput";
import { useChat } from "ai/react";
import ChatMessages from "./ChatMessages";

export default function Chat() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat();

  const lastMessage = messages[messages.length - 1];

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";
  const isPending = isLoading && !isLastMessageFromAssistant;
  const isGenerating = isLoading && !isPending;

  const showReload = !isLoading && isLastMessageFromAssistant;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col overflow-hidden sm:rounded-xl sm:bg-neutral-950 sm:p-4 sm:pr-0">
      <ChatMessages messages={messages} isPending={isPending} />
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
    </div>
  );
}
