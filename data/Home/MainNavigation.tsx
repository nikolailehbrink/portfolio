import Rocket from "@/public/icons/rocket.svg";
import Archive from "@/public/icons/archive.svg";
import Experience from "@/public/icons/experience.svg";
import Message from "@/public/icons/message.svg";
import Blog from "@/public/icons/blog.svg";
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
    icon: <Experience />,
  },
  {
    link: "/blog",
    title: "Blog",
    icon: <Blog />,
  },
];

export const navigationButton = {
  link: "/#contact",
  title: "Contact",
  icon: <Message />,
};

export const sanityButton = {
  link: "/studio/structure",
  title: "Studio",
  icon: <ToiletPaper />,
};
