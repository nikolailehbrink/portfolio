import { useReadingTime } from "@/hooks/useReadingTime";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ReactNode } from "react";
import { useRef } from "react";
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
  const q = gsap.utils.selector(initialMessageRef);
  useGSAP(
    () => {
      const buttons = q(".button, a");
      const tl = gsap.timeline();
      tl.to(q("p"), {
        text,
        duration: secondsToRead / 2,
      });

      if (buttons.length > 0) {
        tl.from("button, a", {
          autoAlpha: 0,
          stagger: 0.2,
          display: "none",
        });
      }
    },
    { scope: initialMessageRef },
  );
  return (
    <ChatMessage ref={initialMessageRef} content="Hi!" role="assistant">
      {children}
    </ChatMessage>
  );
}
