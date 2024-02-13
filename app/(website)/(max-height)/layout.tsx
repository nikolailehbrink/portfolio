import VisualEditing from "@/components/VisualEditing";
import Footer from "@/components/home/Footer";
import MainNavigation from "@/components/home/MainNavigation";
import SocialNavigation from "@/components/home/SocialNavigation";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <MainNavigation />
      {children}
      <SocialNavigation />
      <Footer />
      {draftMode().isEnabled && <VisualEditing />}
    </div>
  );
}
