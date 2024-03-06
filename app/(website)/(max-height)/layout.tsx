import VisualEditing from "@/components/VisualEditing";
import Footer from "@/components/layout/Footer";
import MainNavigation from "@/components/layout/navbar/MainNavigation";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <MainNavigation />
      {children}
      <Footer />
      {draftMode().isEnabled && <VisualEditing />}
    </div>
  );
}
