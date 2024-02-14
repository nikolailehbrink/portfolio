import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { UseChatHelpers } from "ai/react";
import Message from "@/assets/icons/unicons/message.svg";
import PauseCircle from "@/assets/icons/unicons/pause-circle.svg";
import CommentRedo from "@/assets/icons/unicons/comment-redo.svg";

export default function ChatInput({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
  showReload,
  reload,
}: Pick<
  UseChatHelpers,
  | "handleSubmit"
  | "input"
  | "handleInputChange"
  | "isLoading"
  | "stop"
  | "reload"
> & { showReload: boolean }) {
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-screen-lg">
      <div className="flex w-full items-start justify-between gap-2">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
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
            disabled={isLoading}
          >
            <Message className="size-7" />
          </Button>
        )}
      </div>
    </form>
  );
}
