import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";

import { dataset, projectId } from "@/sanity/env";
import Code from "../Code";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Post({ post }: { post: SanityDocument }) {
  const { title, mainImage, body } = post;

  return (
    <article className="container space-y-8 py-8">
      {title ? (
        <h1 className="mx-auto max-w-3xl text-2xl font-bold lg:text-center lg:text-4xl">
          {title}
        </h1>
      ) : null}
      {mainImage ? (
        <Image
          className="w-full rounded-lg"
          src={builder.image(mainImage).width(1200).height(630).url()}
          width={1200}
          height={630}
          alt={mainImage.alt || ""}
        />
      ) : null}
      {body ? (
        <section className="prose prose-lg mx-auto dark:prose-invert">
          {" "}
          <PortableText
            value={body}
            components={{
              // ...
              types: {
                code: Code,
              },
            }}
          />
        </section>
      ) : null}
    </article>
  );
}
