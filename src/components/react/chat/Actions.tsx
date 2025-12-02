import { Input } from "@/components/react/ui/input";
import { Button } from "@/components/react/ui/button";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import type { UIMessage, UseChatHelpers } from "@ai-sdk/react";
import type React from "react";

export default function Actions({
  status,
  stop,
  regenerate,
  input,
  handleSubmit,
  handleInputChange,
  isInputDisabled = false,
}: Pick<UseChatHelpers<UIMessage>, "status" | "stop" | "regenerate"> & {
  handleSubmit: React.ComponentProps<"form">["onSubmit"];
  input: string;
  handleInputChange: React.ComponentProps<"input">["onChange"];
  isInputDisabled?: boolean;
}) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pr-4">
      <Input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        disabled={isInputDisabled}
        aria-label="Type your message here"
      />
      {status === "error" && (
        <Button
          aria-label="Regenerate message"
          size="icon"
          onClick={() => regenerate()}
        >
          <ArrowCounterClockwiseIcon size={24} weight="duotone" />
        </Button>
      )}
      {status === "ready" ? (
        <Button
          aria-label="Send message"
          type="submit"
          size="icon"
          disabled={isInputDisabled || !input || input.trim().length < 2}
        >
          <PaperPlaneTiltIcon weight="duotone" size={24} />
        </Button>
      ) : status !== "error" ? (
        <Button
          aria-label="Stop message"
          aria-busy={status === "streaming"}
          type="button"
          size="icon"
          onClick={stop}
          disabled={isInputDisabled || status === "submitted"}
        >
          <PauseIcon size={24} weight="duotone" />
        </Button>
      ) : null}
    </form>
  );
}
