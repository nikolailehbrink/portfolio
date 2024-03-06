"use client";

import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "@sanity/react-loader";

import type { SanityPost } from "@/types/sanity/sanityPost";
import Posts from "./Posts";

export default function PostsPreview({
  initial,
}: {
  initial: QueryResponseInitial<SanityPost[]>;
}) {
  const { data } = useQuery<SanityPost[] | null>(POSTS_QUERY, {}, { initial });

  return data ? (
    <Posts posts={data} />
  ) : (
    <div className="bg-red-100">No posts found</div>
  );
}
