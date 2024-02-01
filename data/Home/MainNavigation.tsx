import Rocket from "@/public/icons/rocket.svg";
import Archive from "@/public/icons/archive.svg";
import Diary from "@/public/icons/diary.svg";
import CommentCheck from "@/public/icons/comment-check.svg";
import Newspaper from "@/public/icons/newspaper.svg";
import ToiletPaper from "@/public/icons/toilet-paper.svg";

export const mainNavigation = [
  {
    link: "/#services",
    title: "Services",
    icon: <Rocket />,
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
  {
    link: "/blog",
    title: "Blog",
    icon: <Newspaper />,
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
