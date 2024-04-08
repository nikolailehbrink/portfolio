"use client";

import { type QueryResponseInitial } from "@sanity/react-loader";

import { homePageQuery, postsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { BlogPagePayload, HomePagePayload, PostPayload } from "@/types";

import BlogPage from "./BlogPage";

type Props = {
  initial: QueryResponseInitial<BlogPagePayload | null>;
};

export default function BlogPagePreview(props: Props) {
  const { initial } = props;
  const { data, encodeDataAttribute } = useQuery<BlogPagePayload | null>(
    postsQuery,
    {},
    { initial },
  );

  if (!data) {
    return (
      <div className="text-center">
        There was no content found. Please check back later.
      </div>
    );
  }

  return <BlogPage data={data} encodeDataAttribute={encodeDataAttribute} />;
}