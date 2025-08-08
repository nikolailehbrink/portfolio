import type { UseChatHelpers } from "@ai-sdk/react";

import {
  ArrowCounterClockwiseIcon,
  PaperPlaneTiltIcon,
  PauseIcon,
} from "@phosphor-icons/react";
import { Form } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Actions({
  disabled = false,
  handleInputChange,
  handleSubmit,
  input,
  reload,
  status,
  stop,
}: Pick<
  UseChatHelpers,
  "handleInputChange" | "handleSubmit" | "input" | "reload" | "status" | "stop"
> & { disabled?: boolean }) {
  return (
    <Form className="flex gap-2 pr-4" onSubmit={handleSubmit}>
      <Input
        aria-label="Type your message here"
        disabled={disabled}
        name="prompt"
        onChange={handleInputChange}
        value={input}
      />
      {status === "error" && (
        <Button
          aria-label="Reload message"
          onClick={() => reload()}
          size="icon"
        >
          <ArrowCounterClockwiseIcon size={24} weight="duotone" />
        </Button>
      )}
      {status === "ready" ? (
        <Button
          aria-label="Send message"
          disabled={disabled || !input || input.length < 2}
          size="icon"
          type="submit"
        >
          <PaperPlaneTiltIcon size={24} weight="duotone" />
        </Button>
      ) : status !== "error" ? (
        <Button
          aria-busy={status === "streaming"}
          aria-label="Stop message"
          disabled={disabled || status === "submitted"}
          onClick={stop}
          size="icon"
          type="button"
        >
          <PauseIcon size={24} weight="duotone" />
        </Button>
      ) : null}
    </Form>
  );
}
