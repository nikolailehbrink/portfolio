import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { tailwindConfig } from "@/tailwind.config";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing")
);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nikolailehbr.ink/"),
  title: {
    template: "%s - Nikolai Lehbrink",
    default: "Nikolai Lehbrink - Web Developer & Designer",
  },
  description:
    "Web enthusiast from Germany. Specializing in the React Ecosystem, dedicated to creating performant, accessible web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: tailwindConfig.theme.colors.blue.DEFAULT,
};

export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Suspense>{children}</Suspense>
      <Footer />
      <Analytics />
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  );
}
