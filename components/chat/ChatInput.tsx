import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { UseChatHelpers } from "ai/react";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";

export default function ChatInput({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
}: Pick<
  UseChatHelpers,
  "handleSubmit" | "input" | "handleInputChange" | "isLoading"
>) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl">
      <div className="flex w-full items-start justify-between gap-4 ">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" size={"sm"} disabled={isLoading}>
          <CommentCheck className="size-7" />
          {/* Send message */}
        </Button>
      </div>
    </form>
  );
}
