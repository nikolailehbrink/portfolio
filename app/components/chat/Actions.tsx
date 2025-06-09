import { Form } from "react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowCounterClockwise,
  PaperPlaneTilt,
  Pause,
} from "@phosphor-icons/react";
import type { UseChatHelpers } from "@ai-sdk/react";
import { track } from "@vercel/analytics/react";

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
      />
      {status === "error" && (
        <Button
          aria-label="Reload message
        "
          size="icon"
          onClick={() => reload()}
        >
          <ArrowCounterClockwise size={24} weight="duotone" />
        </Button>
      )}
      {status === "ready" ? (
        <Button
          aria-label="Send message"
          type="submit"
          size="icon"
          disabled={disabled || !input || input.length < 2}
          onClick={() => track("submit-ai-message")}
        >
          <PaperPlaneTilt weight="duotone" size={24} />
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
          <Pause size={24} weight="duotone" />
        </Button>
      ) : null}
    </Form>
  );
}
