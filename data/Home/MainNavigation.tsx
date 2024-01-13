import Rocket from "@/public/icons/rocket.svg";
import Archive from "@/public/icons/archive.svg";
import Experience from "@/public/icons/experience.svg";
import Message from "@/public/icons/message.svg";
import Blog from "@/public/icons/blog.svg";

export const mainNavigation = [
  {
    link: "/#services",
    title: "Leistungen",
    icon: <Rocket />,
  },
  {
    link: "/#projects",
    title: "Projekte",
    icon: <Archive />,
  },
  {
    link: "/#experience",
    title: "Erfahrung",
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
  title: "Kontakt",
  icon: <Message />,
};
