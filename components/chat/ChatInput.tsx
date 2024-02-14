import { Input } from "../ui/input";
import type { UseChatHelpers } from "ai/react";
import { useEffect, useRef } from "react";
import ChatActions from "./ChatActions";

export default function ChatInput({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
  showReload,
  reload,
  isGenerating,
  stop,
}: Pick<
  UseChatHelpers,
  | "handleSubmit"
  | "input"
  | "handleInputChange"
  | "isLoading"
  | "stop"
  | "reload"
> & { showReload: boolean; isGenerating: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradien mx-auto w-full pr-4 pt-4"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <Input
          ref={inputRef}
          name="message"
          placeholder="Type a message"
          className="flex-1 focus-visible:border-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:bg-neutral-900"
          value={input}
          onChange={handleInputChange}
        />
        <ChatActions
          input={input}
          isGenerating={isGenerating}
          isLoading={isLoading}
          reload={reload}
          showReload={showReload}
          stop={stop}
        />
      </div>
    </form>
  );
}
