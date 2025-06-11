import {
  CheckCircle,
  Info,
  Lightbulb,
  Question,
  Warning,
  WarningOctagon,
} from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ICONS = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  error: WarningOctagon,
  tip: Lightbulb,
  question: Question,
} as const;

type Props = {
  children: React.ReactNode;
  heading?: string;
  type?: keyof typeof ICONS;
} & React.ComponentProps<"div">;

export default function Alert({
  children,
  heading,
  type = "info",
  className,
  ...props
}: Props) {
  const Icon = ICONS[type];
  const sentenceCaseType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    // According to https://cva.style/docs/getting-started/extending-components one can pass the className prop to the function
    // However this adds the class at the end and doesn't merge it with the existing classes, so I use cn here
    <div className={cn(alert({ type }), className)} {...props}>
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <div className="absolute inset-1 opacity-50 blur-md"></div>
          <Icon weight="duotone" size={24} />
        </div>
        <header className="font-bold">{heading || sentenceCaseType}</header>
      </div>
      <div
        className="flex flex-col gap-2 [&_a]:underline [&_a]:underline-offset-2"
      >
        {children}
      </div>
    </div>
  );
}

const alert = cva(
  `not-prose z-20 flex flex-col items-start gap-2 rounded-xl bg-neutral-900
  bg-linear-160 to-50% p-4 ring ring-black/10 ring-inset md:-mx-8 lg:-mx-12
  dark:ring-white/10 [li>div]:mx-0 [li>div]:mt-2 [li>div]:mb-3`,
  {
    variants: {
      type: {
        success:
          "from-green-200 text-green-950 dark:from-green-950 dark:text-green-50",
        info: "from-sky-200 text-sky-950 dark:from-sky-950 dark:text-sky-50",
        warning: [
          `from-orange-200 text-orange-950 dark:from-orange-950
          dark:text-orange-50`,
        ],
        error: "from-red-200 text-red-950 dark:from-red-950 dark:text-red-50",
        tip: [
          `from-yellow-200 text-yellow-950 dark:from-yellow-950
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
