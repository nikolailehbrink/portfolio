import VisualEditing from "@/components/VisualEditing";
import Footer from "@/components/home/Footer";
import MainNavigation from "@/components/home/MainNavigation";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main className="mt-4 grow">{children}</main>
      <Footer />
      {draftMode().isEnabled && <VisualEditing />}
    </>
  );
}
