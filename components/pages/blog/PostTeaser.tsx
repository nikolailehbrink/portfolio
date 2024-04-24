import Tag from "@/components/shared/Tag";
import { useReadingTime } from "@/hooks/useReadingTime";
import { getFormattedDateTime } from "@/lib/helpers";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import type { PostPayload } from "@/types/sanity";
import { toPlainText } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";

export default function PostTeaser({
  post,
  priority = false,
}: {
  post: PostPayload;
  priority?: boolean;
}) {
  const {
    publishedAt = null,
    author,
    coverImage = {},
    body = [],
    tags,
    title = "",
    slug,
    overview,
  } = post;

  const publishedDate = publishedAt ? new Date(publishedAt) : null;

  const image = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const { src, height, width } = image || {};

  const postText = toPlainText(body);
  const { minutesToRead } = useReadingTime(postText);

  const authorImageUrl =
    author && urlForImage(author.image)?.size(48, 48).url();

  return (
    <div className="group/teaser @container">
      <div
        className="relative grid grid-cols-1 items-center gap-4 @4xl:grid-cols-2
          @4xl:gap-8"
      >
        <div className="relative overflow-hidden rounded-lg">
          {src && (
            <Image
              priority={priority}
              src={src}
              height={height}
              width={width}
              alt={coverImage.alt ?? "Post image"}
              className="object-cover transition-transform duration-500
                group-hover/teaser:scale-105"
              sizes=" 
            (max-width: 768px) 95vw,
            (max-width: 1000px) 80vw,
            40vw"
              placeholder={coverImage?.lqip ? "blur" : "empty"}
              blurDataURL={coverImage?.lqip}
            />
          )}
          <div
            className="absolute inset-0 top-2/3 bg-gradient-to-t
              from-neutral-950 to-transparent"
          ></div>
          <div
            className="absolute bottom-4 right-4 hidden flex-wrap gap-1 sm:flex"
          >
            {tags?.map((tag, index) => (
              <Tag key={index} className="text-xs font-bold">
                # {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="flex gap-1 text-sm">
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
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {overview && overview.length > 0 && (
            <p className="text-muted-foreground">{toPlainText(overview)}</p>
          )}
          {authorImageUrl && (
            <div className="mt-2 hidden items-center gap-2 @4xl:flex">
              <Image
                src={authorImageUrl}
                alt={author.image?.alt ?? `Profile picture`}
                width={48}
                height={48}
                className="size-10 rounded-full border-2 border-orange-500
                  object-cover"
                placeholder={author.image?.lqip ? "blur" : "empty"}
                blurDataURL={author.image?.lqip}
              />

              <div className="flex flex-col justify-center leading-4">
                <span className="font-bold">{author.name}</span>
                <span className="text-sm leading-tight text-muted-foreground">
                  {author.bio ?? "Doesnt want a bio.."}
                </span>
              </div>
            </div>
          )}
        </div>
        <Link
          className="absolute inset-0 focus-visible:rounded-lg
            focus-visible:outline-0 focus-visible:ring-2
            focus-visible:ring-neutral-300 focus-visible:ring-offset-2
            focus-visible:ring-offset-neutral-900"
          href={`/blog/${slug}`}
          aria-label="Read more about this post"
        ></Link>
      </div>
    </div>
  );
}
