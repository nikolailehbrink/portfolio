import HomeAlt from "@/assets/icons/unicons/home-alt.svg";
import Newspaper from "@/assets/icons/unicons/newspaper.svg";
import SearchAlt from "@/assets/icons/unicons/search-alt.svg";
import { Button } from "@/components/ui/button";
import { facts } from "@/lib/helpers";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container flex flex-grow flex-col items-center justify-center
        space-y-4 text-pretty text-center"
    >
      <header className="flex flex-col items-center">
        <SearchAlt className="size-12" />
        <h1 className="text-4xl font-bold lg:text-5xl">
          There is nothing here!
        </h1>
      </header>
      <div className="max-w-prose space-y-1">
        <p>But since you stranded here, here is a fun fact for you:</p>
        <p>{facts[Math.floor(Math.random() * facts.length)]}</p>
      </div>
      <div className="flex gap-3">
        <Button asChild size={"shadow"} variant={"default"}>
          <Link href="/">
            <HomeAlt className="size-5" />
            Go Home
          </Link>
        </Button>
        <Button asChild size={"shadow"} variant={"secondary"}>
          <Link href="/blog">
            <Newspaper className="size-5" />
            Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}
