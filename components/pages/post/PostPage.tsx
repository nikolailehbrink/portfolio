import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";
import TableOfContents from "@/components/pages/blog/TableOfContents";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import GoBackButton from "@/components/shared/GoBackButton";
import Tag from "@/components/shared/Tag";
import { useReadingTime } from "@/hooks/useReadingTime";
import { parseOutline } from "@/lib/helpers";
import { client } from "@/sanity/lib/client";
import type { PostPayload } from "@/types/sanity";
import { toPlainText } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

export interface PostPageProps {
  data: PostPayload | null;
}

export function PostPage({ data }: PostPageProps) {
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

  const image = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const { src, height, width } = image || {};

  return (
    <article className="container my-4 space-y-4 xl:space-y-8">
      <GoBackButton className="2xl:sticky 2xl:top-[5.5rem]" />
      <div className="flex flex-col justify-center gap-4 lg:items-center lg:text-center">
        {title && (
          <h1 className="max-w-3xl text-balance text-3xl font-bold lg:text-5xl">
            {title}
          </h1>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Tag className="font-bold" key={index}>
                # {tag}
              </Tag>
            ))}
          </div>
        )}
        {overview && (
          <div className="prose prose-lg prose-neutral mx-auto text-pretty dark:prose-invert prose-p:leading-snug lg:text-balance">
            <CustomPortableText value={overview} />
          </div>
        )}
        <p className="flex flex-wrap gap-1">
          <Tag className="bg-orange-950 text-orange-400">
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
      {src && (
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
        <div className="flex gap-4 max-xl:flex-col xl:gap-8">
          <section className="prose prose-neutral text-pretty sm:prose-lg dark:prose-invert prose-headings:text-balance prose-headings:leading-tight xl:ml-auto 2xl:mx-auto">
            <CustomPortableText value={body} />
          </section>
          {outline && outline.length > 0 && (
            <>
              <div className="hidden grow 2xl:-order-1 2xl:flex"></div>
              <nav className="relative h-full max-h-[calc(100vh-6.5rem)] space-y-2 overflow-auto text-pretty rounded-lg border-2 border-border bg-neutral-800/40 p-4 px-6 max-xl:-order-1 lg:p-6 lg:px-8 xl:sticky xl:top-[5.5rem] xl:w-[300px]">
                <header className="relative flex items-center gap-2">
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
