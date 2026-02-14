import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

export default function CopyToClipboardButton({ code }: { code: string }) {
  const { copiedText, copyToClipboard, idle } = useCopyToClipboard();

  return (
    <button
      type="button"
      className={cn(
        `absolute top-2 right-2 rounded-md bg-muted p-2 py-1.5 text-right
        font-sans text-xs text-muted-foreground opacity-0 shadow-sm
        transition-all group-hover/code-block:opacity-100 focus:opacity-100
        active:bg-accent`,
        {
          "cursor-pointer hover:text-foreground": idle,
        },
      )}
      disabled={!idle}
      onClick={() => {
        copyToClipboard(code);
        track("copy-code-block", {
          code,
        });
      }}
      aria-label={idle ? "Copy code to clipboard" : "Code copied"}
      title={idle ? "Copy code to clipboard" : "Code copied"}
      tabIndex={0}
    >
      {copiedText}
    </button>
  );
}
