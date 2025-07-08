import type { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";

export default function ExampleMessage({
  setInput,
  message,
  children,
}: { message: string; children: React.ReactNode } & Pick<
  UseChatHelpers,
  "setInput"
>) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="border border-neutral-700 bg-neutral-800 hover:text-foreground
        sm:text-muted-foreground"
      onClick={() => setInput(message)}
    >
      {children}
    </Button>
  );
}
