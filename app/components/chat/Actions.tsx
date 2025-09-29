import { Form } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import type { UseChatHelpers } from "@ai-sdk/react";

export default function Actions({
  status,
  handleSubmit,
  input,
  handleInputChange,
  reload,
  stop,
  disabled = false,
}: Pick<
  UseChatHelpers,
  "status" | "handleSubmit" | "input" | "handleInputChange" | "reload" | "stop"
> & { disabled?: boolean }) {
  return (
    <Form onSubmit={handleSubmit} className="flex gap-2 pr-4">
      <Input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="Type your message here"
      />
      {status === "error" && (
        <Button
          aria-label="Reload message"
          size="icon"
          onClick={() => reload()}
        >
          <ArrowCounterClockwiseIcon size={24} weight="duotone" />
        </Button>
      )}
      {status === "ready" ? (
        <Button
          aria-label="Send message"
          type="submit"
          size="icon"
          disabled={disabled || !input || input.length < 2}
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
          disabled={disabled || status === "submitted"}
        >
          <PauseIcon size={24} weight="duotone" />
        </Button>
      ) : null}
    </Form>
  );
}
