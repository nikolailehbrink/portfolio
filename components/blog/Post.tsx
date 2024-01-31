import Image from "next/image";
import { PortableText } from "@portabletext/react";
import CodeBlock from "../CodeBlock";
import PostImageComponent from "../PostImageComponent";
import type { SanityPost } from "@/types/sanity/sanityPost";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import GoBackButton from "../GoBackButton";
import { useReadingTime } from "@/hooks/useReadingTime";
import { getSanityBodyText } from "@/sanity/helpers";

export default function Post({ post }: { post: SanityPost }) {
  const { title, mainImage, body, _createdAt, categories } = post;

  const { height, src, width } = useNextSanityImage(client, mainImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const postCreated = new Date(_createdAt);

  const postText = getSanityBodyText(body);

  const { minutesToRead } = useReadingTime(postText);

  return (
    <article className="container my-8 space-y-8">
      <GoBackButton className="lg:sticky lg:top-24" />
      <div className="flex flex-col justify-center gap-4 sm:items-center sm:text-center">
        <div className="flex gap-2">
          {categories.map((category) => (
            <div key={category._id} className="badge badge-orange">
              {category.title}
            </div>
          ))}
        </div>
        {title ? (
          <h1 className="max-w-3xl  text-3xl font-bold lg:text-5xl">{title}</h1>
        ) : null}
        <div className="flex gap-2 text-neutral-400">
          <time dateTime={postCreated.toISOString()}>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(postCreated)}
          </time>
          <span>|</span>
          <p>{minutesToRead}m read</p>
        </div>
      </div>
      {mainImage ? (
        <Image
          className="relative z-10 aspect-video w-full rounded-lg object-cover"
          src={src}
          width={width}
          height={height}
          alt={mainImage.alt || "Post image"}
          priority
          sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 80vw,
          1304px"
        />
      ) : null}
      {body ? (
        <section className="prose prose-lg mx-auto dark:prose-invert">
          <PortableText
            value={body}
            components={{
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
