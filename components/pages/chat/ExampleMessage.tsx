import { cn } from "@/lib/utils";
import type { UseChatHelpers } from "ai/react";

export default function ExampleMessage({
  className,
  setInput,
  heading,
  message,
  icon,
  ...props
}: Pick<UseChatHelpers, "setInput"> & {
  className?: string;
  heading: string;
  message: string;
  icon?: JSX.Element;
}) {
  return (
    <button
      {...props}
      onClick={() => setInput(message)}
      className={cn(
        `inline-flex items-center gap-2 rounded-lg border-2 border-border
        bg-neutral-950 px-2 py-1 text-sm sm:bg-neutral-900
        sm:hover:bg-neutral-950`,
        className,
      )}
    >
      {icon && icon}
      <span className="max-sm:sr-only">{heading}</span>
    </button>
  );
}
