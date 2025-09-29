import type { TypedRoute } from "@/types/href";
import type { Icon } from "@phosphor-icons/react";
import { ArticleNyTimesIcon } from "@phosphor-icons/react/dist/ssr/ArticleNyTimes";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { HouseLineIcon } from "@phosphor-icons/react/dist/ssr/HouseLine";

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
