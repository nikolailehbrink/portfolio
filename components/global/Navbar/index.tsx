"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/icon.svg";
import Diary from "@/assets/icons/unicons/diary.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import Robot from "@/assets/icons/unicons/robot.svg";
import { useMenuClickOutside } from "@/hooks/useMenuClickOutside";
import { cn } from "@/lib/utils";

import MenuButton from "./MenuButton";
import NavigationLink from "./NavigationLink";

const navigationItems = [
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
    link: "/#contact",
    title: "Contact",
    icon: <Diary />,
  },
];

export function Navbar() {
  const { menuRef, menuButtonRef, showMenu, setShowMenu } =
    useMenuClickOutside();

  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <div className="sticky top-0 z-50 lg:bg-neutral-900/80 lg:backdrop-blur-2xl lg:py-3">
      <header className="container flex max-lg:justify-start">
        <MenuButton
          ref={menuButtonRef}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        <nav
          ref={menuRef}
          className={cn(
            `flex max-lg:rounded-lg max-lg:border-2 border-neutral-700 max-lg:bg-neutral-950 font-bold max-lg:fixed max-lg:right-0 max-lg:top-20 max-lg:mr-4 max-lg:flex-col max-lg:items-center max-lg:gap-6 max-lg:p-8 max-lg:transition-transform lg:w-full`,
            !showMenu && "max-lg:translate-x-[calc(100%_+_1rem)]"
          )}
        >
          <div className="relative flex flex-1">
            <Link
              href={isHome ? "#top" : "/"}
              aria-label={isHome ? "Scroll to top" : "Go to home page"}
            >
              <Logo
                className={`size-12 rounded-full ${!isHome && "hover:scale-110 transition-transform"}`}
              />
            </Link>
          </div>
          <menu
            id="navigation"
            role="menu"
            aria-labelledby="menubutton"
            className="flex justify-center gap-4 tracking-wide max-lg:flex-col lg:items-center"
          >
            {navigationItems.map(({ link, title, icon }) => (
              <li role="none" key={link}>
                <NavigationLink link={link} title={title} icon={icon} />
              </li>
            ))}
          </menu>
        </nav>
      </header>
    </div>
  );
}
