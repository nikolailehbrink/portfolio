"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  icon: JSX.Element;
  title: string;
};

export default function NavigationLink({ link, icon, title }: Props) {
  const pathname = usePathname();
  return (
    <Link role="menuitem" className="group flex items-center gap-2" href={link}>
      <i className="block size-7 flex-shrink-0">{icon}</i>
      <span
        className={cn(
          "border-y-2 border-y-transparent transition-colors ",
          pathname.includes(link)
            ? "border-b-sky-300"
            : "group-hover:border-b-white",
        )}
      >
        {title}
      </span>
    </Link>
  );
}
