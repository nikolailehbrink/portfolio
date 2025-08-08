import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// TODO: Really best way to do this is to use a second layout file?
export default function ChatLayout() {
  return (
    <div
      className="flex h-dvh flex-col bg-background bg-pattern text-foreground"
    >
      <Navbar />
      <main
        className="container flex grow justify-center overflow-hidden
          max-sm:pr-0"
      >
        <Outlet />
      </main>
      <Footer className="max-sm:hidden" />
    </div>
  );
}
