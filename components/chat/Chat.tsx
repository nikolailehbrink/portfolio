"use client";

import { useChat } from "ai/react";
import ChatInput from "./ChatInput";
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
  const showReload = !isLoading && isLastMessageFromAssistant;

  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col overflow-hidden max-sm:pr-0">
        <ChatMessages isLoading={isLoading} messages={messages} />
      </div>
      <div className="container relative my-4 ">
        <ChatInput
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
          stop={stop}
          showReload={showReload}
          reload={reload}
        />
      </div>
    </>
  );
}
