import type { Icon } from "@phosphor-icons/react";
import { HouseLineIcon } from "@phosphor-icons/react/dist/ssr/HouseLine";
import { ArticleNyTimesIcon } from "@phosphor-icons/react/dist/ssr/ArticleNyTimes";
import { BrainIcon } from "@phosphor-icons/react/dist/ssr/Brain";
import { NotebookIcon } from "@phosphor-icons/react/dist/ssr/Notebook";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";

export type NavigationLink = {
  label: string;
  path: string;
  icon: Icon;
};

export const NAVIGATION_LINKS = [
  {
    label: "Home",
    path: "/",
    icon: HouseLineIcon,
  },
  {
    label: "Blog",
    path: "/blog/",
    icon: ArticleNyTimesIcon,
  },
  {
    label: "Chat",
    path: "/chat/",
    icon: BrainIcon,
  },
  {
    label: "Thoughts",
    path: "/thoughts/",
    icon: NotebookIcon,
  },
  {
    label: "Log",
    path: "/knowledge-log/",
    icon: LightningIcon,
  },
] as const satisfies Array<NavigationLink>;
