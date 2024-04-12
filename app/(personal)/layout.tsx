import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { tailwindConfig } from "@/tailwind.config";
import InfoCircle from "@/assets/icons/unicons/info-circle.svg";
import CheckCircle from "@/assets/icons/unicons/check-circle.svg";
import ExclamationTriangle from "@/assets/icons/unicons/exclamation-triangle.svg";
import ExclamationOctagon from "@/assets/icons/unicons/exclamation-octagon.svg";
import { Toaster } from "@/components/ui/sonner";

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
  themeColor: tailwindConfig.theme.colors.sky["500"],
};

export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const width = tailwindConfig.theme.spacing[6];
  return (
    <>
      <Navbar />
      <Suspense>{children}</Suspense>
      <Footer />
      <Analytics />
      <Toaster
        icons={{
          success: <CheckCircle width={width} />,
          error: <ExclamationOctagon width={width} />,
          info: <InfoCircle width={width} />,
          warning: <ExclamationTriangle width={width} />,
        }}
      />
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  );
}
