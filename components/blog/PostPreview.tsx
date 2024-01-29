"use client";

import { POST_QUERY } from "@/sanity/lib/queries";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "@sanity/react-loader";
import type { QueryParams } from "next-sanity";

import Post from "@/components/blog/Post";
import type { SanityPost } from "@/types/sanity/sanityPost";

export default function PostPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityPost>;
  params: QueryParams;
}) {
  const { data } = useQuery<SanityPost | null>(POST_QUERY, params, {
    initial,
  });

  return data ? (
    <Post post={data} />
  ) : (
    <div className="bg-red-100">Post not found</div>
  );
}
