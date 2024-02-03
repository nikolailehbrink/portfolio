import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { toPlainText } from "@portabletext/react";

import CodeBlock from "../CodeBlock";
import PostImageComponent from "../PostImageComponent";
import type { SanityPost } from "@/types/sanity/sanityPost";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import GoBackButton from "../GoBackButton";
import { useReadingTime } from "@/hooks/useReadingTime";
import { getSanityBodyText, parseOutline } from "@/sanity/helpers";
import LinkAlt from "@/assets/icons/unicons/link-alt.svg";
import Link from "next/link";
import TableOfContents from "./TableOfContents";
import slugify from "slugify";
import type { PortableTextComponentProps } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";

export default function Post({ post }: { post: SanityPost }) {
  const { title, mainImage, body, _createdAt, categories, excerpt, headings } =
    post;

  const outline = parseOutline(headings);

  console.log(outline);

  const { height, src, width } = useNextSanityImage(client, mainImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const postCreated = new Date(_createdAt);

  const postText = getSanityBodyText(body);

  const { minutesToRead } = useReadingTime(postText);

  return (
    <article className="container my-8 space-y-8">
      <GoBackButton className="xl:sticky xl:top-[6.5rem]" />
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
        {excerpt && (
          <p className="prose prose-lg mx-auto dark:prose-invert">{excerpt}</p>
        )}
        <div className="flex gap-2 text-sm text-neutral-400">
          <time itemProp="datePublished" dateTime={postCreated.toISOString()}>
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
          placeholder="blur"
          blurDataURL={mainImage.asset.metadata.lqip}
        />
      ) : null}

      {body ? (
        <div className="flex gap-2 max-xl:flex-col">
          {outline.length > 0 && (
            <nav className="sticky h-full space-y-2 text-pretty rounded-xl border-2 border-border bg-neutral-950 p-4 px-6 lg:p-6 lg:px-8 xl:top-36 xl:w-[300px]">
              <header className="flex items-center gap-2">
                <ListOlAlt className="w-5" />

                <h2 className="text-xl font-bold">Table of Contents</h2>
              </header>
              <TableOfContents outline={outline} />
            </nav>
          )}
          <section className="prose dark:prose-invert sm:prose-lg xl:mx-auto">
            <PortableText
              value={body}
              components={{
                block: {
                  h2: LinkableHeader,
                  h3: LinkableHeader,
                  h4: LinkableHeader,
                  h5: LinkableHeader,
                },
                types: {
                  code: ({ value }) => <CodeBlock {...value} />,
                  image: PostImageComponent,
                },
              }}
            />
          </section>
        </div>
      ) : null}
    </article>
  );
}

const LinkableHeader = ({
  children,
  value,
}: PortableTextComponentProps<PortableTextBlock>) => {
  const HeadingTag = value.style as keyof JSX.IntrinsicElements;
  const slug = slugify(toPlainText(value));

  return (
    <HeadingTag
      id={slug}
      className="relative flex scroll-mt-24 items-center gap-2"
    >
      <Link
        href={`#${slug}`}
        className=" lg:absolute lg:-left-7"
        aria-hidden="true"
        tabIndex={-1}
      >
        <LinkAlt className="w-5" />
      </Link>
      {children}
    </HeadingTag>
  );
};
