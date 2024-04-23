import { Input } from "@/components/ui/input";
import type { UseChatHelpers } from "ai/react";
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
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full pr-4 pt-2 sm:pt-4">
      <div className="flex w-full items-start justify-between gap-2">
        <Input
          name="message"
          placeholder="Type a message"
          className="flex-1 focus-visible:border-white focus-visible:ring-0
            focus-visible:ring-transparent focus-visible:ring-offset-0
            sm:bg-neutral-900"
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
