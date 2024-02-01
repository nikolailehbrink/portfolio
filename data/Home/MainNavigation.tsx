import Rocket from "@/assets/icons/unicons/rocket.svg";
import Archive from "@/assets/icons/unicons/archive.svg";
import Diary from "@/assets/icons/unicons/diary.svg";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import ToiletPaper from "@/assets/icons/unicons/toilet-paper.svg";

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
