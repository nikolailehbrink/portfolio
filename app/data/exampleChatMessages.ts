import {
  BackpackIcon,
  BarbellIcon,
  BooksIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react";

export const EXAMPLE_MESSAGES = [
  {
    heading: "Hobbies",
    icon: BarbellIcon,
    message: "What do you do for fun?",
  },
  {
    heading: "Background",
    icon: GraduationCapIcon,
    message: "What did you study?",
  },
  {
    heading: "Traveling",
    icon: BackpackIcon,
    message: "What's the most interesting place you've visited?",
  },
  {
    heading: "Skills",
    icon: BooksIcon,
    message: "What is a skill you're proud of?",
  },
] as const;
