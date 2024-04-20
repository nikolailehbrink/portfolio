import { PostPage } from "@/components/pages/post/PostPage";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadPost } from "@/sanity/loader/loadQuery";
import type { Metadata, ResolvingMetadata } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { NewsArticle, WithContext } from "schema-dts";

const PostPreview = dynamic(
  () => import("@/components/pages/post/PostPreview"),
);

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: post } = await loadPost(params.slug);
  const ogImage = urlForOpenGraphImage(post?.coverImage);
  console.log("Generating metadata for post");

  return {
    title: post?.title,
    keywords: post?.tags,
    description: post?.overview
      ? toPlainText(post.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage],
        }
      : {},
    authors: [{ name: post?.author?.name, url: post?.author?.url }],
  };
}

export function generateStaticParams() {
  console.log("Generating static params for post");

  return generateStaticSlugs("post");
}

export default async function postSlugRoute({ params }: Props) {
  const initial = await loadPost(params.slug);

  if (draftMode().isEnabled) {
    return <PostPreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  const jsonLd: WithContext<NewsArticle> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: initial.data?.title,
    image: urlForOpenGraphImage(initial.data?.coverImage),
    description: toPlainText(initial.data?.overview ?? []),
    author: [
      {
        "@type": "Person",
        name: initial.data?.author?.name,
        url: initial.data?.author?.url,
      },
    ],
    datePublished: initial.data?.publishedAt,
    dateModified: initial.data?._updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostPage data={initial.data} />
    </>
  );
}
