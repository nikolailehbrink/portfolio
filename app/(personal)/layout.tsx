import CheckCircle from "@/assets/icons/unicons/check-circle.svg";
import ExclamationOctagon from "@/assets/icons/unicons/exclamation-octagon.svg";
import ExclamationTriangle from "@/assets/icons/unicons/exclamation-triangle.svg";
import InfoCircle from "@/assets/icons/unicons/info-circle.svg";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { tailwindConfig } from "@/tailwind.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing"),
);

const siteDomain = "https://www.nikolailehbr.ink";

export const metadata: Metadata = {
  metadataBase: new URL(siteDomain),
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
  alternates: { canonical: siteDomain },
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
