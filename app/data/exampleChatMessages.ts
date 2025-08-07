import {
  BackpackIcon,
  BarbellIcon,
  BooksIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react";

export const EXAMPLE_MESSAGES = [
  {
    heading: "Hobbies",
    message: "What do you do for fun?",
    icon: BarbellIcon,
  },
  {
    heading: "Background",
    message: "What did you study?",
    icon: GraduationCapIcon,
  },
  {
    heading: "Traveling",
    message: "What's the most interesting place you've visited?",
    icon: BackpackIcon,
  },
  {
    heading: "Skills",
    message: "What is a skill you're proud of?",
    icon: BooksIcon,
  },
] as const;
