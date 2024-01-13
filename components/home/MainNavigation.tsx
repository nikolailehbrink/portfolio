"use client";
import { mainNavigation, navigationButton } from "@/data/Home/MainNavigation";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MainNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="container sticky top-4 z-50  flex max-lg:justify-start">
      <label
        htmlFor="menu-toggle"
        className="fixed right-4 top-4 flex h-12 w-12 cursor-pointer flex-col rounded border-2 p-2 lg:hidden"
      >
        <input
          onChange={() => setShowMenu(!showMenu)}
          className="peer hidden"
          type="checkbox"
          id="menu-toggle"
        />
        <span className="my-[3px] h-[3px] w-1/2 rounded bg-neutral-100 transition-all peer-checked:w-full peer-checked:origin-top-left peer-checked:translate-x-[5px] peer-checked:rotate-45"></span>
        <span className="my-[3px] h-[3px] w-full rounded bg-neutral-100 transition-all peer-checked:translate-y-[1px] peer-checked:-rotate-45"></span>
        <span className="my-[3px] h-[3px] w-3/4 rounded bg-neutral-100 transition-all peer-checked:w-0 peer-checked:-rotate-45 peer-checked:opacity-0"></span>
      </label>
      <nav
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
        <menu className="flex flex-1 justify-center gap-4 tracking-wide max-lg:flex-col lg:items-center">
          {mainNavigation.map(({ link, title, icon }) => (
            <li key={link} className="flex items-center gap-2">
              <i className="w-7">{icon}</i>
              <Link
                className="border-y-2 border-y-transparent transition-colors hover:border-b-white"
                href={link}
              >
                {title}
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
