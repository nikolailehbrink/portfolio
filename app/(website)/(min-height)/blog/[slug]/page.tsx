import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPost } from "@/types/sanity/sanityPost";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import PostPreview from "./components/PostPreview";
import Post from "./components/Post";

export async function generateStaticParams() {
  const posts = await client.fetch<SanityPost[]>(POSTS_QUERY);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(
  {
    params,
  }: {
    params: QueryParams;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data } = await loadQuery<SanityPost>(POST_QUERY, params);

  if (!data) {
    notFound();
  }

  const { title, mainImage, author, categories, excerpt } = data;

  return {
    authors: [{ name: author.name }],
    keywords: categories.map((category) => category.title),
    description: excerpt ?? (await parent).description,
    title,
    openGraph: {
      images: [
        {
          url: urlFor(mainImage).width(1200).height(630).fit("clip").url(),
          width: 1200,
          height: 630,
          alt: mainImage.alt || "Post Image",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityPost>(POST_QUERY, params, {
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  return draftMode().isEnabled ? (
    <PostPreview initial={initial} params={params} />
  ) : (
    <Post post={initial.data} />
  );
}
