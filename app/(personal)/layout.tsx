import "@/app/globals.css";

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { toPlainText } from "next-sanity";
import { Suspense } from "react";

import { Footer } from "@/components/global/Footer";
import GlobalLayout from "@/components/global/Layout/GlobalLayout";
import { Navbar } from "@/components/global/Navbar";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { loadHomePage, loadSettings } from "@/sanity/loader/loadQuery";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing")
);

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ]);

  const ogImage = urlForOpenGraphImage(settings?.ogImage);
  return {
    title: homePage?.title
      ? {
          template: `%s | Nikolai Lehbrink`,
          default: homePage.title || "Personal website",
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalLayout>
        <Navbar />
        <Suspense>{children}</Suspense>
        <Footer />
      </GlobalLayout>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  );
}
