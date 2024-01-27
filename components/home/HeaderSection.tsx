import HeaderIllustration from "@/public/header-illustration.svg";
import Archive from "@/public/icons/archive.svg";
import Message from "@/public/icons/message.svg";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderSection() {
  return (
    <div className="container grid items-center gap-12 lg:grid-cols-2">
      <div className="space-y-4 *:duration-1000 *:animate-in *:fade-in *:fill-mode-both">
        <h1 className="text-6xl font-bold delay-150">
          Nikolai
          <br />
          Lehbrink
        </h1>
        <p className="delay-300">
          Herzlich willkommen auf meiner Portfolio-Webseite! Ich bin ein
          26-jähriger Webentwickler aus Bremen, Deutschland, der seine
          Leidenschaft während des Studiums entdeckt hat. Seitdem gestalte und
          entwickle ich Webseiten und freue mich, dir hier einige meiner
          Projekte vorzustellen.
        </p>
        <p className="delay-500">
          Ich bin stets offen für neue Herausforderungen und Möglichkeiten zur
          Zusammenarbeit. Suchst du Kreativität, Zuverlässigkeit und Engagement,
          bist du hier genau richtig. Zögere nicht, mich zu kontaktieren - ich
          freue mich auf deine Nachricht!
        </p>
        <div className="flex gap-4 delay-1000">
          <Button
            // className="delay-1000 duration-1000 animate-in fade-in slide-in-from-right-4 fill-mode-both"
            size={"shadow"}
            asChild
          >
            <Link href="#projects">
              <Archive className="size-7" />
              Projekte
            </Link>
          </Button>
          <Button
            asChild
            size={"shadow"}
            variant={"secondary"}
            // className="delay-1000 duration-1000 animate-in fade-in slide-in-from-right-8 fill-mode-both"
          >
            <Link href="#contact">
              <Message className="size-7" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative">
        <div
          id="gradient-blur"
          className="absolute -inset-16 -z-10 rounded-full bg-gradient-to-tl from-blue via-blue-200 via-35% to-orange opacity-50 blur-3xl"
        ></div>
        {/* <HeaderIllustration className="duration-1000 animate-in fade-in zoom-in-50" /> */}
        <HeaderIllustration />
      </div>
    </div>
    // </section>
  );
}
