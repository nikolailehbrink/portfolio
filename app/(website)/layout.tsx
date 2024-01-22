import Footer from "@/components/home/Footer";
import MainNavigation from "@/components/home/MainNavigation";
import SocialNavigation from "@/components/home/SocialNavigation";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main className="mt-8 grow">{children}</main>
      <SocialNavigation />
      <Footer />
    </>
  );
}
