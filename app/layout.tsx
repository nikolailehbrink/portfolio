import GlobalLayout from "@/components/global/Layout/GlobalLayout";
import { Blinker } from "next/font/google";

const blinker = Blinker({
  weight: ["200", "400", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blinker",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${blinker.variable} dark scroll-smooth text-pretty
        font-blinker text-[17px] scrollbar-thin scrollbar-track-neutral-900
        scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500
        active:scrollbar-thumb-sky-500`}
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
