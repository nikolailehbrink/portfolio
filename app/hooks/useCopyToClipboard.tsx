import { useState } from "react";

export function useCopyToClipboard(initialText = "Copy to clipboard") {
  const [copiedText, setCopiedText] = useState(initialText);
  const [idle, setIdle] = useState(true);

  async function copyToClipboard(text: string) {
    setIdle(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText("Copied");
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopiedText("Failed to copy");
    } finally {
      setTimeout(() => {
        setCopiedText(initialText);
        setIdle(true);
      }, 2000);
    }
  }

  return { copiedText, copyToClipboard, idle };
}
