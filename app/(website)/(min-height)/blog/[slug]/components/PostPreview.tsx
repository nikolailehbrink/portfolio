"use client";

import type { QueryParams } from "next-sanity";
import type { SanityPost } from "@/types/sanity/sanityPost";
import type { QueryResponseInitial } from "@sanity/react-loader";

import { POST_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@sanity/react-loader";
import Post from "./Post";

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
