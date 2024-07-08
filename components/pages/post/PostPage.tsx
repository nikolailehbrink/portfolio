import { CustomPortableText } from "@/components/shared/CustomPortableText";
import GoBackButton from "@/components/shared/GoBackButton";
import ProfileImage from "@/components/shared/ProfileImage";
import Tag from "@/components/shared/Tag";
import { Skeleton } from "@/components/ui/skeleton";
import { useReadingTime } from "@/hooks/useReadingTime";
import { getFormattedDateTime, parseOutline } from "@/lib/helpers";
import { client } from "@/sanity/lib/client";
import type { PostPayload } from "@/types/sanity";
import { LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { toPlainText } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import dynamic from "next/dynamic";
import Image from "next/image";
import TableOfContents from "../blog/TableOfContents";
import ToCSheet from "../blog/ToCSheet";

const SharePost = dynamic(() => import("../blog/SharePost"), {
  ssr: false,
  loading: () => <Skeleton className="h-7 w-64 xl:h-64 xl:w-12" />,
});

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
    publishedAt = null,
    tags,
    title = "",
    _updatedAt,
    author,
  } = data ?? {};

  const parsedHeadings = parseOutline(headings ?? []);

  const publishedDate = publishedAt ? new Date(publishedAt) : null;
  const updatedDate = _updatedAt ? new Date(_updatedAt) : null;

  const postText = toPlainText(body);
  const { minutesToRead } = useReadingTime(postText);

  const image = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const { src, height, width } = image || {};

  return (
    <article className="container my-4 space-y-4 xl:space-y-8">
      <GoBackButton className="2xl:sticky 2xl:top-[5.5rem]" />
      <div
        className="flex flex-col justify-center gap-4 lg:items-center
          lg:text-center"
      >
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Tag className="font-bold" key={index}>
                # {tag}
              </Tag>
            ))}
          </div>
        )}
        {title && (
          <h1 className="max-w-3xl text-balance text-3xl font-bold lg:text-5xl">
            {title}
          </h1>
        )}
        <p className="flex flex-wrap gap-1">
          {publishedDate && (
            <Tag className="bg-orange-950 text-orange-400">
              <time dateTime={publishedDate.toISOString()}>
                {getFormattedDateTime(publishedDate)}
              </time>
            </Tag>
          )}
          <span className="sr-only">, </span>
          <Tag className="bg-neutral-800 text-neutral-400">
            {minutesToRead}m read
          </Tag>
        </p>
        {overview && (
          <div
            className="prose prose-lg prose-neutral mx-auto text-pretty
              dark:prose-invert prose-p:leading-snug lg:text-balance"
          >
            <CustomPortableText value={overview} />
          </div>
        )}
        {author && (
          <div
            className="flex flex-col gap-2 rounded-lg leading-none
              lg:items-center"
          >
            <ProfileImage className="size-12 rounded-full" />
            <p className="text-lg/none font-bold">By {author.name}</p>
            <p className="text-muted-foreground">{author.bio}</p>
            <div className="mt-1 flex gap-2">
              <Tag className="bg-neutral-950 text-neutral-300">
                <a
                  target="_blank"
                  className="flex items-center gap-1"
                  href="https://twitter.com/nikolailehbrink"
                >
                  Follow me on
                  <XLogo aria-hidden size={20} weight="duotone" />
                  <span className="sr-only">X</span>
                </a>
              </Tag>
              <Tag className="bg-[#0a66c2] text-neutral-300">
                <a
                  target="_blank"
                  className="flex items-center gap-1"
                  href="https://www.linkedin.com/in/nikolailehbrink/"
                >
                  Follow me on
                  <LinkedinLogo aria-hidden weight="duotone" size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Tag>
            </div>
          </div>
        )}
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
          <div
            className="-order-2 flex h-full grow justify-start lg:justify-center
              xl:sticky xl:top-[5.5rem] xl:justify-end xl:pr-4"
          >
            <SharePost heading={title} />
          </div>
          <section
            className="prose prose-neutral text-pretty sm:prose-lg
              dark:prose-invert prose-headings:text-balance
              prose-headings:leading-tight lg:max-xl:mx-auto xl:ml-auto
              2xl:mx-auto"
          >
            {updatedDate && updatedDate !== publishedDate && (
              <Tag>
                Last updated on{" "}
                <time dateTime={updatedDate.toISOString()}>
                  {getFormattedDateTime(updatedDate)}
                </time>
                .
              </Tag>
            )}
            <CustomPortableText value={body} />
          </section>

          {/* If there is no ToC than still need the div to grow in order for the text to look right */}
          {parsedHeadings && parsedHeadings.length > 0 ? (
            <>
              <ToCSheet headings={parsedHeadings} />
              <div className="max-xl:-order-1 max-xl:hidden">
                <nav
                  className="relative space-y-2 overflow-auto text-pretty
                    rounded-lg border-2 border-border bg-neutral-800/40
                    lg:visible lg:p-6 lg:px-8 xl:sticky xl:top-[5.5rem]
                    xl:max-h-[calc(100vh-6.5rem)] xl:w-[300px]"
                >
                  <TableOfContents headings={parsedHeadings} />
                </nav>
              </div>
            </>
          ) : (
            <div className="grow"></div>
          )}
        </div>
      )}
    </article>
  );
}

export default PostPage;
