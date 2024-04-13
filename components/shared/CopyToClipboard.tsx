"use client";

import Copy from "@/assets/icons/unicons/copy.svg";
import FileCheck from "@/assets/icons/unicons/file-check.svg";
import FileTimes from "@/assets/icons/unicons/file-times.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  text: string;
};

export default function CopyToClipboard({ text }: Props) {
  const initialIcon = <Copy />;

  const [icon, setIcon] = useState(initialIcon);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    await copyToClipboard(text, {
      success: () => {
        setIcon(<FileCheck />);
        toast.success("Copied code to clipboard!");
      },
      error: () => {
        setIcon(<FileTimes />);
        toast.error("Failed to copy code to clipboard!");
      },
      finish: () => {
        setTimeout(() => {
          setIcon(initialIcon);
          setLoading(false);
        }, 2000);
      },
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label="Copy to clipboard"
            disabled={loading}
            className="flex"
            onClick={handleButtonClick}
          >
            <i className="size-6">{icon}</i>
          </button>
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
