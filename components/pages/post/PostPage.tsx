import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Image from "next/image";
import { toPlainText } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";

import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";
import TableOfContents from "@/components/pages/blog/TableOfContents";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import GoBackButton from "@/components/shared/GoBackButton";
import { useReadingTime } from "@/hooks/useReadingTime";
import { parseOutline } from "@/lib/helpers";
import { client } from "@/sanity/lib/client";
import type { PostPayload } from "@/types/sanity";
import Tag from "@/components/shared/Tag";

export interface PostPageProps {
  data: PostPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function PostPage({ data, encodeDataAttribute }: PostPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    coverImage = {},
    headings,
    body = [],
    overview,
    publishedAt = "",
    tags,
    title,
  } = data ?? {};

  const outline = parseOutline(headings ?? []);

  const publishedDate = new Date(publishedAt);

  const postText = toPlainText(body);
  const { minutesToRead } = useReadingTime(postText);

  const { height, src, width } = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  return (
    <article className="container my-4 space-y-4 xl:space-y-8">
      <GoBackButton className="2xl:sticky 2xl:top-[5.5rem]" />
      <div className="flex flex-col justify-center gap-4 lg:items-center lg:text-center">
        {title && (
          <h1 className="max-w-3xl  text-3xl font-bold lg:text-5xl">{title}</h1>
        )}
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags?.map((tag, index) => (
              <Tag className="font-bold" key={index}>
                # {tag}
              </Tag>
            ))}
          </div>
        )}
        {overview && (
          <div className="prose prose-lg mx-auto dark:prose-invert prose-neutral">
            <CustomPortableText value={overview} />
          </div>
        )}
        <div className="flex gap-2 text-sm text-neutral-400">
          <p className="flex-wrap flex gap-1">
            <Tag className="bg-orange-900 text-orange-400">
              <time
                itemProp="datePublished"
                dateTime={publishedDate.toISOString()}
              >
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(publishedDate)}
              </time>
            </Tag>
            <span className="sr-only">, </span>
            <Tag className="bg-neutral-800 text-neutral-400">
              {minutesToRead}m read
            </Tag>
          </p>
        </div>
      </div>
      {coverImage && (
        <Image
          className="relative z-10 aspect-video w-full rounded-lg object-cover"
          src={src}
          width={width}
          height={height}
          alt={coverImage.alt ?? "Post image"}
          priority
          sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 80vw,
          1304px"
          placeholder={coverImage?.lqip ? "blur" : "empty"}
          blurDataURL={coverImage?.lqip}
        />
      )}

      {body && body.length > 0 && (
        <div className="flex gap-4 xl:gap-8 max-xl:flex-col">
          <section className="prose prose-neutral text-pretty dark:prose-invert sm:prose-lg xl:ml-auto 2xl:mx-auto">
            <CustomPortableText value={body} />
          </section>
          {outline && outline.length > 0 && (
            <>
              <div className="grow hidden 2xl:flex 2xl:-order-1"></div>
              <nav className="xl:sticky relative h-full max-xl:-order-1 space-y-2 text-pretty overflow-hidden rounded-lg border-2 border-blue/30 p-4 px-6 lg:p-6 lg:px-8 xl:top-20 xl:w-[300px]">
                <div className="inset-0 bg-gradient-to-br from-blue-500 to-blue-900 absolute opacity-15"></div>
                <header className="flex items-center gap-2 relative">
                  <ListOlAlt className="w-5" />

                  <h2 className="text-xl font-bold">Table of Contents</h2>
                </header>
                <TableOfContents outline={outline} />
              </nav>
            </>
          )}
        </div>
      )}
    </article>
  );
}

export default PostPage;
