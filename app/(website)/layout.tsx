import VisualEditing from "@/components/VisualEditing";
import Footer from "@/components/home/Footer";
import MainNavigation from "@/components/home/MainNavigation";
import SocialNavigation from "@/components/home/SocialNavigation";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Nikolai Lehbrink",
    default: "Nikolai Lehbrink - Web Developer & Designer",
  },
  description:
    "Web enthusiast from Germany. Specializing in React and Next.js, dedicated to creating performant, cutting-edge web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main className="mt-4 grow">{children}</main>
      <SocialNavigation />
      <Footer />
      {draftMode().isEnabled && <VisualEditing />}
    </>
  );
}
