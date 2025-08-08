import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout() {
  return (
    <div
      className="flex min-h-dvh flex-col bg-background bg-pattern
        text-foreground"
    >
      <Navbar className="animate-in duration-700 slide-in-from-top-50 fade-in-0" />
      <main className="container flex grow justify-center py-8 sm:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
