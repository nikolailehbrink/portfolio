import Image from "next/image";
import { PortableText } from "@portabletext/react";
import CodeBlock from "../CodeBlock";
import PostImageComponent from "../PostImageComponent";
import type { SanityPost } from "@/types/sanity/sanityPost";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import GoBackButton from "../GoBackButton";

export default function Post({ post }: { post: SanityPost }) {
  const { title, mainImage, body, _createdAt, author, categories } = post;
  const date = new Date(_createdAt);

  console.log(post);

  const { height, src, width } = useNextSanityImage(client, mainImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  return (
    <article className="container space-y-8 py-8 lg:pt-16">
      <GoBackButton className="lg:sticky lg:top-24" />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          {categories.map((category) => (
            <div key={category._id} className="badge badge-orange">
              {category.title}
            </div>
          ))}
        </div>
        {title ? (
          <h1 className="mx-auto max-w-3xl text-2xl font-bold sm:text-3xl lg:text-center lg:text-5xl">
            {title}
          </h1>
        ) : null}
        <div className="flex gap-2">
          <span>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date)}
          </span>
          <span>|</span>
          <span>{author.name}</span>
        </div>
      </div>
      {mainImage ? (
        <Image
          className="relative z-10 aspect-video w-full rounded-lg object-cover"
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
                code: ({ value }) => <CodeBlock {...value} />,
                image: PostImageComponent,
              },
            }}
          />
        </section>
      ) : null}
    </article>
  );
}
