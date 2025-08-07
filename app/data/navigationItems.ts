import type { TypedRoute } from "@/types/href";
import {
  ArticleNyTimesIcon,
  ChatsCircleIcon,
  HouseLineIcon,
  type Icon,
} from "@phosphor-icons/react";

type NavigationLink = {
  name: string;
  path: TypedRoute;
  icon: Icon;
};

export const NAVIGATION_LINKS = [
  {
    name: "Home",
    path: "/",
    icon: HouseLineIcon,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: ArticleNyTimesIcon,
  },
  {
    name: "AI Chat",
    path: "/chat",
    icon: ChatsCircleIcon,
  },
] as const satisfies NavigationLink[];
