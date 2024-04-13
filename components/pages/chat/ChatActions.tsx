import CommentRedo from "@/assets/icons/unicons/comment-redo.svg";
import Message from "@/assets/icons/unicons/message.svg";
import PauseCircle from "@/assets/icons/unicons/pause-circle.svg";
import { Button } from "@/components/ui/button";
import type { UseChatHelpers } from "ai/react";

export default function ChatActions({
  stop,
  reload,
  showReload,
  input,
  isLoading,
  isGenerating,
}: Pick<UseChatHelpers, "stop" | "reload" | "input" | "isLoading"> & {
  showReload: boolean;
  isGenerating: boolean;
}) {
  return (
    <>
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
      {isGenerating ? (
        <Button aria-label="Stop generating" size="icon" onClick={() => stop()}>
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
    </>
  );
}
