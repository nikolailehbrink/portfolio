import { Button } from "@/components/react/ui/button";
import { cn } from "@/lib/utils";

// Layout container for a row of suggestion chips. Used for both the static
// starter prompts and the AI-generated follow-ups, so they always look the same.
export default function Suggestions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap justify-center gap-2", className)}
      {...props}
    />
  );
}

// A single suggestion chip. Clicking it hands the `suggestion` text to
// `onClick` (the chat fills it into the input rather than sending it). Pass
// `children` to show a custom label/icon; otherwise the suggestion is shown.
export function Suggestion({
  suggestion,
  onClick,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={cn(
        `border border-border bg-muted hover:text-foreground
        sm:text-muted-foreground`,
        className,
      )}
      onClick={() => onClick?.(suggestion)}
      {...props}
    >
      {children ?? suggestion}
    </Button>
  );
}

// Placeholder chip shown while follow-ups are still streaming in.
export function SuggestionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("h-8 animate-pulse rounded-md bg-muted", className)} />
  );
}
