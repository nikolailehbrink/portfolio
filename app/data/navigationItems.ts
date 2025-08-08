import {
  ArticleNyTimesIcon,
  ChatsCircleIcon,
  HouseLineIcon,
  type Icon,
} from "@phosphor-icons/react";

import type { TypedRoute } from "@/types/href";

type NavigationLink = {
  icon: Icon;
  name: string;
  path: TypedRoute;
};

export const NAVIGATION_LINKS = [
  {
    icon: HouseLineIcon,
    name: "Home",
    path: "/",
  },
  {
    icon: ArticleNyTimesIcon,
    name: "Blog",
    path: "/blog",
  },
  {
    icon: ChatsCircleIcon,
    name: "AI Chat",
    path: "/chat",
  },
] as const satisfies NavigationLink[];
