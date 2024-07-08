import GlobalLayout from "@/components/global/Layout/GlobalLayout";
import clsx from "clsx";
import { Blinker } from "next/font/google";
import "./globals.css";
import { tailwindConfig } from "@/tailwind.config";
import type { Metadata, Viewport } from "next";

const blinker = Blinker({
  weight: ["200", "400", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blinker",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        blinker.variable,
        `dark scroll-smooth text-pretty font-blinker text-[17px] scrollbar-thin
        scrollbar-track-neutral-900 scrollbar-thumb-neutral-600
        hover:scrollbar-thumb-neutral-500 active:scrollbar-thumb-sky-500`,
      )}
    >
      {/* Empty style tag from gsap */}
      <body
        className="dark:bg-neutral-900 dark:text-neutral-100"
        suppressHydrationWarning
      >
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
