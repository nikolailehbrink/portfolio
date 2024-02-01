import type { Metadata, Viewport } from "next";
import { Blinker } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { twConfig } from "@/lib/utils";

const blinker = Blinker({
  weight: ["200", "400", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blinker",
});

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
    url: "https://nikolailehbr.ink",
  },
};

export const viewport: Viewport = {
  themeColor: twConfig.theme.colors.blue.DEFAULT,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth text-balance text-[17px] scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 active:scrollbar-thumb-blue"
    >
      <body
        suppressHydrationWarning
        className={`${blinker.variable} flex min-h-dvh flex-col font-sans dark:bg-neutral-900 dark:text-neutral-50`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
