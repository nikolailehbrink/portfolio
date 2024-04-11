import { Blinker } from "next/font/google";

import GlobalLayout from "@/components/global/Layout/GlobalLayout";

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
      className={`${blinker.variable} dark font-blinker scroll-smooth text-balance text-[17px] scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 active:scrollbar-thumb-sky-500`}
    >
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
