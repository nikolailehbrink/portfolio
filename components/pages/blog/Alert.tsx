import Code from "@/components/shared/Code";
import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";
import {
  CheckCircle,
  Info,
  Lightbulb,
  Question,
  Warning,
  WarningOctagon,
} from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import IconLink from "./IconLink";

const icons = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  error: WarningOctagon,
  tip: Lightbulb,
  question: Question,
};

const alert = cva(
  `my-4 flex items-start gap-2 rounded-lg bg-gradient-160 to-40% p-4 pl-3 pr-4
  ring-2 ring-inset ring-black/10 dark:ring-white/10`,
  {
    variants: {
      type: {
        success:
          "from-green-200 text-green-950 dark:from-green-800 dark:text-green-50",
        info: "from-sky-200 text-sky-950 dark:from-sky-800 dark:text-sky-50",
        warning: [
          `from-orange-200 text-orange-950 dark:from-orange-800
          dark:text-orange-50`,
        ],
        error: "from-red-200 text-red-950 dark:from-red-800 dark:text-red-50",
        tip: [
          `from-yellow-200 text-yellow-950 dark:from-yellow-800
          dark:text-yellow-50`,
        ],
        question:
          "from-neutral-200 dark:from-neutral-800 dark:text-neutral-100",
      },
    },
    defaultVariants: {
      type: "info",
    },
  },
);

type Props = {
  message: PortableTextBlock[];
  heading?: string;
  type?: keyof typeof icons;
  className?: string;
};
export default function Alert({
  message = [],
  heading,
  type = "info",
  className,
}: Props) {
  const Icon = icons[type] as Icon;
  const sentenceType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div className={cn(alert({ type, className }))}>
      <div className="relative">
        <div className="absolute inset-1 bg-current opacity-50 blur-md"></div>
        <Icon weight="duotone" size={24} />
      </div>

      <div className="space-y-1">
        <header className="not-prose font-bold leading-snug sm:text-lg/tight">
          {heading || sentenceType}
        </header>
        <div className="text-base/snug [&_a]:underline [&_a]:underline-offset-2">
          {message && message.length > 0 && (
            <PortableText
              value={message}
              components={{
                marks: {
                  code: ({ children }) => <Code>{children}</Code>,
                  link: IconLink,
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
