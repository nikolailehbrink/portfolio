import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPost } from "@/types/sanity/sanityPost";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import Star from "@/public/icons/star.svg";
import { useReadingTime } from "@/hooks/useReadingTime";
import { getSanityBodyText } from "@/sanity/helpers";

export default function PostTeaser({ post }: { post: SanityPost }) {
  const {
    author,
    _createdAt,
    mainImage,
    body,
    categories,
    title,
    slug,
    excerpt,
  } = post;

  const postCreated = new Date(_createdAt);

  const { height, src, width } = useNextSanityImage(client, mainImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  const postText = getSanityBodyText(body);

  const { words, minutesToRead } = useReadingTime(postText);

  return (
    <div className="group/teaser @container">
      <div className="relative grid grid-cols-1 items-center gap-4 @4xl:grid-cols-2 @4xl:gap-8">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            priority
            src={src}
            height={height}
            width={width}
            alt={mainImage.alt ?? "Post image"}
            className="object-cover transition-transform duration-500 group-hover/teaser:scale-105"
            sizes=" 
          (max-width: 768px) 95vw,
          (max-width: 1000px) 80vw,
          40vw"
            placeholder="blur"
            blurDataURL={mainImage.asset.metadata.lqip}
          />
          <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-neutral-950 to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className="rounded-lg border-2 border-orange bg-orange-300 px-2 py-1 text-sm font-bold text-orange-950"
              >
                <p>{category.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          {/* TODO: Implement Top Pick functionality */}
          <div className="hidden items-center gap-1 rounded-lg border-2 border-blue-300 bg-blue px-2 py-1 text-xs @4xl:inline-flex">
            <Star className="w-3" />
            Top Pick
          </div>
          <section className="-mb-1 flex gap-2 text-sm text-neutral-400">
            <time itemProp="datePublished" dateTime={postCreated.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(postCreated)}
            </time>
            <span>|</span>
            <p>{minutesToRead}m read</p>
            <span>|</span>
            <p>{words} words</p>
          </section>

          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {excerpt && (
            <p className="line-clamp-2 max-w-prose text-neutral-300 @4xl:line-clamp-4">
              {excerpt}
            </p>
          )}
          <div className="mt-2 hidden items-center gap-2 @4xl:flex">
            <Image
              src={urlFor(author.image.asset).size(48, 48).url()}
              alt={author.image.alt ?? `Profile picture of ${author.name}`}
              width={48}
              height={48}
              className="size-10 rounded-full border-2 border-orange object-cover"
              placeholder="blur"
              blurDataURL={author.image.asset.metadata.lqip}
            />
            <div className="flex flex-col justify-center leading-4">
              <span className="font-bold text-neutral-100">{author.name}</span>
              <span className="text-sm text-neutral-400">{author.bio}</span>
            </div>
          </div>
        </div>
        <Link
          className="absolute inset-0 focus-visible:rounded-lg focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          href={`/blog/${slug.current}`}
        ></Link>
      </div>
    </div>
  );
}
