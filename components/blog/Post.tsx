import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Code from "../Code";
import PostImageComponent from "../PostImageComponent";
import type { SanityPost } from "@/types/sanity/sanityPost";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

export default function Post({ post }: { post: SanityPost }) {
  const { title, mainImage, body } = post;

  const { height, src, width } = useNextSanityImage(client, mainImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  return (
    <article className="container space-y-8 py-8">
      {title ? (
        <h1 className="mx-auto max-w-3xl text-2xl font-bold sm:text-3xl lg:text-center lg:text-5xl">
          {title}
        </h1>
      ) : null}
      {mainImage ? (
        <Image
          className="aspect-video w-full rounded-lg object-cover"
          src={src}
          width={width}
          height={height}
          alt={mainImage.alt || ""}
          priority
          sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 80vw,
          1304px"
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
