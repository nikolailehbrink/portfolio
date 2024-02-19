import { cn, twConfig } from "@/lib/utils";

import Dumbbell from "@/assets/icons/unicons/dumbbell.svg";
import Backpack from "@/assets/icons/unicons/backpack.svg";
import Book from "@/assets/icons/unicons/book.svg";
import Cell from "@/assets/icons/unicons/cell.svg";
import type { UseChatHelpers } from "ai/react";

const size = twConfig.theme.spacing[6];
export default function ChatExamples({
  setInput,
}: Pick<UseChatHelpers, "setInput">) {
  const exampleMessages = [
    {
      heading: "Hobbies",
      message: `What do you do for fun?`,
      icon: <Dumbbell width={size} />,
    },
    {
      heading: "Background",
      message: `What did you study?`,
      icon: <Book width={size} />,
    },
    {
      heading: "Traveling",
      message: `What's the most interesting place you've visited?`,
      icon: <Backpack width={size} />,
    },
    {
      heading: "Skills",
      message: `What is a skill you're proud of?`,
      icon: <Cell width={size} />,
    },
  ];
  return (
    <div className="mr-4 mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
      {exampleMessages.map(({ heading, icon, message }, index) => (
        <button
          onClick={() => setInput(message)}
          key={index}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border-2 border-border bg-neutral-950 px-2 py-1 text-sm sm:bg-neutral-900 sm:hover:bg-neutral-950",
            index > 1 && "max-sm:hidden",
          )}
        >
          {icon}

          {heading}
        </button>
      ))}
    </div>
  );
}
