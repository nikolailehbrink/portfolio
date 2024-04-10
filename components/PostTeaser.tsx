import Image from "next/image";
import Link from "next/link";
import { toPlainText } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";

import { useReadingTime } from "@/hooks/useReadingTime";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import { PostPayload } from "@/types";

import { CustomPortableText } from "./shared/CustomPortableText";

export default function PostTeaser({
  post,
  priority = false,
}: {
  post: PostPayload;
  priority?: boolean;
}) {
  const {
    publishedAt = "",
    author,
    coverImage = {},
    body = [],
    tags,
    title,
    slug,
    overview,
  } = post;

  const publishedDate = new Date(publishedAt);

  const { height, src, width } = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const postText = toPlainText(body);
  const { minutesToRead } = useReadingTime(postText);

  const authorImageUrl =
    author && urlForImage(author.image)?.size(48, 48).url();

  return (
    <div className="group/teaser @container">
      <div className="relative grid grid-cols-1 items-center gap-4 @4xl:grid-cols-2 @4xl:gap-8">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            priority={priority}
            src={src}
            height={height}
            width={width}
            alt={coverImage.alt ?? "Post image"}
            className="object-cover transition-transform duration-500 group-hover/teaser:scale-105"
            sizes=" 
          (max-width: 768px) 95vw,
          (max-width: 1000px) 80vw,
          40vw"
            placeholder={coverImage?.lqip ? "blur" : "empty"}
            blurDataURL={coverImage?.lqip}
          />
          <div className="absolute inset-0 top-2/3 bg-gradient-to-t from-neutral-950 to-transparent"></div>
          <div className="absolute bottom-4 right-4 sm:flex gap-1 flex-wrap hidden">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="rounded-full bg-blue-900 px-2 py-1 text-xs font-bold text-blue-400"
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="-mb-1 text-sm text-neutral-400">
            <time dateTime={publishedDate.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(publishedDate)}
            </time>
            {minutesToRead > 0 && <>, {minutesToRead}m read</>}
          </p>

          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {overview && overview.length > 0 && (
            <div className="text-neutral-300">
              <CustomPortableText value={overview} />
            </div>
          )}
          {authorImageUrl && (
            <div className="mt-2 hidden items-center gap-2 @4xl:flex">
              <Image
                src={authorImageUrl}
                alt={author.image?.alt ?? `Profile picture`}
                width={48}
                height={48}
                className="size-10 rounded-full border-2 border-orange object-cover"
                placeholder={author.image?.lqip ? "blur" : "empty"}
                blurDataURL={author.image?.lqip}
              />

              <div className="flex flex-col justify-center leading-4">
                <span className="font-bold text-neutral-100">
                  {author.name}
                </span>
                <span className="text-sm text-neutral-400">
                  {author.bio ?? "Doesnt want a bio.."}
                </span>
              </div>
            </div>
          )}
        </div>
        <Link
          className="absolute inset-0 focus-visible:rounded-lg focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          href={`/blog/${slug}`}
          aria-label="Read more about this post"
        ></Link>
      </div>
    </div>
  );
}
