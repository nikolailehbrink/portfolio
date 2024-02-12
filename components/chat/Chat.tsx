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

  return (
    <div className="container mt-8 flex flex-col">
      <ChatMessages
        isLoading={isLoading}
        reload={reload}
        stop={stop}
        messages={messages}
      />
      <ChatInput
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
