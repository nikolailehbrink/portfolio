"use client";
import HeaderIllustration from "@/public/header-illustration.svg";
import Archive from "@/public/icons/archive.svg";
import Message from "@/public/icons/message.svg";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderSection() {
  return (
    <section id="header" className="flex items-center overflow-x-clip">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">
            Nikolai
            <br />
            Lehbrink
          </h1>
          <p>
            Herzlich willkommen auf meiner Portfolio-Webseite! Ich bin ein
            26-jähriger Webentwickler aus Bremen, Deutschland, der seine
            Leidenschaft während des Studiums entdeckt hat. Seitdem gestalte und
            entwickle ich Webseiten und freue mich, dir hier einige meiner
            Projekte vorzustellen.
          </p>
          <p>
            Ich bin stets offen für neue Herausforderungen und Möglichkeiten zur
            Zusammenarbeit. Suchst du Kreativität, Zuverlässigkeit und
            Engagement, bist du hier genau richtig. Zögere nicht, mich zu
            kontaktieren - ich freue mich auf deine Nachricht!
          </p>
          <div className="flex gap-4">
            <Button size={"shadow"} asChild>
              <Link href="#projects">
                <Archive className="size-7" />
                Projekte
              </Link>
            </Button>
            <Button asChild size={"shadow"} variant={"secondary"}>
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
          <HeaderIllustration />
        </div>
      </div>
    </section>
  );
}
