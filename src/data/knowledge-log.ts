import type { Icon } from "@phosphor-icons/react";
import { BookmarkSimpleIcon } from "@phosphor-icons/react/dist/ssr/BookmarkSimple";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { LightbulbIcon } from "@phosphor-icons/react/dist/ssr/Lightbulb";
import { QuestionIcon } from "@phosphor-icons/react/dist/ssr/Question";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";

import type { KnowledgeEntryType } from "@/db/schema";

type KnowledgeEntryTypeMeta = {
  label: string;
  icon: Icon;
  /** Badge classes, mirroring the accent badges used on the blog teasers. */
  className: string;
};

export const KNOWLEDGE_ENTRY_TYPE_META = {
  learning: {
    label: "Learning",
    icon: GraduationCapIcon,
    className: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  },
  resource: {
    label: "Resource",
    icon: BookmarkSimpleIcon,
    className: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
  },
  idea: {
    label: "Idea",
    icon: LightbulbIcon,
    className: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  },
  insight: {
    label: "Insight",
    icon: SparkleIcon,
    className: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
  },
  question: {
    label: "Question",
    icon: QuestionIcon,
    className: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
  },
  // `satisfies` keeps this exhaustive: adding a type to KNOWLEDGE_ENTRY_TYPES
  // without a label and icon here is a type error.
} as const satisfies Record<KnowledgeEntryType, KnowledgeEntryTypeMeta>;
