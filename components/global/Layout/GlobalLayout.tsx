"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: Props) {
  const path = usePathname();
  return (
    <div
      className={clsx(
        "flex flex-col dark:bg-neutral-900 dark:text-neutral-100",
        path.startsWith("/chat") ? "h-dvh" : "min-h-dvh",
      )}
    >
      {children}
    </div>
  );
}
