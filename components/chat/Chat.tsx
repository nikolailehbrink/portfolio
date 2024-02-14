"use client";

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

  return (
    <>
      <div className="container mx-auto mb-4 mt-4 flex flex-1 flex-col overflow-hidden max-sm:pr-0 sm:mt-8">
        <h1 className="mb-6 text-5xl font-bold sm:mt-2 sm:text-center">
          Let&apos;s chat!
        </h1>
        <ChatMessages
          isLoading={isLoading}
          messages={messages}
          handleInputChange={handleInputChange}
          input={input}
          reload={reload}
          stop={stop}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
