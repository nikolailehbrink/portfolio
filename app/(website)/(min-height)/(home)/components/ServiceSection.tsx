import Desktop from "@/assets/icons/unicons/desktop.svg";
import Link from "next/link";
import ServiceGrid from "./ServiceGrid";
import { Suspense } from "react";
import ServiceSkeleton from "./ServiceSkeleton";

export default function ServiceSection() {
  return (
    <section
      id="passion"
      className="flex items-center bg-gradient-to-b from-transparent to-neutral-950 lg:py-24 xl:scroll-mt-16"
    >
      <div className="container grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="service-content flex flex-col items-start gap-3 max-xl:relative lg:sticky lg:top-24 lg:order-1">
          <div className="badge badge-orange">
            <Desktop className="w-5" />
            Passion
          </div>
          <h2 className="text-5xl font-bold">Why the Web?</h2>
          <p>
            About 6 years ago, I created my first website as an assignment for
            the media informatics module of a degree program by the same name.
            It was the very first time I got to see{" "}
            <Link
              target="_blank"
              className="underline underline-offset-2"
              href={
                "https://chat.openai.com/share/f6f9e999-1a89-4434-a939-554ca74c2bf3"
              }
            >
              HTML and CSS
            </Link>{" "}
            and understood how to create a very simple website.
          </p>
          <p>
            The page only consisted of a single image, a heading, two paragraphs
            of text and a big background gradient all over the page – but
            however small the website was and unpleasing it looked, I had a
            blast creating it and thus found a new passion.
          </p>
          <p>
            Now, 6 years and many websites later, I have taken the time to
            fulfill my dream of creating my own personal site, which was a
            slightly more complex task – but still as much fun as all those
            years ago.
          </p>
          <p>
            Here is what I have learned over the years and what I am currently
            focusing on.
          </p>
        </div>

        <Suspense fallback={<ServiceSkeleton />}>
          <ServiceGrid />
        </Suspense>
      </div>
    </section>
  );
}
