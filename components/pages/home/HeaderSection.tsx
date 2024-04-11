"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import bubbleGym from "@/assets/header-illustration/bubble-gym.svg?url";
import bubblePiano from "@/assets/header-illustration/bubble-piano.svg?url";
import bubbleRope from "@/assets/header-illustration/bubble-rope.svg?url";
import headerIllustration from "@/assets/header-illustration/header-illustration-no-bubbles.webp";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import Robot from "@/assets/icons/unicons/robot.svg";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsap";

export default function HeaderSection() {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      gsap.to("#gradient-blur", {
        rotate: 270,
        scrollTrigger: {
          start: "top top",
          scrub: 2,
          trigger: sectionRef.current,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="header"
      className="flex items-center overflow-x-clip"
    >
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4 *:duration-1000 z-10 *:animate-in *:fade-in *:fill-mode-both prose dark:prose-invert prose-neutral">
          <h1 className="text-6xl font-bold my-3">
            Nikolai
            <br />
            Lehbrink
          </h1>
          <p className="delay-150">
            Welcome to my website! I&apos;m a 27-year-old tech enthusiast from
            Bremen, Germany, where I discovered my passion for web development.
            On this site, I&apos;m thrilled to share my experience, insights and
            favorite projects with you.
          </p>
          <p className="delay-300">
            Take a look at my blog for articles about things I learned and might
            help you out. If you&apos;re interested in working together or just
            want to chat, feel free to contact me.
          </p>
          <div className="flex gap-4 delay-500">
            <Button size={"shadow"} asChild>
              <Link href="/chat">
                <Robot className="size-7" />
                AI Chat
              </Link>
            </Button>
            <Button asChild size={"shadow"} variant={"secondary"}>
              <Link href="/blog">
                <Newspaper className="size-7" />
                Blog
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-[10%]">
          <div
            id="gradient-blur"
            className="absolute -inset-16 -top-32 aspect-square rounded-full bg-gradient-to-tl from-blue via-blue-200 via-35% to-orange opacity-50 blur-3xl"
          ></div>
          <div className="relative w-full">
            <Image
              className="duration-700 animate-in fade-in-10 zoom-in-50"
              src={headerIllustration}
              priority
              alt={"Header illstration of Nikolai Lehbrink"}
            />
          </div>
          <Image
            src={bubbleGym}
            alt="Hallo"
            className="absolute -top-[18%] right-[25%] w-1/5 origin-bottom duration-700 animate-in zoom-in spin-in-45"
          />
          <Image
            src={bubbleRope}
            alt="Hallo"
            className="absolute -top-[4%] right-2 w-1/5 origin-bottom-left delay-150 duration-500 animate-in zoom-in spin-in-90 fill-mode-both"
          />
          <Image
            src={bubblePiano}
            alt="Hallo"
            className="absolute -top-[16%] left-[18%] w-1/5 origin-bottom-right delay-300 duration-500 animate-in zoom-in spin-in-45 fill-mode-both"
          />
        </div>
      </div>
    </section>
  );
}
