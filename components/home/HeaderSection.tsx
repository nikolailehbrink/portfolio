import HeaderIllustration from "@/public/header-illustration.svg";
import Archive from "@/assets/icons/unicons/archive.svg";
import CommentCheck from "@/assets/icons/unicons/comment-check.svg";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderSection() {
  return (
    <section id="header" className="flex items-center overflow-x-clip">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4 *:duration-1000 *:animate-in *:fade-in *:fill-mode-both">
          <h1 className="text-6xl font-bold delay-150">
            Nikolai
            <br />
            Lehbrink
          </h1>
          <p className="delay-300">
            Welcome to my website! I&apos;m a 26-year-old tech enthusiast from
            Bremen, Germany, where I discovered my passion for web development.
            On this site, I&apos;m thrilled to share my experience, insights and
            favorite projects with you.
          </p>
          <p className="delay-500">
            Take a look at my{" "}
            <Link className="underline underline-offset-2" href={"/blog"}>
              blog
            </Link>{" "}
            for articles about things I learned and might help you. If
            you&apos;re interested in working together or just want to chat,
            feel free to reach out.
          </p>
          <div className="flex gap-4 delay-1000">
            <Button size={"shadow"} asChild>
              <Link href="#projects">
                <Archive className="size-7" />
                Projects
              </Link>
            </Button>
            <Button asChild size={"shadow"} variant={"secondary"}>
              <Link href="#contact">
                <CommentCheck className="size-7" />
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
