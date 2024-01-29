// ./app/[slug]/page.tsx

import type { QueryParams, SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import Post from "@/components/blog/Post";
import PostPreview from "@/components/blog/PostPreview";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: QueryParams }) {
  const {
    data: { title, mainImage },
  } = await loadQuery<SanityDocument>(POST_QUERY, params);

  return {
    title,
    openGraph: {
      images: [
        {
          url: urlFor(mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: mainImage.alt || "Post Image",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument>(POST_QUERY, params, {
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
