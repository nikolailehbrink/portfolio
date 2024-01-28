"use client";

import {
  mainNavigation,
  navigationButton,
  sanityButton,
} from "@/data/Home/MainNavigation";
import Logo from "@/app/icon.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { cn, isDev } from "@/lib/utils";
import MenuButton from "./MenuButton";
import { useMenuClickOutside } from "@/hooks/useMenuClickOutside";
import NavigationLink from "./NavigationLink";
import { usePathname } from "next/navigation";

export default function MainNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { link: sanityLink, title, icon } = sanityButton;
  useMenuClickOutside(
    menuRef,
    menuButtonRef,
    () => setShowMenu(false),
    showMenu,
  );

  const pathname = usePathname();

  return (
    <header className="container sticky top-4 z-50 flex duration-1000 max-lg:justify-start lg:animate-in lg:fade-in lg:slide-in-from-top-28">
      <MenuButton
        ref={menuButtonRef}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <nav
        ref={menuRef}
        className={cn(
          `flex rounded-lg border-2 border-neutral-700 bg-neutral-900 p-2 font-bold max-lg:fixed max-lg:right-0 max-lg:top-20 max-lg:mr-4 max-lg:flex-col max-lg:items-center max-lg:gap-6 max-lg:p-8 max-lg:transition-transform lg:w-full lg:rounded-full`,
          !showMenu && "max-lg:translate-x-[calc(100%_+_1rem)]",
        )}
      >
        <div className="relative flex flex-1">
          <Link href={pathname === "/" ? "#top" : "/"}>
            <Logo className="h-12 w-12 rounded-full" />
          </Link>
        </div>
        <menu
          id="navigation"
          role="menu"
          aria-labelledby="menubutton"
          className="flex justify-center gap-4 tracking-wide max-lg:flex-col lg:items-center"
        >
          {mainNavigation.map(({ link, title, icon }) => (
            <li role="none" key={link}>
              <NavigationLink link={link} title={title} icon={icon} />
            </li>
          ))}
          {isDev && (
            <li>
              <NavigationLink link={sanityLink} title={title} icon={icon} />
            </li>
          )}
        </menu>
        <div className="hidden flex-1 justify-end lg:flex">
          {navigationButton && (
            <Button asChild>
              <Link href={navigationButton.link}>
                <i className="size-7">{navigationButton.icon}</i>
                {navigationButton.title}
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
