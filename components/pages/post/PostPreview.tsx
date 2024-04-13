"use client";

import { postBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import type { PostPayload } from "@/types/sanity";
import { type QueryResponseInitial } from "@sanity/react-loader";
import PostPage from "./PostPage";

type Props = {
  params: { slug: string };
  initial: QueryResponseInitial<PostPayload | null>;
};

export default function ProjectPreview(props: Props) {
  const { params, initial } = props;
  const { data } = useQuery<PostPayload | null>(postBySlugQuery, params, {
    initial,
  });

  return <PostPage data={data!} />;
}
