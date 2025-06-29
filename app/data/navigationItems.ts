import type { TypedRoute } from "@/types/href";
import {
  ArticleNyTimes,
  ChatsCircle,
  HouseLine,
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
    icon: HouseLine,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: ArticleNyTimes,
  },
  {
    name: "AI Chat",
    path: "/chat",
    icon: ChatsCircle,
  },
] as const satisfies NavigationLink[];
