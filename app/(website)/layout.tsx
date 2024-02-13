import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nikolailehbr.ink/"),
  title: {
    template: "%s | Nikolai Lehbrink",
    default: "Nikolai Lehbrink - Web Developer & Designer",
  },
  description:
    "Web enthusiast from Germany. Specializing in React and Next.js, dedicated to creating performant, cutting-edge web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
