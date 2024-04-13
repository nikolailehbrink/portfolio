import Backpack from "@/assets/icons/unicons/backpack.svg";
import Book from "@/assets/icons/unicons/book.svg";
import Cell from "@/assets/icons/unicons/cell.svg";
import Dumbbell from "@/assets/icons/unicons/dumbbell.svg";
import { tailwindConfig } from "@/tailwind.config";
import type { UseChatHelpers } from "ai/react";
import ExampleMessage from "./ExampleMessage";

const size = tailwindConfig.theme.spacing[6];
export default function ChatExamples({
  setInput,
  examples,
}: Pick<UseChatHelpers, "setInput"> & {
  examples?: { heading: string; message: string }[];
}) {
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
      {examples
        ? examples.map(({ heading, message }, index) => (
            <ExampleMessage
              key={index}
              setInput={setInput}
              heading={heading}
              message={message}
            />
          ))
        : exampleMessages.map(({ heading, icon, message }, index) => (
            <ExampleMessage
              key={index}
              setInput={setInput}
              heading={heading}
              icon={icon}
              message={message}
            />
          ))}
    </div>
  );
}
