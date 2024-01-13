"use client";
import { mainNavigation, navigationButton } from "@/data/Home/MainNavigation";
import Logo from "@/app/icon.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import MenuButton from "./MenuButton";
import { usePathname } from "next/navigation";
import { useMenuClickOutside } from "@/hooks/useMenuClickOutside";

export default function MainNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useMenuClickOutside(
    menuRef,
    menuButtonRef,
    () => setShowMenu(false),
    showMenu,
  );

  return (
    <header className="container sticky top-4 z-50  flex max-lg:justify-start">
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
          <Link href={"/"}>
            <Logo className="h-12 w-12 rounded-full" />
          </Link>
        </div>
        <menu
          id="navigation"
          role="menu"
          aria-labelledby="menubutton"
          className="flex flex-1 justify-center gap-4 tracking-wide max-lg:flex-col lg:items-center"
        >
          {mainNavigation.map(({ link, title, icon }) => (
            <li role="none" key={link} className="">
              <Link
                role="menuitem"
                className="group flex items-center gap-2"
                href={link}
              >
                <i className="block w-7">{icon}</i>
                <span
                  className={cn(
                    "border-y-2 border-y-transparent transition-colors ",
                    pathname === link
                      ? "border-b-blue-300"
                      : "group-hover:border-b-white",
                  )}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </menu>
        <div className="hidden flex-1 justify-end lg:flex">
          {navigationButton && (
            <Button asChild>
              <Link href={navigationButton.link}>
                <i className="w-7">{navigationButton.icon}</i>
                {navigationButton.title}
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
