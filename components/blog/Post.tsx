import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import Code from "../Code";
import PostImageComponent from "../PostImageComponent";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPost } from "@/types/sanity/sanityPost";

export default function Post({ post }: { post: SanityPost }) {
  const { title, mainImage, body } = post;

  const { width, height } = getImageDimensions(mainImage);

  return (
    <article className="container space-y-8 py-8">
      {title ? (
        <h1 className="mx-auto max-w-3xl text-2xl font-bold sm:text-3xl lg:text-center lg:text-5xl">
          {title}
        </h1>
      ) : null}
      {mainImage ? (
        <Image
          className="w-full rounded-lg"
          src={urlFor(mainImage).fit("max").url()}
          width={width}
          height={height}
          alt={mainImage.alt || ""}
          sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 80vw,
          70vw"
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
                image: PostImageComponent,
              },
            }}
          />
        </section>
      ) : null}
    </article>
  );
}
