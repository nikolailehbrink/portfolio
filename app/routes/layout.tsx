import { Outlet, useLocation } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isChatRoute = pathname.includes("/chat");
  return (
    <>
      <Navbar />
      <main
        className={cn(
          "container flex grow justify-center",
          isChatRoute ? "overflow-hidden max-sm:pr-0" : "py-8 sm:py-12",
        )}
      >
        <Outlet />
      </main>
      <Footer className={isChatRoute ? "max-sm:hidden" : ""} />
    </>
  );
}
