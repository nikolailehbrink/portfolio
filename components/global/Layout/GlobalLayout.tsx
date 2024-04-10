"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: Props) {
  const path = usePathname();
  return (
    <div
      className={`flex flex-col ${path.startsWith("/chat") ? "h-dvh" : "min-h-dvh"} dark:bg-neutral-900 dark:text-neutral-100`}
    >
      {children}
    </div>
  );
}
