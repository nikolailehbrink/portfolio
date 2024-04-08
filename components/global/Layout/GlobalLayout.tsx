"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: Props) {
  const path = usePathname();
  return (
    <div
      className={`flex ${path.startsWith("/chat") ? "h-dvh" : "min-h-dvh"}  flex-col bg-white text-black`}
    >
      {children}
    </div>
  );
}
