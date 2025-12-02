import type { Icon } from "@phosphor-icons/react";
import { HouseLineIcon } from "@phosphor-icons/react/dist/ssr/HouseLine";
import { ArticleNyTimesIcon } from "@phosphor-icons/react/dist/ssr/ArticleNyTimes";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";

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
    path: "/blog",
    icon: ArticleNyTimesIcon,
  },
  {
    label: "AI Chat",
    path: "/chat",
    icon: ChatsCircleIcon,
  },
] as const satisfies Array<NavigationLink>;
