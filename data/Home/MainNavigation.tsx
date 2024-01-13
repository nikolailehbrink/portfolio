import Rocket from "@/public/icons/rocket.svg";
import Archive from "@/public/icons/archive.svg";
import Experience from "@/public/icons/experience.svg";
import Message from "@/public/icons/message.svg";
import Blog from "@/public/icons/blog.svg";

export const mainNavigation = [
  {
    link: "/#services",
    title: "Leistungen",
    icon: <Rocket className="w-7" />,
  },
  {
    link: "/#projects",
    title: "Projekte",
    icon: <Archive className="w-7" />,
  },
  {
    link: "/#experience",
    title: "Erfahrung",
    icon: <Experience className="w-7" />,
  },
  {
    link: "/blog",
    title: "Blog",
    icon: <Blog className="w-7" />,
  },
];

export const navigationButton = {
  link: "/#contact",
  title: "Kontakt",
  icon: <Message className="w-7" />,
};
