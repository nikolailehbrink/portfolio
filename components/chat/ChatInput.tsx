import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { UseChatHelpers } from "ai/react";
import Message from "@/assets/icons/unicons/message.svg";
import PauseCircle from "@/assets/icons/unicons/pause-circle.svg";
import CommentRedo from "@/assets/icons/unicons/comment-redo.svg";
import { useEffect, useRef } from "react";

export default function ChatInput({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
  showReload,
  reload,
  isPending,
}: Pick<
  UseChatHelpers,
  | "handleSubmit"
  | "input"
  | "handleInputChange"
  | "isLoading"
  | "stop"
  | "reload"
> & { showReload: boolean; isPending: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-4 w-full max-sm:pr-4">
      <div className="flex w-full items-start justify-between gap-2">
        <Input
          ref={inputRef}
          name="message"
          placeholder="Type a message"
          className="flex-1 focus-visible:border-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:bg-neutral-900"
          value={input}
          onChange={handleInputChange}
        />
        {showReload && (
          <Button
            type="button"
            aria-label="Regenerate message"
            size="icon"
            variant={"secondary"}
            onClick={() => reload()}
          >
            <CommentRedo className="size-7" />
          </Button>
        )}
        {isLoading ? (
          <Button
            disabled={isPending}
            aria-label="Stop generating"
            size="icon"
            onClick={() => stop()}
          >
            <PauseCircle className="size-7" />
          </Button>
        ) : (
          <Button
            aria-label="Submit message"
            type="submit"
            size="icon"
            disabled={isLoading || !input.length}
          >
            <Message className="size-7" />
          </Button>
        )}
      </div>
    </form>
  );
}
