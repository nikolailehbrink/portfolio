import "tailwindcss/tailwind.css";

import { Viewport } from "next";
import { Blinker } from "next/font/google";

import GlobalLayout from "@/components/global/Layout/GlobalLayout";
import { tailwindConfig } from "@/tailwind.config";

const blinker = Blinker({
  weight: ["200", "400", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blinker",
});

export const viewport: Viewport = {
  themeColor: tailwindConfig.theme.colors.blue.DEFAULT,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${blinker.variable} dark font-blinker scroll-smooth text-balance text-[17px] scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 active:scrollbar-thumb-blue`}
    >
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
