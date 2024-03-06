import type { Metadata, Viewport } from "next";
import { Blinker } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { twConfig } from "@/lib/utils";
import "@/app/globals.css";
import InfoCircle from "@/assets/icons/unicons/info-circle.svg";
import CheckCircle from "@/assets/icons/unicons/check-circle.svg";
import ExclamationTriangle from "@/assets/icons/unicons/exclamation-triangle.svg";
import ExclamationOctagon from "@/assets/icons/unicons/exclamation-octagon.svg";
import { tailwindConfig } from "@/tailwind.config";

const blinker = Blinker({
  weight: ["200", "400", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blinker",
});

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
  themeColor: twConfig.theme.colors.blue.DEFAULT,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const width = tailwindConfig.theme.spacing[6];
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
        <Toaster
          icons={{
            success: <CheckCircle width={width} />,
            error: <ExclamationOctagon width={width} />,
            info: <InfoCircle width={width} />,
            warning: <ExclamationTriangle width={width} />,
          }}
        />
      </body>
    </html>
  );
}
