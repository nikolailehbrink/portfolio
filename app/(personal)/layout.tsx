import CheckCircle from "@/assets/icons/unicons/check-circle.svg";
import ExclamationOctagon from "@/assets/icons/unicons/exclamation-octagon.svg";
import ExclamationTriangle from "@/assets/icons/unicons/exclamation-triangle.svg";
import InfoCircle from "@/assets/icons/unicons/info-circle.svg";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { tailwindConfig } from "@/tailwind.config";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Suspense } from "react";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/LiveVisualEditing"),
);

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
