"use client";

import { useChat } from "ai/react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatActions from "./ChatActions";

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
      <div className="container mx-auto flex flex-1 flex-col overflow-hidden">
        <ChatMessages
          isLoading={isLoading}
          reload={reload}
          stop={stop}
          messages={messages}
        />
      </div>
      <div className="container relative my-4 ">
        <div className="absolute -top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <ChatActions
            reload={reload}
            stop={stop}
            showReload={showReload}
            showStop={isLoading}
          />
        </div>
        <ChatInput
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
        />
      </div>
    </>
  );
}
