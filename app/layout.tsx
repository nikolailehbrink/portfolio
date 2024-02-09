"use client";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
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
        <Analytics
          beforeSend={(event) => {
            if (event.url.includes("/studio")) {
              return null;
            }
            return event;
          }}
        />
      </body>
    </html>
  );
}
