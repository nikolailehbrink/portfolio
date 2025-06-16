import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout() {
  return (
    <div
      className="flex min-h-dvh flex-col bg-background bg-pattern
        text-foreground"
    >
      <Navbar />
      <main className="container flex grow justify-center py-8 sm:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
