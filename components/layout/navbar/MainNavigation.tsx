"use client";

import {
  mainNavigation,
  contactLink,
  sanityButton,
} from "@/data/navigation/main";
import Logo from "@/app/icon.svg";
import Link from "next/link";
import { cn, isDev } from "@/lib/utils";
import MenuButton from "./MenuButton";
import { useMenuClickOutside } from "@/hooks/useMenuClickOutside";
import NavigationLink from "./NavigationLink";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MainNavigation() {
  const { link: sanityLink, title, icon } = sanityButton;
  const { menuRef, menuButtonRef, showMenu, setShowMenu } =
    useMenuClickOutside();

  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="container sticky top-4 z-50 flex max-lg:justify-start lg:duration-1000 lg:animate-in lg:fade-in lg:slide-in-from-top-28">
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
          <Link
            href={isHome ? "#top" : "/"}
            aria-label={isHome ? "Scroll to top" : "Go to home page"}
          >
            <Logo className="size-12 rounded-full" />
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
            <li role="none">
              <NavigationLink link={sanityLink} title={title} icon={icon} />
            </li>
          )}
          {contactLink && (
            <li role="none" className="lg:hidden">
              <NavigationLink
                link={contactLink.link}
                title={contactLink.title}
                icon={contactLink.icon}
              />
            </li>
          )}
        </menu>
        {contactLink && (
          <div className="hidden flex-1 justify-end lg:flex">
            <Button asChild>
              <Link href={contactLink.link}>
                <i className="size-7">{contactLink.icon}</i>
                {contactLink.title}
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
