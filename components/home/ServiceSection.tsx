import Desktop from "@/assets/icons/unicons/desktop.svg";

import { loadQuery } from "@/sanity/lib/store";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityService } from "@/types/sanity/sanityService";
import Link from "next/link";

export default async function ServiceSection() {
  const { data: services } = await loadQuery<SanityService[]>(SERVICES_QUERY);

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

        <div className="@container">
          <div className="grid gap-4 @xl:grid-cols-2">
            {services.map((service) => (
              <div
                key={service._id}
                className="service-box row-span-4 rounded-lg border-2 bg-neutral-900 p-4 @xl:lg:first:col-start-2"
              >
                <div className="mb-2 inline-flex rounded-lg bg-neutral-800 p-1 text-white">
                  <Image
                    className="w-12 contrast-[1.1] hue-rotate-[318deg] saturate-[1.4]"
                    src={urlFor(service.image).size(60, 60).quality(100).url()}
                    alt={service.image.alt || "Service icon"}
                    height={60}
                    width={60}
                  />
                </div>
                <h2 className="mb-2 text-xl font-bold leading-tight">
                  {service.title}
                </h2>
                <p className="line-clamp-[7]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
