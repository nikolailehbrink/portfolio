import type { ReactNode } from "react";
import { useRef } from "react";

import { useReadingTime } from "@/hooks/useReadingTime";
import { gsap, useGSAP } from "@/lib/gsap";

import ChatMessage from "./ChatMessage";

export default function CustomChatMessage({
  text,
  children,
}: {
  text: string;
  children?: ReactNode;
}) {
  const { secondsToRead } = useReadingTime(text);
  const initialMessageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to("p", {
        text,
        duration: secondsToRead / 2,
      });
      tl.from("button, a", {
        autoAlpha: 0,
        stagger: 0.2,
        display: "none",
      });
    },
    { scope: initialMessageRef }
  );
  return (
    <ChatMessage ref={initialMessageRef} content="Hi!" role="assistant">
      {children}
    </ChatMessage>
  );
}
