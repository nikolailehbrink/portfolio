import { Backpack, Barbell, Books, GraduationCap } from "@phosphor-icons/react";

export const EXAMPLE_MESSAGES = [
  {
    heading: "Hobbies",
    message: "What do you do for fun?",
    icon: Barbell,
  },
  {
    heading: "Background",
    message: "What did you study?",
    icon: GraduationCap,
  },
  {
    heading: "Traveling",
    message: "What's the most interesting place you've visited?",
    icon: Backpack,
  },
  {
    heading: "Skills",
    message: "What is a skill you're proud of?",
    icon: Books,
  },
] as const;
