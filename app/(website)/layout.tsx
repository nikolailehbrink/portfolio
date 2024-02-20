import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
