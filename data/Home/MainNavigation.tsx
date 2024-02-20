import Desktop from "@/assets/icons/unicons/desktop.svg";
import Archive from "@/assets/icons/unicons/archive.svg";
import Diary from "@/assets/icons/unicons/diary.svg";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import ToiletPaper from "@/assets/icons/unicons/toilet-paper.svg";
import Robot from "@/assets/icons/unicons/robot.svg";

export const mainNavigation = [
  {
    link: "/chat",
    title: "AI Chat",
    icon: <Robot />,
  },
  {
    link: "/blog",
    title: "Blog",
    icon: <Newspaper />,
  },
  {
    link: "/#passion",
    title: "Passion",
    icon: <Desktop />,
  },
  {
    link: "/#projects",
    title: "Projects",
    icon: <Archive />,
  },
  {
    link: "/#experience",
    title: "Experience",
    icon: <Diary />,
  },
];

export const navigationButton = {
  link: "/#contact",
  title: "Contact",
  icon: <CommentCheck />,
};

export const sanityButton = {
  link: "/studio/structure",
  title: "Studio",
  icon: <ToiletPaper />,
};
