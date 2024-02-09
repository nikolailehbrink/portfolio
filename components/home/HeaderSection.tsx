import headerIllustration from "@/assets/header-illustration/header-illustration-no-bubbles.webp";
import bubbleGym from "@/assets/header-illustration/bubble-gym.svg?url";
import bubbleRope from "@/assets/header-illustration/bubble-rope.svg?url";
import bubblePiano from "@/assets/header-illustration/bubble-piano.svg?url";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";

import Archive from "@/assets/icons/unicons/archive.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function HeaderSection() {
  return (
    <section id="header" className="flex items-center overflow-x-clip">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4 *:duration-1000 *:animate-in *:fade-in *:fill-mode-both">
          <h1 className="text-6xl font-bold">
            Nikolai
            <br />
            Lehbrink
          </h1>
          <p className="delay-150">
            Welcome to my website! I&apos;m a 26-year-old tech enthusiast from
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
              <Link href="#projects">
                <Archive className="size-7" />
                Projects
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
            className="absolute -inset-16 -top-32 -z-10 aspect-square rounded-full bg-gradient-to-tl from-blue via-blue-200 via-35% to-orange opacity-50 blur-3xl"
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
