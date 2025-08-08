import type { UseChatHelpers } from "@ai-sdk/react";

import { Button } from "@/components/ui/button";

export default function ExampleMessage({
  children,
  message,
  setInput,
}: Pick<
  UseChatHelpers,
  "setInput"
> & { children: React.ReactNode; message: string; }) {
  return (
    <Button
      className="border border-neutral-700 bg-neutral-800 hover:text-foreground
        sm:text-muted-foreground"
      onClick={() => setInput(message)}
      size="sm"
      variant="secondary"
    >
      {children}
    </Button>
  );
}
